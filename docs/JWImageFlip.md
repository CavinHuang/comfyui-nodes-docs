
# Documentation
- Class name: JWImageFlip
- Category: jamesWalker55
- Output node: False

JWImageFlip节点用于在指定方向上翻转图像,可以是水平或垂直方向。这是图像处理任务中的一项基本操作,常用于需要调整图像方向的场景。

# Input types
## Required
- image
    - 需要翻转的图像张量。这个参数至关重要,因为它直接决定了哪张图像会被进行翻转操作,从而影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- direction
    - 指定翻转的方向,可以是"水平"(horizontal)或"垂直"(vertical)。这个参数决定了图像将如何被操作,进而影响输出图像的最终朝向。
    - Comfy dtype: ['horizontal', 'vertical']
    - Python dtype: str

# Output types
- image
    - 翻转后的图像张量。这个输出是对输入图像应用指定翻转操作的直接结果。
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
