---
tags:
- DataConversion
- DataTypeConversion
- FloatData
- FloatList
- NumericConversion
---

# Floats To Float (mtb)
## Documentation
- Class name: `Floats To Float (mtb)`
- Category: `mtb/utils`
- Output node: `False`

Provides a conversion utility to transform a list of floats into a single float value, facilitating compatibility with other extensions that use a single float to represent multiple values.
## Input types
### Required
- **`floats`**
    - The list of floats to be converted into a single float value. This input is crucial for the conversion process, determining the output of the node.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float]`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The single float value resulting from the conversion of the input list of floats.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_FloatsToFloat:
    """Conversion utility for compatibility with other extensions (AD, IPA, Fitz are using FLOAT to represent list of floats.)"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "floats": ("FLOATS",),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("float",)
    CATEGORY = "mtb/utils"
    FUNCTION = "convert"

    def convert(self, floats):
        return (floats,)

```
