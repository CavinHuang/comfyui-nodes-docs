# Documentation
- Class name: IntegerNode
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

输出一个整数。

# Input types
## Required

- int_value
    - 类型: INT
    - 整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- int
    - 类型: INT
    - 整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class IntegerNode:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(self):
        return {"required": {
                "int_value":("INT", {"default": 0, "min": -99999999999999999999, "max": 99999999999999999999, "step": 1}),
            },}

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("int",)
    FUNCTION = 'integer_node'
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def integer_node(self, int_value):
        return (int_value,)
```