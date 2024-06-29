---
tags:
- ConditionalSelection
- ImageSwitching
---

# ⭆ Big Image Switch
## Documentation
- Class name: `Big Image Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

This node is designed to switch between different image inputs based on a selection criterion, allowing for dynamic image selection within a workflow.
## Input types
### Required
- **`select`**
    - Determines which image input to select based on the provided criterion, enabling dynamic image selection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`on_missing`**
    - Specifies the action to take when the selected image input is missing, ensuring robustness in image selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Callable`
### Optional
- **`input_i`**
    - Represents one of the multiple image inputs that can be selected. The index 'i' varies, indicating each distinct image input available for selection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
## Output types
- **`selected`**
    - Comfy dtype: `IMAGE`
    - The image that has been selected based on the provided criterion.
    - Python dtype: `Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBigImageSwitch:
    _switch_type = "IMAGE"
    NODE_NAME = "Big Image Switch"
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
