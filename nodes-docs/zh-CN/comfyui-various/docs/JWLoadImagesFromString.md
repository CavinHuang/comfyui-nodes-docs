
# Documentation
- Class name: JWLoadImagesFromString
- Category: jamesWalker55
- Output node: False

JWLoadImagesFromString节点旨在直接从字符串输入加载图像，促进文本图像数据到可用图像格式的转换，以便进行后续处理或可视化。

# Input types
## Required
- paths
    - paths参数接受一个字符串列表形式的文件路径，用于指示要加载的图像位置。这个输入对于识别和访问用户指定的图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- ignore_missing_images
    - ignore_missing_images是一个布尔标志，决定了如何处理'paths'中指定的缺失图像。如果设置为True，缺失的图像将被忽略而不会引发错误；否则，对于任何缺失的图像都会抛出错误。
    - Comfy dtype: ['false', 'true']
    - Python dtype: bool

# Output types
- image
    - 输出从指定文件路径加载的单张图像或一批图像。这个输出对于后续的图像处理或可视化任务至关重要。
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
