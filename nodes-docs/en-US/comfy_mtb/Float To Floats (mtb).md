---
tags:
- DataConversion
- DataTypeConversion
- FloatData
- FloatList
- NumericConversion
---

# Float To Floats (mtb)
## Documentation
- Class name: `Float To Floats (mtb)`
- Category: `mtb/utils`
- Output node: `False`

Provides a conversion utility to transform a single float value into a list of floats, facilitating compatibility with other extensions that use a list format for float representation.
## Input types
### Required
- **`float`**
    - A single float value to be converted into a list of floats. This input is essential for ensuring compatibility with other extensions that expect float values in list format.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`floats`**
    - Comfy dtype: `FLOATS`
    - A list of floats derived from the single input float value, enabling compatibility with other extensions.
    - Python dtype: `list[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_FloatToFloats:
    """Conversion utility for compatibility with other extensions (AD, IPA, Fitz are using FLOAT to represent list of floats.)"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float": ("FLOAT", {"default": 0.0, "forceInput": True}),
            }
        }

    RETURN_TYPES = ("FLOATS",)
    RETURN_NAMES = ("floats",)
    CATEGORY = "mtb/utils"
    FUNCTION = "convert"

    def convert(self, float):
        return (float,)

```
