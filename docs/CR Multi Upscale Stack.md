# Documentation
- Class name: CR_MultiUpscaleStack
- Category: Comfyroll/Upscale
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_MultiUpscaleStack 是一个旨在通过一系列上采样模型提高图像质量和分辨率的节点。它允许用户切换和选择不同的上采样模型，应用特定的重新缩放因子，并将它们的效果结合起来，以实现更优的结果。此节点对于需要高分辨率输出的任务至关重要，例如打印或在高DPI屏幕上显示。

# Input types
## Required
- switch_1
    - 开关参数决定第一个上采样模型是否在栈中被激活。它至关重要，因为它控制了模型在上采样过程中的包含，从而影响最终输出的质量。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- upscale_model_1
    - 选择上采样栈中使用的第一个模型。模型的选择对上采样结果有显著影响，因为不同的模型可能针对不同类型的图像或质量要求进行了优化。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- rescale_factor_1
    - 定义第一个上采样模型的缩放因子。这个参数至关重要，因为它决定了上采样的程度，直接影响结果图像的分辨率和清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_2
    - 栈中第二个模型的开关参数。它与switch_1扮演类似的角色，允许根据用户的选择有条件地应用第二个模型。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- upscale_model_2
    - 指定上采样过程中要考虑的第二个模型。选择可以改变栈的整体效果，特别是与其他模型结合使用时。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- rescale_factor_2
    - 设置第二个上采样模型的缩放因子。它与模型选择一起工作，根据用户的需求微调上采样过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_3
    - 控制第三个上采样模型是否包含在栈中。这个决定可以是策略性的，因为它允许选择性地提高图像质量。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- upscale_model_3
    - 识别栈中要应用的第三个上采样模型。模型的有效性可能因其与图像的兼容性以及预期结果的不同而有所不同。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- rescale_factor_3
    - 调整第三个上采样模型的缩放因子，允许精确控制栈的第三层的上采样强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- upscale_stack
    - 一个可选参数，允许用户输入一个预先存在的上采样模型栈及其因子。这可以通过在先前的配置基础上构建来简化上采样过程。
    - Comfy dtype: UPSCALE_STACK
    - Python dtype: List[Tuple[str, float]]

# Output types
- UPSCALE_STACK
    - 输出是一个结构化的列表，包含了通过节点处理激活和组合的上采样模型及其相应的重新缩放因子。这个输出很重要，因为它代表了上采样栈的最终配置。
    - Comfy dtype: UPSCALE_STACK
    - Python dtype: List[Tuple[str, float]]
- show_help
    - 提供文档的URL链接，以进一步协助和指导有效使用该节点。这对于新用户或需要额外信息时特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class CR_MultiUpscaleStack:

    @classmethod
    def INPUT_TYPES(s):
        mix_methods = ['Combine', 'Average', 'Concatenate']
        up_models = ['None'] + folder_paths.get_filename_list('upscale_models')
        return {'required': {'switch_1': (['On', 'Off'],), 'upscale_model_1': (up_models,), 'rescale_factor_1': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 16.0, 'step': 0.01}), 'switch_2': (['On', 'Off'],), 'upscale_model_2': (up_models,), 'rescale_factor_2': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 16.0, 'step': 0.01}), 'switch_3': (['On', 'Off'],), 'upscale_model_3': (up_models,), 'rescale_factor_3': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 16.0, 'step': 0.01})}, 'optional': {'upscale_stack': ('UPSCALE_STACK',)}}
    RETURN_TYPES = ('UPSCALE_STACK', 'STRING')
    RETURN_NAMES = ('UPSCALE_STACK', 'show_help')
    FUNCTION = 'stack'
    CATEGORY = icons.get('Comfyroll/Upscale')

    def stack(self, switch_1, upscale_model_1, rescale_factor_1, switch_2, upscale_model_2, rescale_factor_2, switch_3, upscale_model_3, rescale_factor_3, upscale_stack=None):
        upscale_list = list()
        if upscale_stack is not None:
            upscale_list.extend([l for l in upscale_stack if l[0] != 'None'])
        if upscale_model_1 != 'None' and switch_1 == 'On':
            (upscale_list.extend([(upscale_model_1, rescale_factor_1)]),)
        if upscale_model_2 != 'None' and switch_2 == 'On':
            (upscale_list.extend([(upscale_model_2, rescale_factor_2)]),)
        if upscale_model_3 != 'None' and switch_3 == 'On':
            (upscale_list.extend([(upscale_model_3, rescale_factor_3)]),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Upscale-Nodes#cr-multi-upscale-stack'
        return (upscale_list, show_help)
```