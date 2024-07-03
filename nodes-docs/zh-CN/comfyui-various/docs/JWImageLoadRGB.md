
# Documentation
- Class name: JWImageLoadRGB
- Category: jamesWalker55
- Output node: False

此节点旨在从指定路径加载图像并将其转换为 RGB 格式。它抽象了图像文件处理和转换的复杂性，为以 RGB 格式处理图像数据提供了一种直接的方法。

# Input types
## Required
- path
    - 指定要加载的图像文件的路径。这个参数至关重要，因为它决定了节点将处理和转换为 RGB 格式的图像文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 输出是转换为 RGB 格式的图像数据，可用于进一步处理或可视化。
    - Comfy dtype: IMAGE
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
