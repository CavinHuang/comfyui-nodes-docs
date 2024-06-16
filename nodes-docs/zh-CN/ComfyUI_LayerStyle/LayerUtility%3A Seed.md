# Documentation
- Class name: SeedNode
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

输出一个种子值。

# Input types
## Required

- seed
    - 类型: INT
    - 整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- seed
    - 类型: INT
    - 整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SeedNode:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(self):
        return {"required": {
                "seed":("INT", {"default": 0, "min": 0, "max": 99999999999999999999, "step": 1}),
            },}

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("seed",)
    FUNCTION = 'seed_node'
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def seed_node(self, seed):
        return (seed,)
```