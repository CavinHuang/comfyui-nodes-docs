---
tags:
- Conditioning
---

# Conditioning (Set Area with Percentage)
## Documentation
- Class name: `ConditioningSetAreaPercentage`
- Category: `conditioning`
- Output node: `False`

This node specializes in adjusting the conditioning of generative models by setting a specific area of interest in terms of percentage values for width, height, and position (x, y), along with a strength parameter to modulate the effect. It allows for fine-tuning the focus and intensity of the conditioning within a given area, enhancing the model's ability to generate or modify content with precision.
## Input types
### Required
- **`conditioning`**
    - The conditioning input represents the current state of conditioning to be modified. It is crucial for determining the context and area of focus for the generative model's output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`width`**
    - Specifies the width of the area of interest as a percentage of the total width, allowing for precise control over the horizontal span of the conditioning effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`height`**
    - Defines the height of the area of interest as a percentage of the total height, enabling precise vertical focus within the conditioning effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x`**
    - Determines the horizontal starting point of the area of interest as a percentage of the total width, setting the left boundary of the conditioning effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y`**
    - Sets the vertical starting point of the area of interest as a percentage of the total height, establishing the top boundary of the conditioning effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength`**
    - Controls the intensity of the conditioning effect within the specified area, allowing for modulation from subtle to strong influences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning output, reflecting the adjustments made to the area of interest and strength parameters.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetAreaPercentage:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                              "width": ("FLOAT", {"default": 1.0, "min": 0, "max": 1.0, "step": 0.01}),
                              "height": ("FLOAT", {"default": 1.0, "min": 0, "max": 1.0, "step": 0.01}),
                              "x": ("FLOAT", {"default": 0, "min": 0, "max": 1.0, "step": 0.01}),
                              "y": ("FLOAT", {"default": 0, "min": 0, "max": 1.0, "step": 0.01}),
                              "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "append"

    CATEGORY = "conditioning"

    def append(self, conditioning, width, height, x, y, strength):
        c = node_helpers.conditioning_set_values(conditioning, {"area": ("percentage", height, width, y, x),
                                                                "strength": strength,
                                                                "set_area_to_bounds": False})
        return (c, )

```
