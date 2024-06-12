---
tags:
- Batch
- FloatData
---

# Batch Float Fit (mtb)
## Documentation
- Class name: `Batch Float Fit (mtb)`
- Category: `mtb/batch`
- Output node: `False`

This node is designed to adjust the range of a batch of float values, optionally clamping them within a new target range and applying an easing function for smooth transitions. It can automatically compute the source range based on the input values or use a specified range, making it versatile for various data normalization and transformation tasks.
## Input types
### Required
- **`values`**
    - A list of float values to be transformed. The transformation adjusts these values from their original range to a new target range, potentially with clamping and easing for smooth transitions.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float]`
- **`clamp`**
    - A boolean indicating whether to clamp the transformed values to the target range, ensuring no values fall outside this range.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`auto_compute_source`**
    - A boolean that, when true, automatically computes the source range from the minimum and maximum of the input values, instead of using the provided source_min and source_max.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`source_min`**
    - The minimum value of the source range, used as the starting point for transformation if auto_compute_source is false.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`source_max`**
    - The maximum value of the source range, used as the ending point for transformation if auto_compute_source is false.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`target_min`**
    - The minimum value of the target range to which the input values are transformed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`target_max`**
    - The maximum value of the target range to which the input values are transformed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`easing`**
    - The name of the easing function to apply during the transformation, allowing for smooth transitions between ranges.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`floats`**
    - Comfy dtype: `FLOATS`
    - The list of transformed float values, adjusted to the new target range with optional clamping and easing applied.
    - Python dtype: `list[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchFloatFit:
    """Fit a list of floats using a source and target range"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "values": ("FLOATS", {"forceInput": True}),
                "clamp": ("BOOLEAN", {"default": False}),
                "auto_compute_source": ("BOOLEAN", {"default": False}),
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

    FUNCTION = "fit_range"
    RETURN_TYPES = ("FLOATS",)
    CATEGORY = "mtb/batch"
    DESCRIPTION = "Fit a list of floats using a source and target range"

    def fit_range(
        self,
        values: list[float],
        clamp: bool,
        auto_compute_source: bool,
        source_min: float,
        source_max: float,
        target_min: float,
        target_max: float,
        easing: str,
    ):
        if auto_compute_source:
            source_min = min(values)
            source_max = max(values)

        from .graph_utils import MTB_FitNumber

        res = []
        fit_number = MTB_FitNumber()
        for value in values:
            (transformed_value,) = fit_number.set_range(
                value,
                clamp,
                source_min,
                source_max,
                target_min,
                target_max,
                easing,
            )
            res.append(transformed_value)

        return (res,)

```
