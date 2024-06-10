# Documentation
- Class name: SeargeInput7
- Category: Searge/_deprecated_/UI/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为输入参数的多路复用器，简化了将各种设置集成到系统中的过程。它确保参数被正确路由和管理，便于整体操作无需手动干预。

# Input types
## Required
- lora_strength
    - Lora强度是一个关键参数，影响系统对输入信号的敏感性。它对于调整响应性并确保实现期望的输出至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- operation_mode
    - 操作模式决定了系统的一般工作状态，影响其行为和处理输入的方式。这对于将系统的功能与预期用例对齐至关重要。
    - Comfy dtype: ENUM
    - Python dtype: str
- prompt_style
    - 提示风格塑造了系统与用户的呈现和互动方式，确保以符合用户期望和系统设计的方式征求和处理输入。
    - Comfy dtype: ENUM
    - Python dtype: str
## Optional
- inputs
    - 输入是一个可选参数，允许对系统进行额外的定制和微调。它提供了一系列的选项，以根据具体要求进一步优化操作。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: Dict[str, Any]

# Output types
- inputs
    - 输出代表了整合和处理过的参数集，这些参数对于系统后续操作阶段至关重要。它封装了系统的配置，确保了预期功能的维持。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeInput7:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'lora_strength': ('FLOAT', {'default': 0.2, 'min': -10.0, 'max': 10.0, 'step': 0.05}), 'operation_mode': (SeargeParameterProcessor.OPERATION_MODE, {'default': SeargeParameterProcessor.OPERATION_MODE[0]}), 'prompt_style': (SeargeParameterProcessor.PROMPT_STYLE, {'default': SeargeParameterProcessor.PROMPT_STYLE[0]})}, 'optional': {'inputs': ('PARAMETER_INPUTS',)}}
    RETURN_TYPES = ('PARAMETER_INPUTS',)
    RETURN_NAMES = ('inputs',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/UI/Inputs'

    def mux(self, lora_strength, operation_mode, prompt_style, inputs=None):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs
        parameters['lora_strength'] = lora_strength
        parameters['operation_mode'] = operation_mode
        parameters['prompt_style'] = prompt_style
        return (parameters,)
```