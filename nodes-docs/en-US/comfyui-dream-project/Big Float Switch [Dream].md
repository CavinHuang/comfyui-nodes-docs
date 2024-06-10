---
tags:
- ConditionalSelection
---

# ⭆ Big Float Switch
## Documentation
- Class name: `Big Float Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

The Big Float Switch node is designed to select a floating-point value from a set of inputs based on a specified condition. It facilitates dynamic decision-making in data flows by allowing the selection of values based on runtime conditions, enhancing flexibility and adaptability in processing numerical data.
## Input types
### Required
- **`select`**
    - Specifies the index of the input to be selected initially. The node will attempt to select this input, but may choose another based on the 'on_missing' strategy and the presence of valid data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`on_missing`**
    - Determines the node's behavior when the initially selected input does not meet the validation criteria. It can either move to the previous or next input until a valid one is found, ensuring a fallback mechanism is in place.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`input_i`**
    - Represents one of the multiple floating-point inputs that can be selected by the node. Each 'input_i' stands for a potential value to be chosen based on the selection criteria, where 'i' can range from 0 to n, indicating the flexibility in the number of inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`selected`**
    - Comfy dtype: `FLOAT`
    - The floating-point value selected by the node based on the specified conditions and inputs.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBigFloatSwitch:
    _switch_type = "FLOAT"
    NODE_NAME = "Big Float Switch"
    ICON = "⭆"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = (_switch_type,)
    RETURN_NAMES = ("selected",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return _generate_switch_input(cls._switch_type, _NOT_A_VALUE_F)

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(values)

    def pick(self, select, on_missing, **args):
        return _do_pick(self.__class__, select, lambda n: (n is not None) and (n != _NOT_A_VALUE_F), on_missing, **args)

```
