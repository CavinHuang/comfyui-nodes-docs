---
tags:
- BooleanLogic
- ConditionalSelection
---

# ⬖ Boolean To Int
## Documentation
- Class name: `Boolean To Int [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

The 'Boolean To Int' node converts a boolean input into an integer output, allowing for conditional logic to be applied in numerical contexts. It provides a straightforward way to translate true/false conditions into numerical representations for further processing or decision-making.
## Input types
### Required
- **`boolean`**
    - Determines the condition for the conversion. If true, the 'on_true' value is returned; otherwise, the 'on_false' value is selected.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`on_true`**
    - The integer value to return when the 'boolean' input is true. This allows for customization of the true condition's numerical representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`on_false`**
    - The integer value to return when the 'boolean' input is false. This enables the false condition to be represented by a specific numerical value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`result`**
    - Comfy dtype: `INT`
    - The result of the boolean to integer conversion, reflecting either the 'on_true' or 'on_false' value based on the boolean input.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBoolToInt:
    NODE_NAME = "Boolean To Int"
    ICON = "⬖"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("result",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False}),
                "on_true": ("INT", {"default": 1}),
                "on_false": ("INT", {"default": 0})
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
