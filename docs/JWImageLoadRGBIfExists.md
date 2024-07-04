
# Documentation
- Class name: JWImageLoadRGBIfExists
- Category: jamesWalker55
- Output node: False

这个节点旨在从指定路径加载 RGB 图像（如果该图像存在）；否则，它将返回作为输入提供的默认图像。它确保操作是基于文件存在与否的条件执行，从而在无法保证图像文件存在的工作流中实现灵活的图像处理。

# Input types
## Required
- default
    - 当指定路径不包含图像文件时要返回的默认图像。这提供了一个备选方案，确保即使在目标文件不存在的情况下，节点操作也能继续进行。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- path
    - 指定要加载的图像的文件路径。如果文件不存在，节点将使用提供的默认图像。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 如果指定文件存在，则输出加载的 RGB 图像；如果不存在，则输出默认图像。这个输出便于后续的图像处理或分析步骤。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGBIfExists", "Image Load RGB If Exists")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "default": ("IMAGE",),
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str, default: torch.Tensor):
        assert isinstance(path, str)
        assert isinstance(default, torch.Tensor)

        if not os.path.exists(path):
            return (default,)

        img = load_image(path)
        return (img,)

    @classmethod
    def IS_CHANGED(cls, path: str, default: torch.Tensor):
        if os.path.exists(path):
            mtime = os.path.getmtime(path)
        else:
            mtime = None
        return (mtime, default.__hash__())

```
