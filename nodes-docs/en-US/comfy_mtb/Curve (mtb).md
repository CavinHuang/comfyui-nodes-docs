---
tags:
- AnimationScheduling
- Curve
---

# Curve (mtb)
## Documentation
- Class name: `Curve (mtb)`
- Category: `mtb/curve`
- Output node: `False`

The Curve (mtb) node is designed to handle FLOAT_CURVE data, allowing for the manipulation and processing of curve data structures within a given workflow. It focuses on maintaining the integrity of the curve data while enabling transformations or analyses that may be required.
## Input types
### Required
- **`curve`**
    - The 'curve' parameter is essential for the node's operation as it represents the FLOAT_CURVE data to be processed. This parameter's manipulation directly influences the node's output, making it crucial for curve data handling.
    - Comfy dtype: `FLOAT_CURVE`
    - Python dtype: `dict`
## Output types
- **`float_curve`**
    - Comfy dtype: `FLOAT_CURVE`
    - Outputs the processed or unaltered FLOAT_CURVE data, depending on the node's implementation and the input provided.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_Curve:
    """A basic FLOAT_CURVE input node."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "curve": ("FLOAT_CURVE",),
            },
        }

    RETURN_TYPES = ("FLOAT_CURVE",)
    FUNCTION = "do_curve"

    CATEGORY = "mtb/curve"

    def do_curve(self, curve):
        return (curve,)

```
