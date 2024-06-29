---
tags:
- BooleanLogic
- ConditionalSelection
---

# ⬖ Boolean To Float
## Documentation
- Class name: `Boolean To Float [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

Converts a boolean input to a float output, allowing for custom float values to be assigned to true and false boolean states. This node facilitates conditional logic and value transformation in data flows, enabling dynamic adjustments based on boolean conditions.
## Input types
### Required
- **`boolean`**
    - Determines the branch of execution: if true, the 'on_true' value is returned; if false, the 'on_false' value is selected. This boolean input thus directly influences the node's output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`on_true`**
    - Specifies the float value to return when the boolean input is true, enabling customization of the output for true conditions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`on_false`**
    - Defines the float value to return when the boolean input is false, allowing for tailored responses to false conditions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`result`**
    - Comfy dtype: `FLOAT`
    - The float value corresponding to the input boolean condition, determined by the 'on_true' or 'on_false' parameters.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBoolToFloat:
    NODE_NAME = "Boolean To Float"
    ICON = "⬖"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("result",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False}),
                "on_true": ("FLOAT", {"default": 1.0}),
                "on_false": ("FLOAT", {"default": 0.0})
            }
        }

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(values)

    def pick(self, boolean, on_true, on_false):
        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
