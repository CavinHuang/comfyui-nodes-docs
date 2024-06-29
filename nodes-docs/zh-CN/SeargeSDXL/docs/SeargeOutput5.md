# Documentation
- Class name: SeargeOutput5
- Category: Searge/_deprecated_/UI/Outputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点将输入参数分类并分离成不同的输出，便于系统内部数据的组织和流动。

# Input types
## Required
- parameters
    - 该参数作为一组综合设置，指导节点的操作。它对节点正确运行和产生有意义的结果至关重要。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- parameters
    - 提供的原始参数集，保持不变。此输出保持输入数据的完整性以供进一步使用。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]
- base_conditioning_scale
    - 该输出代表基础条件的缩放因子，对于调整基础输入在整个过程中的影响至关重要。
    - Comfy dtype: float
    - Python dtype: float
- refiner_conditioning_scale
    - 该输出是精炼条件的缩放因子，它在根据输入参数微调输出方面发挥关键作用。
    - Comfy dtype: float
    - Python dtype: float
- style_prompt_power
    - 该输出表示风格提示的功率级别，它在决定最终结果的风格影响方面非常重要。
    - Comfy dtype: float
    - Python dtype: float
- negative_style_power
    - 该输出代表风格提示的负面功率级别，它在控制输出中不希望出现的风格元素方面很重要。
    - Comfy dtype: float
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOutput5:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameters': ('PARAMETERS',)}}
    RETURN_TYPES = ('PARAMETERS', 'FLOAT', 'FLOAT', 'FLOAT', 'FLOAT')
    RETURN_NAMES = ('parameters', 'base_conditioning_scale', 'refiner_conditioning_scale', 'style_prompt_power', 'negative_style_power')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Outputs'

    def demux(self, parameters):
        base_conditioning_scale = parameters['base_conditioning_scale']
        refiner_conditioning_scale = parameters['refiner_conditioning_scale']
        style_prompt_power = parameters['style_prompt_power']
        negative_style_power = parameters['negative_style_power']
        return (parameters, base_conditioning_scale, refiner_conditioning_scale, style_prompt_power, negative_style_power)
```