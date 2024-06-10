---
tags:
- Batch
- FloatData
---

# Batch Float Normalize (mtb)
## Documentation
- Class name: `Batch Float Normalize (mtb)`
- Category: `mtb/batch`
- Output node: `False`

This node normalizes a list of float values, adjusting them to a common scale without distorting differences in the range of values. It's designed to standardize the data, making it easier to compare and process.
## Input types
### Required
- **`floats`**
    - A list of float values to be normalized. This input is crucial for the normalization process, as it directly influences the output by scaling the input values to a range between 0 and 1.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float]`
## Output types
- **`normalized_floats`**
    - Comfy dtype: `FLOATS`
    - The output is a list of normalized float values, scaled to a range between 0 and 1, maintaining the proportional differences of the original list.
    - Python dtype: `list[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchFloatNormalize:
    """Normalize the values in the list of floats"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"floats": ("FLOATS",)},
        }

    RETURN_TYPES = ("FLOATS",)
    RETURN_NAMES = ("normalized_floats",)
    CATEGORY = "mtb/batch"
    FUNCTION = "execute"

    def execute(
        self,
        floats: list[float],
    ):
        min_value = min(floats)
        max_value = max(floats)

        normalized_floats = [
            (x - min_value) / (max_value - min_value) for x in floats
        ]
        log.debug(f"Floats: {floats}")
        log.debug(f"Normalized Floats: {normalized_floats}")

        return (normalized_floats,)

```
