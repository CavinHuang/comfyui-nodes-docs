
# Documentation
- Class name: JWImageResizeByShorterSide
- Category: jamesWalker55
- Output node: False

JWImageResizeByShorterSide 节点用于调整图像大小，通过将较短边调整到指定尺寸来实现，同时保持图像的纵横比。该节点支持多种插值方法，以适应不同的图像缩放需求。

# Input types
## Required
- image
    - 待调整大小的图像张量。这是定义将要进行大小调整的视觉内容的关键输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - 图像较短边的目标尺寸。此参数确保在调整大小过程中保持图像的纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation_mode
    - 指定用于在调整大小后的图像中插值像素的方法。这会影响输出图像的视觉质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 调整大小后的图像张量。输出图像的较短边已调整为指定尺寸，同时保持了原始的纵横比。
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
