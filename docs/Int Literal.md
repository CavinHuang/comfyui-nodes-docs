
# Documentation
- Class name: Int Literal
- Category: ImageSaverTools/utils
- Output node: False

Int Literal节点旨在为ImageSaverTools/utils类别提供一个简单的接口来生成整数字面量。它允许用户直接指定一个整数值，便于需要明确整数输入的操作。

# Input types
## Required
- int
    - 指定由节点生成的整数值。该参数支持直接输入整数，对于需要特定数值的操作来说至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出由输入参数指定的整数值。这个输出对于需要明确整数值的操作至关重要。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)



## Source code
```python
class IntLiteral:
    RETURN_TYPES = ("INT",)
    FUNCTION = "get_int"
    CATEGORY = "ImageSaverTools/utils"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"int": ("INT", {"default": 0, "min": 0, "max": 1000000})}}

    def get_int(self, int):
        return (int,)

```
