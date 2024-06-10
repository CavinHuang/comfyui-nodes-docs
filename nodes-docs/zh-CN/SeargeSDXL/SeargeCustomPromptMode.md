# Documentation
- Class name: SeargeCustomPromptMode
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在促进用户界面中提示模式的定制，特别是针对数据流处理。它允许对数据呈现和交互方式进行动态调整，通过允许定制输入处理，增强用户体验。

# Input types
## Optional
- data
    - ‘data’参数作为将由节点操作的数据流的通道。它在确定节点处理和定制的信息内容和结构方面至关重要。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Union[Dict[str, Any], None]

# Output types
- data
    - 输出‘data’参数代表节点处理后的修改后的数据流。它封装了定制的提示模式和对原始数据结构所做的任何更改。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeCustomPromptMode:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(example):
        return {UI.EXAMPLE: example}

    def get(self, data=None):
        if data is None:
            data = {}
        data[UI.S_CUSTOM_PROMPTING] = self.create_dict('example')
        return (data,)
```