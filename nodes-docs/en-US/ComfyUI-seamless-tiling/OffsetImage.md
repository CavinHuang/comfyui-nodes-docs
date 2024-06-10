---
tags:
- Image
- ImageTransformation
---

# Offset Image
## Documentation
- Class name: `OffsetImage`
- Category: `image`
- Output node: `False`

The OffsetImage node is designed to shift an image by a specified percentage of its width and height, effectively creating a seamless tiling effect. This operation is useful for generating patterns or textures that can be tiled without visible seams.
## Input types
### Required
- **`pixels`**
    - The input image to be offset. This parameter is crucial for determining the base image that will undergo the offset operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`x_percent`**
    - The percentage of the image's width by which the image should be horizontally shifted. This parameter allows for horizontal adjustment of the image's position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_percent`**
    - The percentage of the image's height by which the image should be vertically shifted. This parameter allows for vertical adjustment of the image's position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the modified image after being offset both horizontally and vertically according to the specified percentages.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OffsetImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pixels": ("IMAGE",),
                "x_percent": (
                    "FLOAT",
                    {"default": 50.0, "min": 0.0, "max": 100.0, "step": 1},
                ),
                "y_percent": (
                    "FLOAT",
                    {"default": 50.0, "min": 0.0, "max": 100.0, "step": 1},
                ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "run"
    CATEGORY = "image"

    def run(self, pixels, x_percent, y_percent):
        n, y, x, c = pixels.size()
        y = round(y * y_percent / 100)
        x = round(x * x_percent / 100)
        return (pixels.roll((y, x), (1, 2)),)

```
