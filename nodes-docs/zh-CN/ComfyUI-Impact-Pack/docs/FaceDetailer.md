# Documentation
- Class name: FaceDetailer
- Category: ImpactPack/Simple
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

FaceDetailer 节点旨在增强和细化图像中的面部细节。它结合使用多种模型和算法来检测面部，应用详细的增强效果，并输出具有改进面部特征的精细图像。在图像后期处理工作流程中，当需要高质量的面部细节时，该节点发挥着关键作用。

# Input types
## Required
- image
    - 输入图像，将在此图像上执行面部细节增强。它是节点处理的主要数据源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- model
    - 用于面部细节增强的模型。它是一个关键组件，定义了应用于输入图像的增强质量和风格。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 与面部细节模型一起使用的 CLIP 模型，以确保增强图像的连贯性和相关性。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- guide_size
    - 引导尺寸参数影响模型在增强过程中关注的面部特征的尺度。这是一个重要的调整参数，用于控制输出图像中的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- enhanced_image
    - 经过 FaceDetailer 节点处理后，具有增强面部细节的结果图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_enhanced
    - 在输入图像中检测到的一系列裁剪并可能增强的面部片段。
    - Comfy dtype: COMBO[IMAGE]
    - Python dtype: List[torch.Tensor]
- mask
    - 表示已经被增强的面部区域的掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class FaceDetailer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'guide_size': ('FLOAT', {'default': 384, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'guide_size_for': ('BOOLEAN', {'default': True, 'label_on': 'bbox', 'label_off': 'crop_region'}), 'max_size': ('FLOAT', {'default': 1024, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'noise_mask': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'force_inpaint': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'bbox_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'bbox_dilation': ('INT', {'default': 10, 'min': -512, 'max': 512, 'step': 1}), 'bbox_crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 10, 'step': 0.1}), 'sam_detection_hint': (['center-1', 'horizontal-2', 'vertical-2', 'rect-4', 'diamond-4', 'mask-area', 'mask-points', 'mask-point-bbox', 'none'],), 'sam_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'sam_threshold': ('FLOAT', {'default': 0.93, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'sam_bbox_expansion': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1}), 'sam_mask_hint_threshold': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'sam_mask_hint_use_negative': (['False', 'Small', 'Outter'],), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'bbox_detector': ('BBOX_DETECTOR',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'cycle': ('INT', {'default': 1, 'min': 1, 'max': 10, 'step': 1})}, 'optional': {'sam_model_opt': ('SAM_MODEL',), 'segm_detector_opt': ('SEGM_DETECTOR',), 'detailer_hook': ('DETAILER_HOOK',), 'inpaint_model': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'noise_mask_feather': ('INT', {'default': 20, 'min': 0, 'max': 100, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE', 'MASK', 'DETAILER_PIPE', 'IMAGE')
    RETURN_NAMES = ('image', 'cropped_refined', 'cropped_enhanced_alpha', 'mask', 'detailer_pipe', 'cnet_images')
    OUTPUT_IS_LIST = (False, True, True, False, False, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Simple'

    @staticmethod
    def enhance_face(image, model, clip, vae, guide_size, guide_size_for_bbox, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, bbox_threshold, bbox_dilation, bbox_crop_factor, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative, drop_size, bbox_detector, segm_detector=None, sam_model_opt=None, wildcard_opt=None, detailer_hook=None, refiner_ratio=None, refiner_model=None, refiner_clip=None, refiner_positive=None, refiner_negative=None, cycle=1, inpaint_model=False, noise_mask_feather=0):
        bbox_detector.setAux('face')
        segs = bbox_detector.detect(image, bbox_threshold, bbox_dilation, bbox_crop_factor, drop_size, detailer_hook=detailer_hook)
        bbox_detector.setAux(None)
        if sam_model_opt is not None:
            sam_mask = core.make_sam_mask(sam_model_opt, segs, image, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative)
            segs = core.segs_bitwise_and_mask(segs, sam_mask)
        elif segm_detector is not None:
            segm_segs = segm_detector.detect(image, bbox_threshold, bbox_dilation, bbox_crop_factor, drop_size)
            if hasattr(segm_detector, 'override_bbox_by_segm') and segm_detector.override_bbox_by_segm and (not (detailer_hook is not None and (not hasattr(detailer_hook, 'override_bbox_by_segm')))):
                segs = segm_segs
            else:
                segm_mask = core.segs_to_combined_mask(segm_segs)
                segs = core.segs_bitwise_and_mask(segs, segm_mask)
        if len(segs[1]) > 0:
            (enhanced_img, _, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list, new_segs) = DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for_bbox, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard_opt, detailer_hook, refiner_ratio=refiner_ratio, refiner_model=refiner_model, refiner_clip=refiner_clip, refiner_positive=refiner_positive, refiner_negative=refiner_negative, cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
        else:
            enhanced_img = image
            cropped_enhanced = []
            cropped_enhanced_alpha = []
            cnet_pil_list = []
        mask = core.segs_to_combined_mask(segs)
        if len(cropped_enhanced) == 0:
            cropped_enhanced = [empty_pil_tensor()]
        if len(cropped_enhanced_alpha) == 0:
            cropped_enhanced_alpha = [empty_pil_tensor()]
        if len(cnet_pil_list) == 0:
            cnet_pil_list = [empty_pil_tensor()]
        return (enhanced_img, cropped_enhanced, cropped_enhanced_alpha, mask, cnet_pil_list)

    def doit(self, image, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, bbox_threshold, bbox_dilation, bbox_crop_factor, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative, drop_size, bbox_detector, wildcard, cycle=1, sam_model_opt=None, segm_detector_opt=None, detailer_hook=None, inpaint_model=False, noise_mask_feather=0):
        result_img = None
        result_mask = None
        result_cropped_enhanced = []
        result_cropped_enhanced_alpha = []
        result_cnet_images = []
        if len(image) > 1:
            print(f'[Impact Pack] WARN: FaceDetailer is not a node designed for video detailing. If you intend to perform video detailing, please use Detailer For AnimateDiff.')
        for (i, single_image) in enumerate(image):
            (enhanced_img, cropped_enhanced, cropped_enhanced_alpha, mask, cnet_pil_list) = FaceDetailer.enhance_face(single_image.unsqueeze(0), model, clip, vae, guide_size, guide_size_for, max_size, seed + i, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, bbox_threshold, bbox_dilation, bbox_crop_factor, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative, drop_size, bbox_detector, segm_detector_opt, sam_model_opt, wildcard, detailer_hook, cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            result_img = torch.cat((result_img, enhanced_img), dim=0) if result_img is not None else enhanced_img
            result_mask = torch.cat((result_mask, mask), dim=0) if result_mask is not None else mask
            result_cropped_enhanced.extend(cropped_enhanced)
            result_cropped_enhanced_alpha.extend(cropped_enhanced_alpha)
            result_cnet_images.extend(cnet_pil_list)
        pipe = (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, None, None, None, None)
        return (result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, pipe, result_cnet_images)
```