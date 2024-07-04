
# Documentation
- Class name: JWImageLoadRGBA
- Category: jamesWalker55
- Output node: False

JWImageLoadRGBA节点专门用于加载RGBA格式的图像。它将图像分离为颜色分量和alpha通道，有效地基于alpha通道创建遮罩。

# Input types
## Required
- path
    - 指定需要加载的图像文件路径。这对于定位和加载RGBA格式的图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 表示加载图像的颜色分量，不包括alpha通道。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 表示图像的反转alpha通道，用作遮罩。
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
