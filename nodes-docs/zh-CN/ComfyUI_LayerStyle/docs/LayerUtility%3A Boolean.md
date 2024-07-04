# Documentation
- Class name: BooleanNode
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

输出一个布尔值。

# Input types
## Required

- bool_value
    - 类型: BOOLEAN
    - 布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types

- boolean
    - 类型: BOOLEAN
    - 布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class BooleanNode:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(self):
        return {"required": {
                "bool_value": ("BOOLEAN", {"default": False}),
            },}

    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("boolean",)
    FUNCTION = 'boolean_node'
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def boolean_node(self, bool_value):
        return (bool_value,)
```