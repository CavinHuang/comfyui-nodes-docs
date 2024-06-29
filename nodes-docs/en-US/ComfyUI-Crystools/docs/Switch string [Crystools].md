---
tags:
- ConditionalSelection
---

# 🪛 Switch string
## Documentation
- Class name: `Switch string [Crystools]`
- Category: `crystools 🪛/Switch`
- Output node: `False`

This node provides a mechanism to switch between two string values based on a boolean condition. It abstracts the conditional logic into a simple interface, allowing for cleaner and more readable code when dealing with binary decisions.
## Input types
### Required
- **`on_true`**
    - The string value to return if the boolean condition evaluates to True. It plays a crucial role in determining the output based on the condition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`on_false`**
    - The string value to return if the boolean condition evaluates to False. It serves as the alternative output, ensuring that a value is returned regardless of the condition's outcome.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`boolean`**
    - The boolean condition that determines which of the two string values ('on_true' or 'on_false') is returned. It is the pivotal factor in the node's execution.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is one of the two input strings, selected based on the evaluation of the boolean condition.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanString:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": STRING,
                "on_false": STRING,
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("String switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
