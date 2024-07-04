
# Documentation
- Class name: Big Image Switch [Dream]
- Category: ✨ Dream/🛠 utils/⭆ switches
- Output node: False

此节点旨在根据选择标准在不同的图像输入之间进行切换，实现工作流程中的动态图像选择功能。

# Input types
## Required
- select
    - 根据提供的标准决定选择哪个图像输入，从而实现动态图像选择。
    - Comfy dtype: INT
    - Python dtype: int
- on_missing
    - 指定在所选图像输入缺失时要采取的操作，确保图像选择的稳健性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Callable

## Optional
- input_i
    - 代表可被选择的多个图像输入之一。索引'i'是变量，表示每个可供选择的不同图像输入。
    - Comfy dtype: IMAGE
    - Python dtype: Image

# Output types
- selected
    - 基于提供的标准所选择的图像。
    - Comfy dtype: IMAGE
    - Python dtype: Image


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
