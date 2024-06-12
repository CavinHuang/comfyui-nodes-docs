---
tags:
- ConditionalSelection
---

# ⭆ Big Text Switch
## Documentation
- Class name: `Big Text Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

The Big Text Switch node is designed to dynamically select one of several text inputs based on a specified condition. It facilitates conditional logic within a flow, allowing for the selection of text values based on runtime criteria.
## Input types
### Required
- **`select`**
    - Specifies the index of the text input to be selected. It plays a crucial role in determining which text input is chosen based on the condition provided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`on_missing`**
    - Defines the behavior when the selected text input does not meet the specified condition, allowing for a fallback mechanism to either the previous or next valid input.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`input_i`**
    - Represents one of the ten text inputs available for selection, where 'i' can range from 0 to 9. Each input can be individually set to a default value, ensuring a value is always available even if not explicitly provided. The index 'i' allows for dynamic selection among multiple inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`selected`**
    - Comfy dtype: `STRING`
    - The text value selected based on the specified condition and inputs. It represents the outcome of the conditional logic applied by the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBigTextSwitch:
    _switch_type = "STRING"
    NODE_NAME = "Big Text Switch"
    ICON = "⭆"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = (_switch_type,)
    RETURN_NAMES = ("selected",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return _generate_switch_input(cls._switch_type, _NOT_A_VALUE_S)

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(values)

    def pick(self, select, on_missing, **args):
        return _do_pick(self.__class__, select, lambda n: (n is not None) and (n != _NOT_A_VALUE_S), on_missing, **args)

```
