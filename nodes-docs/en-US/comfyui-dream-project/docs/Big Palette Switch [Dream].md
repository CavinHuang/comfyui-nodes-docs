---
tags:
- Color
---

# ⭆ Big Palette Switch
## Documentation
- Class name: `Big Palette Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

The Big Palette Switch [Dream] node is designed to dynamically select between different color palettes based on input conditions. It facilitates the flexible manipulation of color schemes within a project by allowing the selection of a palette that best fits the given criteria or context.
## Input types
### Required
- **`select`**
    - Specifies the index of the palette to select. This parameter determines which of the potentially multiple input palettes is chosen based on its index, influencing the node's output directly.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`on_missing`**
    - Defines the behavior of the node when the selected palette is missing. It can either move to the previous or next available palette, ensuring a seamless selection process even when some inputs are unavailable.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`input_i`**
    - Represents one of the potential palette inputs from which one is selected. The index i ranges from 0 to 9, allowing for up to ten different palettes to be inputted, offering a wide range of choices.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
## Output types
- **`selected`**
    - Comfy dtype: `RGB_PALETTE`
    - The palette that has been selected based on the input conditions. This output reflects the chosen palette after considering the 'select' and 'on_missing' parameters.
    - Python dtype: `RGBPalette.ID`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBigPaletteSwitch:
    _switch_type = RGBPalette.ID
    NODE_NAME = "Big Palette Switch"
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
        return _do_pick(self.__class__, select, lambda n: (n is not None), on_missing, **args)

```
