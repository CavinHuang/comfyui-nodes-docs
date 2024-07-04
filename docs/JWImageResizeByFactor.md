
# Documentation
- Class name: JWImageResizeByFactor
- Category: jamesWalker55
- Output node: False

此节点通过指定的缩放因子来调整图像大小，允许灵活的图像缩放，并提供多种插值模式以保持图像质量。

# Input types
## Required
- image
    - 待调整大小的输入图像。这个参数至关重要，因为它提供了用于调整大小操作的源图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- factor
    - 指定图像调整大小的缩放因子。大于1的因子会放大图像，而小于1的因子会缩小图像。
    - Comfy dtype: FLOAT
    - Python dtype: float
- interpolation_mode
    - 决定在调整大小操作期间用于像素值之间插值的方法，影响输出图像的质量和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 经过指定因子缩放并使用所选插值模式调整大小后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
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
