---
tags:
- BooleanLogic
- ConditionalSelection
---

# ImpactNeg
## Documentation
- Class name: `ImpactNeg`
- Category: `ImpactPack/Logic`
- Output node: `False`

The ImpactNeg node is designed to invert the truth value of a given boolean input. It serves as a logical NOT operation, transforming true to false and vice versa, thus enabling conditional logic flows within a node network.
## Input types
### Required
- **`value`**
    - The 'value' parameter represents the boolean input to be negated. Its inversion facilitates the execution of conditional logic based on the negated result.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The output is the negated boolean value of the input, enabling further conditional logic operations based on the result.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactNeg:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": { "value": ("BOOLEAN", {"forceInput": True}), },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = ("BOOLEAN", )

    def doit(self, value):
        return (not value, )

```
