
# Documentation
- Class name: JWMaskLikeImageSize
- Category: jamesWalker55
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

JWMaskLikeImageSize节点用于生成与输入图像尺寸相同的掩码。该掩码由指定的值填充，这在创建与给定图像尺寸匹配的均匀掩码时非常有用。这种功能在图像处理、分割或合成任务中特别有价值，可以轻松创建自定义的全图掩码。

# Input types
## Required
- image
    - 这是输入图像张量，其尺寸将用于确定生成掩码的大小。这个参数决定了输出掩码的宽度和高度，确保掩码与原始图像完全匹配。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- value
    - 这是一个用于填充生成掩码的浮点值。通过调整这个值，用户可以自定义掩码的强度或透明度，从而实现不同的视觉效果或满足特定的处理需求。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- mask
    - 输出是一个与输入图像大小相同的掩码张量，由指定的值填充。这个掩码可以直接用于各种图像处理任务，如图像混合、区域选择或效果应用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
