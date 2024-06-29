---
tags:
- ConditionalSelection
---

# ⭆ Big Latent Switch
## Documentation
- Class name: `Big Latent Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

The Big Latent Switch node is designed to dynamically select between multiple latent inputs based on a specified condition. It facilitates the flexible manipulation of latent representations in a computational graph, allowing for the conditional routing of data through different processing paths.
## Input types
### Required
- **`select`**
    - Specifies the index of the latent input to be selected. This parameter determines which of the multiple latent inputs will be actively passed through the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`on_missing`**
    - Defines the behavior of the switch when the selected input is missing. It can either proceed to the next available input or revert to the previous one, ensuring continuous operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`input_i`**
    - Represents one of the multiple latent inputs that can be selected by the switch. The node can handle an arbitrary number of these inputs, dynamically choosing among them based on the 'select' parameter.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
## Output types
- **`selected`**
    - Comfy dtype: `LATENT`
    - The output of the Big Latent Switch node, which is the latent representation selected based on the specified condition.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBigLatentSwitch:
    _switch_type = "LATENT"
    NODE_NAME = "Big Latent Switch"
    ICON = "⭆"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = (_switch_type,)
    RETURN_NAMES = ("selected",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return _generate_switch_input(cls._switch_type)

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def pick(self, select, on_missing, **args):
        return _do_pick(self.__class__, select, lambda n: n is not None, on_missing, **args)

```
