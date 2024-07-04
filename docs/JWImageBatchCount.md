
# Documentation
- Class name: JWImageBatchCount
- Category: jamesWalker55
- Output node: False

JWImageBatchCount节点用于计算给定图像批次中的总图像数量，提供了一种简单的方法来确定图像批次的大小。

# Input types
## Required
- images
    - 包含一批图像的张量。这是确定批次中图像总数的关键输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- int
    - 输入批次中存在的图像总数。
    - Comfy dtype: INT
    - Python dtype: int


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
