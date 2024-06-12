---
tags:
- DataConversion
- DataTypeConversion
- Float
- FloatData
- NumericConversion
---

# ImpactFloat
## Documentation
- Class name: `ImpactFloat`
- Category: `ImpactPack/Logic`
- Output node: `False`

The ImpactFloat node is designed to process floating-point values, allowing for the manipulation and use of float data within a workflow. It serves as a fundamental building block in operations that require precise numerical computations.
## Input types
### Required
- **`value`**
    - Specifies the floating-point value to be processed. This parameter is central to the node's operation, as it determines the exact float value that will be manipulated or utilized.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Outputs the processed floating-point value. This is the result of any computations or manipulations performed on the input float value.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactFloat:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 1.0, "min": -3.402823466e+38, "max": 3.402823466e+38}),
            },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = ("FLOAT", )

    def doit(self, value):
        return (value, )

```
