---
tags:
- Batch
- FloatData
---

# Batch Float (mtb)
## Documentation
- Class name: `Batch Float (mtb)`
- Category: `mtb/batch`
- Output node: `False`

This node is designed to generate a batch of float values with interpolation, offering flexibility in creating sequences of floats based on various easing functions. It supports different modes of generation, including single value replication or stepped interpolation, making it versatile for various numerical data manipulation needs.
## Input types
### Required
- **`mode`**
    - Specifies the mode of float generation, either as a single replicated value or a sequence of values interpolated in steps. This choice affects the pattern and distribution of the generated float values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`count`**
    - Determines the number of float values to generate, directly influencing the length of the output batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min`**
    - Sets the minimum value in the range of generated floats, serving as the starting point for interpolation or the value to replicate in 'Single' mode.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max`**
    - Defines the maximum value in the range for generated floats, acting as the endpoint for interpolation in 'Steps' mode.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`easing`**
    - Selects the easing function to apply during interpolation, affecting the transition between the min and max values. This parameter allows for the customization of the generated float sequence's progression.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`floats`**
    - Comfy dtype: `FLOATS`
    - The output is a list of float values generated according to the specified mode, count, min, max, and easing parameters. This list can be used for further numerical data processing or visualization.
    - Python dtype: `list[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchFloat:
    """Generates a batch of float values with interpolation"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mode": (
                    ["Single", "Steps"],
                    {"default": "Steps"},
                ),
                "count": ("INT", {"default": 1}),
                "min": ("FLOAT", {"default": 0.0, "step": 0.001}),
                "max": ("FLOAT", {"default": 1.0, "step": 0.001}),
                "easing": (
                    [
                        "Linear",
                        "Sine In",
                        "Sine Out",
                        "Sine In/Out",
                        "Quart In",
                        "Quart Out",
                        "Quart In/Out",
                        "Cubic In",
                        "Cubic Out",
                        "Cubic In/Out",
                        "Circ In",
                        "Circ Out",
                        "Circ In/Out",
                        "Back In",
                        "Back Out",
                        "Back In/Out",
                        "Elastic In",
                        "Elastic Out",
                        "Elastic In/Out",
                        "Bounce In",
                        "Bounce Out",
                        "Bounce In/Out",
                    ],
                    {"default": "Linear"},
                ),
            }
        }

    FUNCTION = "set_floats"
    RETURN_TYPES = ("FLOATS",)
    CATEGORY = "mtb/batch"

    def set_floats(self, mode, count, min, max, easing):
        keyframes = []
        if mode == "Single":
            keyframes = [min] * count
            return (keyframes,)

        for i in range(count):
            normalized_step = i / (count - 1)
            eased_step = apply_easing(normalized_step, easing)
            eased_value = min + (max - min) * eased_step
            keyframes.append(eased_value)

        return (keyframes,)

```
