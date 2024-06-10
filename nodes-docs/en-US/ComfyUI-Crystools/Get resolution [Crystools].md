---
tags:
- ImageResolution
- ImageTransformation
---

# 🪛 Get resolution
## Documentation
- Class name: `Get resolution [Crystools]`
- Category: `crystools 🪛/Image`
- Output node: `True`

This node is designed to determine the resolution of an image, providing a straightforward way to extract and utilize image dimensions within a workflow. It abstracts the complexity of handling image data structures, offering a simple interface to retrieve width and height information.
## Input types
### Required
- **`image`**
    - The image for which the resolution is to be determined. It plays a crucial role in the node's operation by serving as the primary data from which dimensions are extracted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The width of the image in pixels.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the image in pixels.
    - Python dtype: `int`
- **`ui`**
    - A user interface element displaying the image resolution in a textual format.
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
