# Documentation
- Class name: PatchModelAddDownscale
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PatchModelAddDownscale节点旨在通过在模型架构中指定的块引入下采样操作来修改给定模型的行为。它通过允许在处理阶段调整图像分辨率来增强模型的功能，这对于优化性能或实现所需的输出质量特别有用。

# Input types
## Required
- model
    - 模型参数是必需的，因为它定义了将由节点修改的基础模型。它是主要输入，决定了节点的后续行为和输出的性质。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- block_number
    - 块编号参数标识模型中将应用下采样操作的特定块。它在确定模型架构中修改点方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- downscale_factor
    - 下采样因子参数控制应用于输入的下采样程度。它是转换过程中的关键决定因素，显著影响最终输出的分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 开始百分比参数指定下采样将生效的sigma范围的开始。它是控制模型处理序列中下采样操作时机的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 结束百分比参数标记下采样操作的sigma范围的结束。它与开始百分比一起，定义了模型工作流程中下采样的操作窗口。
    - Comfy dtype: FLOAT
    - Python dtype: float
- downscale_after_skip
    - 下采样后跳过参数指示是否应在模型中跳过某些块后进行下采样。这个决定影响模型的结构完整性和下采样过程的效率。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- downscale_method
    - 下采样方法参数决定用于下采样输入的算法。这是一个关键选择，可以影响下采样输出的质量和特性。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_method
    - 上采样方法参数确定用于上采样处理输出的技术。它在模型输出的最终分辨率和视觉保真度中扮演重要角色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 输出模型是输入模型的修改版本，现在配备了额外的下采样功能。它代表了节点处理的成果，并且已准备好用于进一步使用或分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class PatchModelAddDownscale:
    upscale_methods = ['bicubic', 'nearest-exact', 'bilinear', 'area', 'bislerp']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'block_number': ('INT', {'default': 3, 'min': 1, 'max': 32, 'step': 1}), 'downscale_factor': ('FLOAT', {'default': 2.0, 'min': 0.1, 'max': 9.0, 'step': 0.001}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent': ('FLOAT', {'default': 0.35, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'downscale_after_skip': ('BOOLEAN', {'default': True}), 'downscale_method': (s.upscale_methods,), 'upscale_method': (s.upscale_methods,)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = '_for_testing'

    def patch(self, model, block_number, downscale_factor, start_percent, end_percent, downscale_after_skip, downscale_method, upscale_method):
        sigma_start = model.model.model_sampling.percent_to_sigma(start_percent)
        sigma_end = model.model.model_sampling.percent_to_sigma(end_percent)

        def input_block_patch(h, transformer_options):
            if transformer_options['block'][1] == block_number:
                sigma = transformer_options['sigmas'][0].item()
                if sigma <= sigma_start and sigma >= sigma_end:
                    h = comfy.utils.common_upscale(h, round(h.shape[-1] * (1.0 / downscale_factor)), round(h.shape[-2] * (1.0 / downscale_factor)), downscale_method, 'disabled')
            return h

        def output_block_patch(h, hsp, transformer_options):
            if h.shape[2] != hsp.shape[2]:
                h = comfy.utils.common_upscale(h, hsp.shape[-1], hsp.shape[-2], upscale_method, 'disabled')
            return (h, hsp)
        m = model.clone()
        if downscale_after_skip:
            m.set_model_input_block_patch_after_skip(input_block_patch)
        else:
            m.set_model_input_block_patch(input_block_patch)
        m.set_model_output_block_patch(output_block_patch)
        return (m,)
```