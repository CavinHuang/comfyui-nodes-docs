# Fit Number (mtb)
## Documentation
- Class name: `Fit Number (mtb)`
- Category: `mtb/math`
- Output node: `False`

The Fit Number node is designed to adjust numerical values to fit within a specified range, optionally applying an easing function to smooth the transition between values. It can automatically compute the source range based on input values if required, making it versatile for dynamic data scaling scenarios.
## Input types
### Required
- **`value`**
    - The numerical value to be adjusted. This parameter is the primary data that the node operates on, transforming the value to fit within the target range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clamp`**
    - A boolean indicating whether to clamp the transformed value to the target range, preventing the value from exceeding the specified minimum and maximum.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`source_min`**
    - The minimum value of the source range. This is used as the lower bound when scaling the input value, unless auto-compute is enabled.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`source_max`**
    - The maximum value of the source range. This sets the upper bound for scaling the input value, overridden if auto-compute is active.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`target_min`**
    - The minimum value of the target range to which the input value is scaled.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`target_max`**
    - The maximum value of the target range to which the input value is adjusted.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`easing`**
    - A string specifying the easing function to apply during the scaling process, affecting how the value transitions across the range.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The input value adjusted to fit within the specified target range, potentially smoothed by an easing function.
    - Python dtype: `list[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_FitNumber:
    """Fit the input float using a source and target range"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0, "forceInput": True}),
                "clamp": ("BOOLEAN", {"default": False}),
                "source_min": ("FLOAT", {"default": 0.0, "step": 0.01}),
                "source_max": ("FLOAT", {"default": 1.0, "step": 0.01}),
                "target_min": ("FLOAT", {"default": 0.0, "step": 0.01}),
                "target_max": ("FLOAT", {"default": 1.0, "step": 0.01}),
                "easing": (
                    EASINGS,
                    {"default": "Linear"},
                ),
            }
        }

    FUNCTION = "set_range"
    RETURN_TYPES = ("FLOAT",)
    CATEGORY = "mtb/math"
    DESCRIPTION = "Fit the input float using a source and target range"

    def set_range(
        self,
        value: float,
        clamp: bool,
        source_min: float,
        source_max: float,
        target_min: float,
        target_max: float,
        easing: str,
    ):
        if source_min == source_max:
            normalized_value = 0
        else:
            normalized_value = (value - source_min) / (source_max - source_min)
        if clamp:
            normalized_value = max(min(normalized_value, 1), 0)

        eased_value = apply_easing(normalized_value, easing)

        # - Convert the eased value to the target range
        res = target_min + (target_max - target_min) * eased_value

        return (res,)

```
