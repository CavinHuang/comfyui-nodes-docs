---
tags:
- DataConversion
- DataTypeConversion
- Integer
- NumericConversion
---

# ImpactInt
## Documentation
- Class name: `ImpactInt`
- Category: `ImpactPack/Logic`
- Output node: `False`

The ImpactInt node is designed to process integer values within a specified range, allowing for the manipulation and validation of integer inputs in a workflow.
## Input types
### Required
- **`value`**
    - Specifies the integer value to be processed. This parameter allows for the validation and manipulation of the input value within the defined range.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Returns the processed integer value, ensuring it adheres to the specified constraints.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactSwitch](../../ComfyUI-Impact-Pack/Nodes/ImpactSwitch.md)



## Source code
```python
class ImpactInt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
            },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = ("INT", )

    def doit(self, value):
        return (value, )

```
