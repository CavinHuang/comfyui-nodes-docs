# Documentation
- Class name: SeargeInput5
- Category: Searge/_deprecated_/UI/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeInput5节点作为处理和整合各种条件尺度和风格参数的中心枢纽，为进一步处理提供一致的输入集。它旨在处理必需和可选参数，确保输入配置的灵活性，同时保持数据流的结构化方法。

# Input types
## Required
- base_conditioning_scale
    - 基础条件尺度是一个关键参数，它影响处理流水线中初始的细节水平。它为后续的细化阶段设定了基调，影响输出的整体质量和分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_conditioning_scale
    - 细化条件尺度对于在初始处理后微调输出至关重要。它允许对最终结果的细节和清晰度进行调整，确保输出精致且经过精炼。
    - Comfy dtype: FLOAT
    - Python dtype: float
- style_prompt_power
    - 风格提示功率决定了风格模板对最终输出的影响。它是形成结果的艺术性和审美方面的关键因素，允许在创造性和控制性之间取得平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- negative_style_power
    - 负风格功率用于抵消或抑制输出中的某些风格元素。它提供了一种对结果的风格方向进行精细控制的机制，实现了对风格应用的微妙方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- style_template
    - 风格模板参数在定义输出的风格框架中起着关键作用。它作为艺术表达的蓝图，指导最终产品的整体外观和感觉。
    - Comfy dtype: SeargeParameterProcessor.STYLE_TEMPLATE
    - Python dtype: str
## Optional
- inputs
    - 可选的输入参数允许在节点操作中进行额外的定制和灵活性。它允许集成外部数据源或参数，可以进一步细化节点的功能。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: Dict[str, Any]

# Output types
- parameters
    - 输出参数封装了处理后的输入，提供了一个结构化的数据集，准备进行下游处理。这个输出很重要，因为它构成了工作流中后续操作的基础。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeInput5:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_conditioning_scale': ('FLOAT', {'default': 2.0, 'min': 0.25, 'max': 4.0, 'step': 0.25}), 'refiner_conditioning_scale': ('FLOAT', {'default': 2.0, 'min': 0.25, 'max': 4.0, 'step': 0.25}), 'style_prompt_power': ('FLOAT', {'default': 0.33, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'negative_style_power': ('FLOAT', {'default': 0.67, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'style_template': (SeargeParameterProcessor.STYLE_TEMPLATE, {'default': SeargeParameterProcessor.STYLE_TEMPLATE[0]})}, 'optional': {'inputs': ('PARAMETER_INPUTS',)}}
    RETURN_TYPES = ('PARAMETER_INPUTS',)
    RETURN_NAMES = ('inputs',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/UI/Inputs'

    def mux(self, base_conditioning_scale, refiner_conditioning_scale, style_prompt_power, negative_style_power, style_template, inputs=None):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs
        parameters['base_conditioning_scale'] = base_conditioning_scale
        parameters['refiner_conditioning_scale'] = refiner_conditioning_scale
        parameters['style_prompt_power'] = style_prompt_power
        parameters['negative_style_power'] = negative_style_power
        parameters['style_template'] = style_template
        return (parameters,)
```