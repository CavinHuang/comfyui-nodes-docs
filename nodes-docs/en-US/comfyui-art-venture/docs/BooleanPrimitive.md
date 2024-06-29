---
tags:
- BooleanLogic
- ConditionalSelection
---

# Boolean
## Documentation
- Class name: `BooleanPrimitive`
- Category: `Art Venture/Utils`
- Output node: `False`

The BooleanPrimitive node is designed to manipulate boolean values, offering functionality to either pass through the input boolean value as is or reverse it. This node serves as a fundamental utility within the broader system, enabling conditional logic flows and binary decision-making processes.
## Input types
### Required
- **`value`**
    - Specifies the boolean value to be manipulated. This parameter is central to the node's operation, determining the base value that may be reversed based on the 'reverse' parameter.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`reverse`**
    - Determines whether the input boolean value should be reversed. When set to True, the output will be the logical negation of the input, enabling dynamic control over boolean logic flows.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The resulting boolean value after applying the 'reverse' logic to the input. This output reflects either the original or negated value, based on the 'reverse' parameter.
    - Python dtype: `bool`
- **`string`**
    - Comfy dtype: `STRING`
    - A string representation of the resulting boolean value, providing a textual output that mirrors the boolean outcome.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilBooleanPrimitive:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("BOOLEAN", {"default": False}),
                "reverse": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("BOOLEAN", "STRING")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "boolean_primitive"

    def boolean_primitive(self, value: bool, reverse: bool):
        if reverse:
            value = not value

        return (value, str(value))

```
