---
tags:
- ConditionalSelection
---

# ⭆ Big Int Switch
## Documentation
- Class name: `Big Int Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

The Big Int Switch node is designed to selectively output an integer value based on a specified selection criterion. It facilitates dynamic decision-making within data flows by allowing the selection of an integer from a predefined set based on input conditions.
## Input types
### Required
- **`select`**
    - Specifies the index of the integer to be selected. It plays a crucial role in determining which integer value is output by the node, based on the selection logic implemented.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`on_missing`**
    - Defines the behavior of the node when the selected integer is missing. This parameter ensures that the node can gracefully handle cases where the desired integer is not available, by specifying an alternative selection strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`input_i`**
    - Represents one of the potential integer values that can be selected. This parameter is part of a series (input_0 to input_9) that collectively define the set of integers from which the node can choose, based on the selection criteria.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`selected`**
    - Comfy dtype: `INT`
    - The integer value that has been selected based on the input criteria. This output reflects the decision made by the node in selecting one integer from the available options.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBigIntSwitch:
    _switch_type = "INT"
    NODE_NAME = "Big Int Switch"
    ICON = "⭆"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = (_switch_type,)
    RETURN_NAMES = ("selected",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return _generate_switch_input(cls._switch_type, _NOT_A_VALUE_I)

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(values)

    def pick(self, select, on_missing, **args):
        return _do_pick(self.__class__, select, lambda n: (n is not None) and (n != _NOT_A_VALUE_I), on_missing, **args)

```
