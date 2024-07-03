
# Documentation
- Class name: Width_Height Literal
- Category: ImageSaverTools/utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Width/Height Literal节点旨在提供一种简单直接的方式来指定和传递固定的宽度和高度值,作为参数在基于节点的处理流程中使用。这个节点简化了各种操作的尺寸配置,确保下游节点能接收到一致且准确的尺寸规格。

# Input types
## Required
- int
    - 该参数用于指定宽度或高度的整数值。它是节点的核心输入,直接决定了输出的尺寸参数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出一个整数值,代表指定的宽度或高度。这个输出可以被其他节点用作尺寸参数,确保处理流程中尺寸的一致性和准确性。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Image Generate Gradient](../../was-node-suite-comfyui/Nodes/Image Generate Gradient.md)
    - Generate Noise Image
    - [Image Perlin Noise](../../was-node-suite-comfyui/Nodes/Image Perlin Noise.md)



## Source code
```python
class SizeLiteral:
    RETURN_TYPES = ("INT",)
    FUNCTION = "get_int"
    CATEGORY = "ImageSaverTools/utils"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"int": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 8})}}

    def get_int(self, int):
        return (int,)

```
