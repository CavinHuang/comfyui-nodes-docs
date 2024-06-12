---
tags:
- ImageFilter
- VisualEffects
---

# Image Analyze
## Documentation
- Class name: `Image Analyze`
- Category: `WAS Suite/Image/Analyze`
- Output node: `False`

This node is designed to analyze images by applying specific filters based on the selected mode, such as 'Black White Levels' or 'RGB Levels'. It converts images into a format suitable for analysis, applies the chosen filter, and returns the analyzed image.
## Input types
### Required
- **`image`**
    - The image to be analyzed. It is the primary input for the analysis process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Determines the type of analysis to be performed on the image, with options including 'Black White Levels' and 'RGB Levels'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The analyzed image after applying the selected filter.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Analyze:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mode": (["Black White Levels", "RGB Levels"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_analyze"

    CATEGORY = "WAS Suite/Image/Analyze"

    def image_analyze(self, image, mode='Black White Levels'):

        # Convert images to PIL
        image = tensor2pil(image)

        # WAS Filters
        WTools = WAS_Tools_Class()

        # Analye Image
        if mode:
            if mode == 'Black White Levels':
                image = WTools.black_white_levels(image)
            elif mode == 'RGB Levels':
                image = WTools.channel_frequency(image)
            else:
                image = image

        return (pil2tensor(image), )

```
