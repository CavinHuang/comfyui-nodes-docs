# Documentation
- Class name: smZ_CLIPTextEncode
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/shiimizu/ComfyUI_smZNodes.git

smZ_CLIPTextEncode节点旨在处理文本输入并将其转换为可用于进一步计算任务的结构化表示。它利用CLIP模型的力量来理解和生成文本嵌入，这对于各种AI驱动的应用程序至关重要。该节点抽象了文本编码的复杂性，允许用户专注于项目的更广泛目标，而不是文本处理的细节。

# Input types
## Required
- text
    - 文本参数至关重要，因为它提供了节点处理的原始文本数据。它为整个编码操作提供了基础，其内容直接影响生成嵌入的质量和相关性。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - clip参数代表节点用于编码文本的CLIP模型。这是一个关键元素，因为模型的能力和训练直接影响编码过程以及嵌入的后续使用。
    - Comfy dtype: CLIP
    - Python dtype: comfy.sd.CLIP
- parser
    - 解析器参数对于确定文本将如何被节点解释和处理至关重要。它影响文本表示的粒度和结构，这对编码的准确性和有效性至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- CONDITIONING
    - smZ_CLIPTextEncode节点的输出是一组从编码文本中派生的调节数据。这些数据非常重要，因为它可以用来指导和完善后续的AI模型或任务，为它们提供必要的上下文和结构。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: GPU

# Source code
```
class smZ_CLIPTextEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'parser': (['comfy', 'comfy++', 'A1111', 'full', 'compel', 'fixed attention'], {'default': 'comfy'}), 'mean_normalization': (BOOLEAN, {'default': True}), 'multi_conditioning': (BOOLEAN, {'default': True}), 'use_old_emphasis_implementation': (BOOLEAN, {'default': False}), 'with_SDXL': (BOOLEAN, {'default': False}), 'ascore': ('FLOAT', {'default': 6.0, 'min': 0.0, 'max': 1000.0, 'step': 0.01}), 'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'text_g': ('STRING', {'multiline': True, 'placeholder': 'CLIP_G'}), 'text_l': ('STRING', {'multiline': True, 'placeholder': 'CLIP_L'})}, 'optional': {'smZ_steps': ('INT', {'default': 1, 'min': 1, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning'

    def encode(self, clip: comfy.sd.CLIP, text, parser, mean_normalization, multi_conditioning, use_old_emphasis_implementation, with_SDXL, ascore, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l, smZ_steps=1):
        params = locals()
        params['steps'] = params.pop('smZ_steps', smZ_steps)
        from .modules.shared import opts_default as opts
        should_use_fp16_signature = inspect.signature(comfy.model_management.should_use_fp16)
        _p = should_use_fp16_signature.parameters
        devices.device = shared.device = clip.patcher.load_device if hasattr(clip.patcher, 'load_device') else clip.device
        if 'device' in _p and 'prioritize_performance' in _p:
            should_use_fp16 = partial(comfy.model_management.should_use_fp16, device=devices.device, prioritize_performance=False)
        elif 'device' in should_use_fp16_signature.parameters:
            should_use_fp16 = partial(comfy.model_management.should_use_fp16, device=devices.device)
        else:
            should_use_fp16 = comfy.model_management.should_use_fp16
        dtype = torch.float16 if should_use_fp16() else torch.float32
        dtype_unet = dtype
        devices.dtype = dtype
        if devices.dtype_unet == torch.float16:
            devices.dtype_unet = dtype_unet
        devices.unet_needs_upcast = opts.upcast_sampling and devices.dtype == torch.float16 and (devices.dtype_unet == torch.float16)
        devices.dtype_vae = comfy.model_management.vae_dtype() if hasattr(comfy.model_management, 'vae_dtype') else torch.float32
        params.pop('self', None)
        result = run(**params)
        result[0][0][1]['params'] = {}
        result[0][0][1]['params'].update(params)
        if opts.pad_cond_uncond:
            text = params['text']
            with_SDXL = params['with_SDXL']
            params['text'] = ''
            params['with_SDXL'] = False
            empty = run(**params)[0]
            params['text'] = text
            params['with_SDXL'] = with_SDXL
            shared.sd_model.cond_stage_model_empty_prompt = empty[0][0]
        return result
```