# Documentation
- Class name: SeargeStylePreprocessor
- Category: Searge/_deprecated_/UI
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeStylePreprocessor旨在处理和操作处理流程中与风格相关的输入，确保风格信息被正确解释并为后续阶段准备好。

# Input types
## Required
- inputs
    - 该参数是预处理操作的主要数据来源。它包含各种对节点正常运行和产生有意义结果至关重要的输入。
    - Comfy dtype: DICT[str, Any]
    - Python dtype: Dict[str, Any]
- active_style_name
    - 该参数对于在输入集中识别活动风格至关重要。它通过指定应应用哪些风格定义来指导预处理。
    - Comfy dtype: STRING
    - Python dtype: str
- style_definitions
    - 该参数包含可能在预处理中使用的各种风格的的定义。它对节点很重要，因为它决定了风格如何被解释和转换。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- inputs
    - 处理后的输入以正确准备和结构化的风格信息返回，允许无缝集成到处理流水线的下一个阶段。
    - Comfy dtype: DICT[str, Any]
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeStylePreprocessor:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'inputs': ('PARAMETER_INPUTS',), 'active_style_name': ('STRING', {'multiline': False, 'default': ''}), 'style_definitions': ('STRING', {'multiline': True, 'default': '[unfinished work in progress]'})}}
    RETURN_TYPES = ('PARAMETER_INPUTS',)
    RETURN_NAMES = ('inputs',)
    FUNCTION = 'process'
    CATEGORY = 'Searge/_deprecated_/UI'

    def process(self, inputs, active_style_name, style_definitions):
        if inputs is None:
            inputs = {}
        style_template = inputs['style_template']
        if style_template is None or style_template != SeargeParameterProcessor.STYLE_TEMPLATE[1]:
            return (inputs,)
        return (inputs,)
```