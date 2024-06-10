---
tags:
- ConditionalSelection
---

# 🪛 Switch any
## Documentation
- Class name: `Switch any [Crystools]`
- Category: `crystools 🪛/Switch`
- Output node: `False`

This node provides a mechanism to switch between two values based on a boolean condition. It abstracts the conditional logic, allowing for a clean and straightforward way to choose between two possible outcomes.
## Input types
### Required
- **`on_true`**
    - The value to return if the boolean condition evaluates to true. It plays a crucial role in determining the node's output based on the condition.
    - Comfy dtype: `*`
    - Python dtype: `any`
- **`on_false`**
    - The value to return if the boolean condition evaluates to false. This parameter ensures that an alternative outcome is available, making the switch operation complete.
    - Comfy dtype: `*`
    - Python dtype: `any`
- **`boolean`**
    - The boolean condition that determines which of the two values ('on_true' or 'on_false') to return. It is the core of the switch functionality, enabling dynamic decision-making.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": (any, {}),
                "on_false": (any, {}),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = (any,)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Any switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
