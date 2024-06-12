---
tags:
- Batch
- FloatData
---

# Batch Float Fill (mtb)
## Documentation
- Class name: `Batch Float Fill (mtb)`
- Category: `mtb/batch`
- Output node: `False`

This node is designed to extend a batch of floating-point numbers to a specified length by filling it with a given value, either at the beginning or the end of the batch, depending on the specified direction.
## Input types
### Required
- **`floats`**
    - The list of floating-point numbers to be extended. It serves as the base batch that will be filled to reach the target length.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float]`
- **`direction`**
    - Specifies whether the filling should occur at the beginning ('head') or the end ('tail') of the batch, influencing the order in which the batch is extended.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`value`**
    - The floating-point number used to fill the batch, allowing customization of the fill value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`count`**
    - The target length for the batch after filling, determining how many times the fill value will be added.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`floats`**
    - Comfy dtype: `FLOATS`
    - The resulting batch of floating-point numbers after being filled to the target length.
    - Python dtype: `list[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchFloatFill:
    """Fills a batch float with a single value until it reaches the target length"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "floats": ("FLOATS",),
                "direction": (["head", "tail"], {"default": "tail"}),
                "value": ("FLOAT", {"default": 0.0}),
                "count": ("INT", {"default": 1}),
            }
        }

    FUNCTION = "fill_floats"
    RETURN_TYPES = ("FLOATS",)
    CATEGORY = "mtb/batch"

    def fill_floats(self, floats, direction, value, count):
        size = len(floats)
        if size > count:
            raise ValueError(
                f"Size ({size}) is less then target count ({count})"
            )

        rem = count - size
        if direction == "tail":
            floats = floats + [value] * rem
        else:
            floats = [value] * rem + floats
        return (floats,)

```
