---
tags:
- Conditioning
---

# Conditioning (Set Area)
## Documentation
- Class name: `ConditioningSetArea`
- Category: `conditioning`
- Output node: `False`

This node specializes in adjusting the conditioning of an image generation process by setting specific areas with defined dimensions and strength. It allows for precise control over the conditioning's spatial attributes, enabling targeted modifications to the generated image's characteristics within specified regions.
## Input types
### Required
- **`conditioning`**
    - The conditioning input represents the current state of the image generation process, which this node modifies by setting specific areas.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`width`**
    - Specifies the width of the area to be set, allowing for precise spatial control within the conditioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the height of the area to be set, contributing to the spatial specificity of the conditioning modification.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x`**
    - The x-coordinate of the top-left corner of the area to be set, positioning the modification within the conditioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y-coordinate of the top-left corner of the area to be set, positioning the modification within the conditioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`strength`**
    - Determines the intensity of the conditioning modification within the specified area, affecting the generated image's characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning, with specific areas set according to the provided dimensions and strength, ready for further processing in the image generation pipeline.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ConditioningCombine](../../Comfy/Nodes/ConditioningCombine.md)
    - SetNode



## Source code
```python
class ConditioningSetArea:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                              "width": ("INT", {"default": 64, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 64, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                              "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "append"

    CATEGORY = "conditioning"

    def append(self, conditioning, width, height, x, y, strength):
        c = node_helpers.conditioning_set_values(conditioning, {"area": (height // 8, width // 8, y // 8, x // 8),
                                                                "strength": strength,
                                                                "set_area_to_bounds": False})
        return (c, )

```
