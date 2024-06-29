# Documentation
- Class name: SeargePromptStyles
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargePromptStyles 是一个用于管理和检索提示风格的节点。它作为一个界面，供用户定义和访问提示样式配置，确保提示根据用户的需求进行格式化。

# Input types
## Required
- data
    - 参数 'data' 是一个字典，它保存了提示样式的上下文。它是可选的，可以用来提供初始数据或设置，节点将使用这些数据或设置来确定提示的样式。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- data
    - 输出 'data' 是节点根据输入参数和样式配置生成的经过样式设置的提示数据流。它很重要，因为它提供了最终格式化的提示，供后续流程使用。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: SRG_DATA_STREAM

# Usage tips
- Infra type: CPU

# Source code
```
class SeargePromptStyles:

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
        data[UI.S_PROMPT_STYLING] = self.create_dict('example')
        return (data,)
```