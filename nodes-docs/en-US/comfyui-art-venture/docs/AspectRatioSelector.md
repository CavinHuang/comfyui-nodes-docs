---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# Aspect Ratio
## Documentation
- Class name: `AspectRatioSelector`
- Category: `Art Venture/Utils`
- Output node: `False`

The AspectRatioSelector node is designed to select and adjust the aspect ratio of images based on predefined options. It simplifies the process of resizing images to fit specific dimensions, ensuring that the output matches the desired aspect ratio.
## Input types
### Required
- **`aspect_ratio`**
    - Specifies the desired aspect ratio for the image, chosen from a predefined list of common ratios. This selection determines the dimensions to which the image will be resized, impacting the final appearance and layout of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ratio`**
    - Comfy dtype: `STRING`
    - Returns the selected aspect ratio as a string, indicating the proportion between width and height of the image.
    - Python dtype: `str`
- **`width`**
    - Comfy dtype: `INT`
    - The calculated width of the image after resizing to the selected aspect ratio.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The calculated height of the image after resizing to the selected aspect ratio.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilAspectRatioSelector(UtilSDXLAspectRatioSelector):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "aspect_ratio": (
                    [
                        "1:1",
                        "2:3",
                        "3:4",
                        "9:16",
                        "3:2",
                        "4:3",
                        "16:9",
                    ],
                ),
            }
        }

    def get_aspect_ratio(self, aspect_ratio):
        ratio, width, height = super().get_aspect_ratio(aspect_ratio)

        scale_ratio = 768 / max(width, height)

        width = int(scale_ratio * width / 8) * 8
        height = int(scale_ratio * height / 8) * 8

        return (ratio, width, height)

```
