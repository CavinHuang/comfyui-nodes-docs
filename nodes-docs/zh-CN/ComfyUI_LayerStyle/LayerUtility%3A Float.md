# Documentation
- Class name: FloatNode
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

输出一个浮点数。

# Input types
## Required

- float_value
    - 类型: FLOAT
    - 浮点数值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types

- float
    - 类型: FLOAT
    - 浮点数值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class FloatNode:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(self):
        return {"required": {
                "float_value":  ("FLOAT", {"default": 0, "min": -99999999999999999999, "max": 99999999999999999999, "step": 0.00001}),
            },}

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("float",)
    FUNCTION = 'float_node'
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def float_node(self, float_value):
        return (float_value,)
```