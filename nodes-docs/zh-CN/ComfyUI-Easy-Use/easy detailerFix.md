# Documentation
- Class name: detailerFix
- Category: EasyUse/Fix
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

detailerFix节点旨在通过使用先进的模型和算法来增强图像细节。它专注于提炼图像的视觉元素，提高其整体质量和清晰度。该节点的主要目标是提供一个简单而有效的细节增强解决方案，无需广泛的图像处理知识。

# Input types
## Required
- pipe
    - pipe参数是必需的，因为它携带了detailerFix节点执行其功能所需的所有必要信息和设置。它包括模型、图像和其他设置，这些设置决定了如何进行细节增强。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image_output
    - image_output参数决定了处理后结果图像的处理方式。它允许用户选择预览、保存或两者的组合，从而控制输出流程。
    - Comfy dtype: COMBO
    - Python dtype: str
- link_id
    - 当image_output设置为'Sender'或'Sender/Save'时，link_id对节点的操作至关重要。它建立了图像传输的连接，确保处理后的图像被送达正确的目的地。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- save_prefix
    - save_prefix参数用于定义保存的图像文件的共同前缀。这有助于组织输出，使用户更容易定位和管理增强的图像。
    - Comfy dtype: STRING
    - Python dtype: str
- model
    - model参数提供了细节增强过程所需的模型。当pipe参数中不包含模型时，这一点尤为重要，确保节点能够访问处理所需的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- prompt
    - prompt参数用于提供可以指导细节增强过程的额外信息或指令。它可以包括用户希望在执行期间考虑的特定细节或偏好。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - extra_pnginfo参数包含可以用来细化细节增强过程的补充数据。它提供了额外的上下文或选项，可以提高输出图像的质量。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]
- my_unique_id
    - my_unique_id参数用于跟踪和管理单个图像细节的处理。它有助于将输出与特定请求关联起来，确保结果的准确性和组织性。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: int

