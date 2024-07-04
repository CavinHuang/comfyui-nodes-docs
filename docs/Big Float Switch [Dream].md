
# Documentation
- Class name: `Big Float Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

Big Float Switch节点旨在根据指定条件从一组输入中选择一个浮点值。它通过允许基于运行时条件选择值，增强了数值数据处理的灵活性和适应性，从而促进了数据流中的动态决策。

# Input types
## Required
- select
    - 指定初始选择的输入索引。节点将尝试选择该输入，但可能会根据'on_missing'策略和有效数据的存在而选择另一个。
    - Comfy dtype: INT
    - Python dtype: int
- on_missing
    - 决定当初始选择的输入不满足验证标准时节点的行为。它可以移动到上一个或下一个输入，直到找到有效的输入，确保备用机制到位。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- input_i
    - 代表可由节点选择的多个浮点输入之一。每个'input_i'代表基于选择标准可能被选中的潜在值，其中'i'可以从0到n不等，表示输入数量的灵活性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- selected
    - 节点根据指定条件和输入选择的浮点值。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
