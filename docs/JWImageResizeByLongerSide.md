
# Documentation
- Class name: JWImageResizeByLongerSide
- Category: jamesWalker55
- Output node: False

JWImageResizeByLongerSide节点用于调整图像尺寸，它通过将图像的较长边调整到指定大小来实现，同时保持原有的宽高比。此外，该节点还允许在调整过程中应用不同的插值方法，以控制输出图像的视觉质量。

# Input types
## Required
- image
    - 需要调整大小的输入图像。在调整尺寸的过程中，保持图像的视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - 图像较长边的目标尺寸。这个参数决定了新的图像尺寸，同时确保保持原有的宽高比。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation_mode
    - 指定在调整图像大小时用于插值像素的方法。这个参数会影响输出图像的视觉质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出的是调整大小后的图像，其较长边已被调整到指定尺寸，并且保持了原有的宽高比。
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
