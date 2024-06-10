# Documentation
- Class name: SeargeGenerated1
- Category: Searge/_deprecated_/UI/Generated
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为一个多路复用器，根据输入参数将它们路由到由输入指定的特定操作和风格。

# Input types
## Required
- parameters
    - 该参数保存关键值对，这些关键值对指示节点的操作和风格选择，对确定节点的行为和输出起着关键作用。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- parameters
    - 输出保留了输入参数，为后续操作提供了基础。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]
- operation_selector
    - 此输出标识所选操作，指导节点的处理流程。
    - Comfy dtype: str
    - Python dtype: str
- prompt_style_selector
    - 此输出表示选定的提示风格，影响节点结果的呈现和格式化。
    - Comfy dtype: str
    - Python dtype: str
- prompt_style_group
    - 此输出代表提示风格的组，影响节点输出的整体美学和结构。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeGenerated1:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameters': ('PARAMETERS',)}}
    RETURN_TYPES = ('PARAMETERS', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('parameters', 'operation_selector', 'prompt_style_selector', 'prompt_style_group')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Generated'

    def demux(self, parameters):
        operation_selector = parameters['operation_selector']
        prompt_style_selector = parameters['prompt_style_selector']
        prompt_style_group = parameters['prompt_style_group']
        return (parameters, operation_selector, prompt_style_selector, prompt_style_group)
```