# Output types
- pipe
    - pipe输出是一个包含增强图像和输入pipe中所有相关信息的综合性结构。它作为处理数据的通道，确保结果正确地沿管道传递。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - image输出是detailerFix节点的主要结果，即增强后的图像。它是细节增强过程的最终成果，并旨在成为用户的最终产品。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_refined
    - cropped_refined输出是增强图像的裁剪版本，以获得更好的焦点和清晰度。它突出显示了图像中已经被提炼和改进的区域，清晰地展示了节点的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_enhanced_alpha
    - cropped_enhanced_alpha输出是增强图像的专用版本，包含代表透明度的alpha通道。这种输出对于需要图像层叠或合成的应用特别有用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class detailerFix:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'model': ('MODEL',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('pipe', 'image', 'cropped_refined', 'cropped_enhanced_alpha')
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (False, False, True, True)
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Fix'

    def doit(self, pipe, image_output, link_id, save_prefix, model=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        easyCache.update_loaded_objects(prompt)
        my_unique_id = int(my_unique_id)
        model = model or (pipe['model'] if 'model' in pipe else None)
        if model is None:
            raise Exception(f"[ERROR] model or pipe['model'] is missing")
        detail_fix_settings = pipe['detail_fix_settings'] if 'detail_fix_settings' in pipe else None
        if detail_fix_settings is None:
            raise Exception(f"[ERROR] detail_fix_settings or pipe['detail_fix_settings'] is missing")
        mask = pipe['mask'] if 'mask' in pipe else None
        image = pipe['images']
        clip = pipe['clip']
        vae = pipe['vae']
        seed = pipe['seed']
        positive = pipe['positive']
        negative = pipe['negative']
        loader_settings = pipe['loader_settings'] if 'loader_settings' in pipe else {}
        guide_size = pipe['detail_fix_settings']['guide_size'] if 'guide_size' in pipe['detail_fix_settings'] else 256
        guide_size_for = pipe['detail_fix_settings']['guide_size_for'] if 'guide_size_for' in pipe['detail_fix_settings'] else True
        max_size = pipe['detail_fix_settings']['max_size'] if 'max_size' in pipe['detail_fix_settings'] else 768
        steps = pipe['detail_fix_settings']['steps'] if 'steps' in pipe['detail_fix_settings'] else 20
        cfg = pipe['detail_fix_settings']['cfg'] if 'cfg' in pipe['detail_fix_settings'] else 1.0
        sampler_name = pipe['detail_fix_settings']['sampler_name'] if 'sampler_name' in pipe['detail_fix_settings'] else None
        scheduler = pipe['detail_fix_settings']['scheduler'] if 'scheduler' in pipe['detail_fix_settings'] else None
        denoise = pipe['detail_fix_settings']['denoise'] if 'denoise' in pipe['detail_fix_settings'] else 0.5
        feather = pipe['detail_fix_settings']['feather'] if 'feather' in pipe['detail_fix_settings'] else 5
        crop_factor = pipe['detail_fix_settings']['crop_factor'] if 'crop_factor' in pipe['detail_fix_settings'] else 3.0
        drop_size = pipe['detail_fix_settings']['drop_size'] if 'drop_size' in pipe['detail_fix_settings'] else 10
        refiner_ratio = pipe['detail_fix_settings']['refiner_ratio'] if 'refiner_ratio' in pipe else 0.2
        batch_size = pipe['detail_fix_settings']['batch_size'] if 'batch_size' in pipe['detail_fix_settings'] else 1
        noise_mask = pipe['detail_fix_settings']['noise_mask'] if 'noise_mask' in pipe['detail_fix_settings'] else None
        force_inpaint = pipe['detail_fix_settings']['force_inpaint'] if 'force_inpaint' in pipe['detail_fix_settings'] else False
        wildcard = pipe['detail_fix_settings']['wildcard'] if 'wildcard' in pipe['detail_fix_settings'] else ''
        cycle = pipe['detail_fix_settings']['cycle'] if 'cycle' in pipe['detail_fix_settings'] else 1
        bbox_segm_pipe = pipe['bbox_segm_pipe'] if pipe and 'bbox_segm_pipe' in pipe else None
        sam_pipe = pipe['sam_pipe'] if 'sam_pipe' in pipe else None
        start_time = int(time.time() * 1000)
        if 'mask_settings' in pipe:
            mask_mode = pipe['mask_settings']['mask_mode'] if 'inpaint_model' in pipe['mask_settings'] else True
            inpaint_model = pipe['mask_settings']['inpaint_model'] if 'inpaint_model' in pipe['mask_settings'] else False
            noise_mask_feather = pipe['mask_settings']['noise_mask_feather'] if 'noise_mask_feather' in pipe['mask_settings'] else 20
            cls = ALL_NODE_CLASS_MAPPINGS['MaskDetailerPipe']
            if 'MaskDetailerPipe' not in ALL_NODE_CLASS_MAPPINGS:
                raise Exception(f"[ERROR] To use MaskDetailerPipe, you need to install 'Impact Pack'")
            basic_pipe = (model, clip, vae, positive, negative)
            (result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, basic_pipe, refiner_basic_pipe_opt) = cls().doit(image, mask, basic_pipe, guide_size, guide_size_for, max_size, mask_mode, seed, steps, cfg, sampler_name, scheduler, denoise, feather, crop_factor, drop_size, refiner_ratio, batch_size, cycle=1, refiner_basic_pipe_opt=None, detailer_hook=None, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            result_mask = mask
            result_cnet_images = ()
        else:
            if bbox_segm_pipe is None:
                raise Exception(f"[ERROR] bbox_segm_pipe or pipe['bbox_segm_pipe'] is missing")
            if sam_pipe is None:
                raise Exception(f"[ERROR] sam_pipe or pipe['sam_pipe'] is missing")
            (bbox_detector_opt, bbox_threshold, bbox_dilation, bbox_crop_factor, segm_detector_opt) = bbox_segm_pipe
            (sam_model_opt, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative) = sam_pipe
            if 'FaceDetailer' not in ALL_NODE_CLASS_MAPPINGS:
                raise Exception(f"[ERROR] To use FaceDetailer, you need to install 'Impact Pack'")
            cls = ALL_NODE_CLASS_MAPPINGS['FaceDetailer']
            (result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, pipe, result_cnet_images) = cls().doit(image, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, bbox_threshold, bbox_dilation, bbox_crop_factor, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative, drop_size, bbox_detector_opt, wildcard, cycle, sam_model_opt, segm_detector_opt, detailer_hook=None)
        end_time = int(time.time() * 1000)
        spent_time = '细节修复:' + str((end_time - start_time) / 1000) + '秒'
        results = easySave(result_img, save_prefix, image_output, prompt, extra_pnginfo)
        sampler.update_value_by_id('results', my_unique_id, results)
        easyCache.update_loaded_objects(prompt)
        new_pipe = {'samples': None, 'images': result_img, 'model': model, 'clip': clip, 'vae': vae, 'seed': seed, 'positive': positive, 'negative': negative, 'wildcard': wildcard, 'bbox_segm_pipe': bbox_segm_pipe, 'sam_pipe': sam_pipe, 'loader_settings': {**loader_settings, 'spent_time': spent_time}, 'detail_fix_settings': detail_fix_settings}
        if 'mask_settings' in pipe:
            new_pipe['mask_settings'] = pipe['mask_settings']
        sampler.update_value_by_id('pipe_line', my_unique_id, new_pipe)
        del bbox_segm_pipe
        del sam_pipe
        del pipe
        if image_output in ('Hide', 'Hide/Save'):
            return {'ui': {}, 'result': (new_pipe, result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, result_cnet_images)}
        if image_output in ('Sender', 'Sender/Save'):
            PromptServer.instance.send_sync('img-send', {'link_id': link_id, 'images': results})
        return {'ui': {'images': results}, 'result': (new_pipe, result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, result_cnet_images)}
```