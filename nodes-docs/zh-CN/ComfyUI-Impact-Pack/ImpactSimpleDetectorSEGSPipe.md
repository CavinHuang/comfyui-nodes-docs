# Documentation
- Class name: SimpleDetectorForEachPipe
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SimpleDetectorForEachPipe节点旨在通过预定义的检测管道处理图像。它考虑了各种影响检测过程的参数，如边界框阈值和膨胀，以提高检测精度。该节点的功能集中在识别和定位图像中的物体，有助于实现图像分析和物体识别的更广泛目标。

# Input types
## Required
- detailer_pipe
    - detailer_pipe参数对于节点的操作至关重要，因为它定义了应用于输入图像以进行检测的一系列操作或管道。它是一个关键组件，决定了节点的行为和检测结果的质量。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]
- image
    - 图像参数是节点的主要输入，代表将被处理用于目标检测的数据。它的重要性在于它是检测操作的对象，节点的性能和结果直接依赖于输入图像的质量和特性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- bbox_threshold
    - bbox_threshold参数决定了边界框被认为是有效检测的置信度水平。它在过滤出误报和确保只有高置信度的检测包含在输出中起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_dilation
    - bbox_dilation参数控制应用于边界框的膨胀量，这有助于调整检测到的物体的大小。这个参数对于微调检测精度以更好地满足应用程序的具体要求很重要。
    - Comfy dtype: INT
    - Python dtype: int
- crop_factor
    - crop_factor参数用于确定将考虑用于检测的图像部分。它很重要，因为它可以帮助将检测过程集中在图像最相关的区域，可能提高节点操作的效率和精度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- drop_size
    - drop_size参数指定了为检测目的将图像划分的网格单元的大小。它影响检测的粒度，对于确定检测结果的详细程度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- sub_threshold
    - sub_threshold参数设置了次要检测的阈值，可以用来通过专注于图像中的较小或不太突出的物体来细化检测过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sub_dilation
    - sub_dilation参数允许通过应用膨胀来调整次要检测的大小。它对于控制检测到的物体的规模很重要，可以用来针对特定场景优化检测。
    - Comfy dtype: INT
    - Python dtype: int
- sub_bbox_expansion
    - sub_bbox_expansion参数控制次要检测的边界框的扩展。它很重要，因为它可以帮助捕获围绕较小物体的更广泛上下文，可能提高检测精度。
    - Comfy dtype: INT
    - Python dtype: int
- sam_mask_hint_threshold
    - sam_mask_hint_threshold参数用于定义由SAM模型生成的掩码提示的阈值。它对于控制分割掩码中的细节水平很重要，可以影响最终的检测结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- post_dilation
    - post_dilation参数通过在主要检测过程之后允许膨胀，提供了对最终边界框的额外控制层。它可以用于针对特定用例微调检测结果。
    - Comfy dtype: INT
    - Python dtype: Optional[int]

# Output types
- segs
    - segs输出参数代表在输入图像中检测到的分割区域。它很重要，因为它包含了检测过程的主要结果，为图像的组成和结构提供了宝贵的见解。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[torch.Tensor, ...]

# Usage tips
- Infra type: GPU

# Source code
```
class SimpleDetectorForEachPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detailer_pipe': ('DETAILER_PIPE',), 'image': ('IMAGE',), 'bbox_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'bbox_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'sub_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'sub_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'sub_bbox_expansion': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1}), 'sam_mask_hint_threshold': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'post_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1})}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    def doit(self, detailer_pipe, image, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, post_dilation=0):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: SimpleDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative) = detailer_pipe
        return SimpleDetectorForEach.detect(bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, post_dilation=post_dilation, sam_model_opt=sam_model_opt, segm_detector_opt=segm_detector_opt, detailer_hook=detailer_hook)
```