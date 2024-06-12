---
tags:
- ImageResolution
- ImageTransformation
---

# NearestSDXLResolution
## Documentation
- Class name: `CM_NearestSDXLResolution`
- Category: `math/graphics`
- Output node: `False`

This node is designed to find the nearest supported SDXL resolution to the input image's resolution. It calculates the aspect ratio of the input image and compares it with a list of supported SDXL resolutions to select the closest match, ensuring optimal resizing without significant distortion.
## Input types
### Required
- **`image`**
    - The input image for which the nearest SDXL resolution is to be found. The image's aspect ratio is used to determine the closest supported resolution.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The width component of the nearest SDXL resolution.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height component of the nearest SDXL resolution.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ConstrainImage|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ConstrainImage|pysssss.md)
    - Reroute
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
class NearestSDXLResolution:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"image": ("IMAGE",)}}

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("width", "height")
    FUNCTION = "op"
    CATEGORY = "math/graphics"

    def op(self, image) -> tuple[int, int]:
        image_width = image.size()[2]
        image_height = image.size()[1]
        print(f"Input image resolution: {image_width}x{image_height}")
        image_ratio = image_width / image_height
        differences = [
            (abs(image_ratio - resolution[2]), resolution)
            for resolution in SDXL_SUPPORTED_RESOLUTIONS
        ]
        smallest = None
        for difference in differences:
            if smallest is None:
                smallest = difference
            else:
                if difference[0] < smallest[0]:
                    smallest = difference
        if smallest is not None:
            width = smallest[1][0]
            height = smallest[1][1]
        else:
            width = 1024
            height = 1024
        print(f"Selected SDXL resolution: {width}x{height}")
        return (width, height)

```
