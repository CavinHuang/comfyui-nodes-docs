---
tags:
- ImageResolution
- ImageTransformation
---

# SDXL Recommended Resolution Calc (JPS)
## Documentation
- Class name: `SDXL Recommended Resolution Calc (JPS)`
- Category: `JPS Nodes/Math`
- Output node: `False`

This node calculates the recommended resolution for SDXL (Stable Diffusion XL) based on a target width and height, aiming to find the closest matching aspect ratio from a predefined set. It considers horizontal, vertical, and square aspect ratios to determine the most suitable resolution for generating images with the desired dimensions.
## Input types
### Required
- **`target_width`**
    - Specifies the desired width of the image. It plays a crucial role in determining the closest matching aspect ratio for the recommended resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - Specifies the desired height of the image. It is used alongside the target width to calculate the closest matching aspect ratio for the recommended resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`SDXL_width`**
    - Comfy dtype: `INT`
    - The recommended width for the SDXL image, based on the closest matching aspect ratio.
    - Python dtype: `int`
- **`SDXL_height`**
    - Comfy dtype: `INT`
    - The recommended height for the SDXL image, based on the closest matching aspect ratio.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Recommended_Resolution_Calc:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "target_width": ("INT", {
                    "default": 1024, 
                    "min": 0, 
                    "max": 8192, 
                    "step": 2 
                }),
                "target_height": ("INT", {
                    "default": 1024, 
                    "min": 0, 
                    "max": 8192, 
                    "step": 2 
                }),
            },
        }

    RETURN_TYPES = ("INT","INT",)
    RETURN_NAMES = ("SDXL_width","SDXL_height",)
    FUNCTION = "calcSDXLres"

    CATEGORY = "JPS Nodes/Math"

    def calcSDXLres(self, target_width, target_height):
        target_ratio = target_width / target_height
        
        closest_ratio = None
        closest_diff = float('inf')
        
        for ratio, (x_size, y_size, num_ratio) in accepted_ratios_horizontal.items():
            diff = abs(num_ratio - target_ratio)
            if diff < closest_diff:
                closest_ratio = ratio
                closest_diff = diff
        
        for ratio, (x_size, y_size, num_ratio) in accepted_ratios_vertical.items():
            diff = abs(num_ratio - target_ratio)
            if diff < closest_diff:
                closest_ratio = ratio
                closest_diff = diff
        
        # Compare with square aspect ratio
        x_size, y_size, num_ratio = accepted_ratios_square["1:1"]
        diff = abs(num_ratio - target_ratio)
        if diff < closest_diff:
            closest_ratio = "1:1"

        if closest_ratio in accepted_ratios_horizontal:
            SDXL_width, SDXL_height, _ = accepted_ratios_horizontal[closest_ratio]
        elif closest_ratio in accepted_ratios_vertical:
            SDXL_width, SDXL_height, _ = accepted_ratios_vertical[closest_ratio]
        else:
            SDXL_width, SDXL_height, _ = accepted_ratios_square[closest_ratio]
        
        return (SDXL_width, SDXL_height)

```
