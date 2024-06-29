---
tags:
- ConditionalSelection
- ImpactPack
---

# ImpactMinMax
## Documentation
- Class name: `ImpactMinMax`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `False`

The ImpactMinMax node is designed to compare two input values and return either the maximum or minimum value based on a specified mode. This functionality is essential for operations requiring conditional selection between two values, such as optimizing performance or making decisions based on dynamic input.
## Input types
### Required
- **`mode`**
    - Determines whether the maximum or minimum of the two inputs will be returned. When true, the maximum value is selected; otherwise, the minimum value is chosen.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`a`**
    - One of the two values to be compared. This input, along with 'b', is essential for determining the output based on the selected mode.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`b`**
    - The second of the two values to be compared. This input is crucial for the comparison operation alongside 'a'.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The result of the comparison, either the maximum or minimum value between the two inputs, depending on the mode.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactMinMax:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "mode": ("BOOLEAN", {"default": True, "label_on": "max", "label_off": "min"}),
                    "a": (any_typ,),
                    "b": (any_typ,),
                    },
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"

    RETURN_TYPES = ("INT", )

    def doit(self, mode, a, b):
        if mode:
            return (max(a, b), )
        else:
            return (min(a, b),)

```
