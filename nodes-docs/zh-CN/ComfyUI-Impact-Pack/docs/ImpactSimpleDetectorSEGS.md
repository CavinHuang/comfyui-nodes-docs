# Documentation
- Class name: SimpleDetectorForEach
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SimpleDetectorForEach节点旨在使用边界框（bbox）检测器对单个图像执行对象检测。它处理输入图像以识别和定位对象，应用各种阈值和膨胀技术来完善检测过程。该节点能够与语义感知掩码（SAM）模型集成，以提高检测精度，并且也可以与分割检测器协同工作，以进行更详细的分析。输出是一组分段对象，每个对象都具有相关的元数据，如置信度分数和边界框。

# Input types
## Required
- bbox_detector
    - bbox_detector参数对于检测过程至关重要，因为它定义了节点在输入图像中识别和定位对象的机制。它在节点的执行中起着关键作用，并直接影响检测结果的准确性和质量。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: impact.core.BBoxDetector
- image
    - image参数是SimpleDetectorForEach节点的主要输入。它代表了节点将分析用于对象检测的图像数据。图像的质量和分辨率直接影响节点准确检测对象的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- bbox_threshold
    - bbox_threshold参数用于设置检测边界框的置信度水平。它是决定哪些检测到的对象被认为是有效的并因此包含在最终输出中的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_dilation
    - bbox_dilation参数控制检测到的边界框的扩展。这是一个重要的参数，用于调整检测区域的大小，以更好地适应实际对象。
    - Comfy dtype: INT
    - Python dtype: int
- crop_factor
    - crop_factor参数用于确定围绕检测到的对象的裁剪区域的缩放因子。它影响裁剪区域的大小，因此影响分割中的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- drop_size
    - drop_size参数指定检测过程中使用的步幅或步进大小。它影响检测的粒度，允许节点在不同尺度上检测对象。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- sub_threshold
    - sub_threshold参数用于微调检测过程，特别是与分割检测器一起工作时。它通过为对象识别设置次级阈值来帮助细检测。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sub_dilation
    - sub_dilation参数通过控制检测到的分割的膨胀来允许对分割过程进行调整。这对于细化检测到的对象的边界特别有用。
    - Comfy dtype: INT
    - Python dtype: int
- sub_bbox_expansion
    - sub_bbox_expansion参数用于在分割过程中扩展检测到的对象的边界框。它可以帮助确保整个对象包含在分割掩码内。
    - Comfy dtype: INT
    - Python dtype: int
- sam_mask_hint_threshold
    - sam_mask_hint_threshold参数用于与SAM模型集成以生成掩码时。它设置了使用检测到的分割的提示来创建更准确掩码的阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- post_dilation
    - post_dilation参数在检测过程后对分割掩码应用最终膨胀。它可以用来平滑掩码的边缘，并确保更好地覆盖对象。
    - Comfy dtype: INT
    - Python dtype: int
- sam_model_opt
    - sam_model_opt参数是当使用SAM模型生成掩码时节点的可选配置。它指定用于创建更详细分割掩码的模型。
    - Comfy dtype: SAM_MODEL
    - Python dtype: impact.core.SAMModel
- segm_detector_opt
    - segm_detector_opt参数允许将分割检测器集成到检测过程中。它提供了一个选项，用于对某些类型的对象或场景使用更专业的检测器。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: impact.core.SegmDetector

# Output types
- segs
    - segs输出参数代表节点检测到的分段对象集合。每个分段包括裁剪后的图像、掩码、置信度分数、裁剪区域、边界框和标签等详细信息。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[impact.core.SEG, List[impact.core.SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SimpleDetectorForEach:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'bbox_detector': ('BBOX_DETECTOR',), 'image': ('IMAGE',), 'bbox_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'bbox_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'sub_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'sub_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'sub_bbox_expansion': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1}), 'sam_mask_hint_threshold': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'post_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'sam_model_opt': ('SAM_MODEL',), 'segm_detector_opt': ('SEGM_DETECTOR',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    @staticmethod
    def detect(bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, post_dilation=0, sam_model_opt=None, segm_detector_opt=None, detailer_hook=None):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: SimpleDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        if segm_detector_opt is not None and hasattr(segm_detector_opt, 'bbox_detector') and (segm_detector_opt.bbox_detector == bbox_detector):
            segs = segm_detector_opt.detect(image, sub_threshold, sub_dilation, crop_factor, drop_size, detailer_hook=detailer_hook)
        else:
            segs = bbox_detector.detect(image, bbox_threshold, bbox_dilation, crop_factor, drop_size, detailer_hook=detailer_hook)
            if sam_model_opt is not None:
                mask = core.make_sam_mask(sam_model_opt, segs, image, 'center-1', sub_dilation, sub_threshold, sub_bbox_expansion, sam_mask_hint_threshold, False)
                segs = core.segs_bitwise_and_mask(segs, mask)
            elif segm_detector_opt is not None:
                segm_segs = segm_detector_opt.detect(image, sub_threshold, sub_dilation, crop_factor, drop_size, detailer_hook=detailer_hook)
                mask = core.segs_to_combined_mask(segm_segs)
                segs = core.segs_bitwise_and_mask(segs, mask)
        segs = core.dilate_segs(segs, post_dilation)
        return (segs,)

    def doit(self, bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, post_dilation=0, sam_model_opt=None, segm_detector_opt=None):
        return SimpleDetectorForEach.detect(bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, post_dilation=post_dilation, sam_model_opt=sam_model_opt, segm_detector_opt=segm_detector_opt)
```