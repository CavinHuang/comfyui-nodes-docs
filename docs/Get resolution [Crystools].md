
# Documentation
- Class name: Get resolution [Crystools]
- Category: crystools 🪛/Image
- Output node: True

该节点旨在确定图像的分辨率，提供了一种直接提取和利用图像尺寸的简便方法。它抽象了处理图像数据结构的复杂性，提供了一个简单的接口来获取宽度和高度信息。

# Input types
## Required
- image
    - 需要确定分辨率的图像。它在节点操作中起着至关重要的作用，作为提取尺寸的主要数据源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- width
    - 图像的像素宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 图像的像素高度。
    - Comfy dtype: INT
    - Python dtype: int
- ui
    - 以文本格式显示图像分辨率的用户界面元素。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CImageGetResolution:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.IMAGE.value
    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("width", "height",)
    OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, image, extra_pnginfo=None, unique_id=None):
        res = getResolutionByTensor(image)
        text = [f"{res['x']}x{res['y']}"]
        setWidgetValues(text, unique_id, extra_pnginfo)
        logger.debug(f"Resolution: {text}")
        return {"ui": {"text": text}, "result": (res["x"], res["y"])}

```
