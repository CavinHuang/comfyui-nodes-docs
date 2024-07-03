
# Documentation
- Class name: JWImageExtractFromBatch
- Category: jamesWalker55
- Output node: False

这个节点根据指定的索引从一批图像中提取单个图像，便于进行个别图像处理或分析。

# Input types
## Required
- images
    - 这是将要从中提取单个图像的图像批次。它对于选择特定图像进行处理或分析至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- index
    - 这是要从图像批次中提取的图像的索引。它决定了哪一张图像被选中进行提取。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 这是从输入批次的指定索引处提取出的单个图像。
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
