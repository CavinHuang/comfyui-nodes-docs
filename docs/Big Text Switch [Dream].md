
# Documentation
- Class name: Big Text Switch [Dream]
- Category: ✨ Dream/🛠 utils/⭆ switches
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Big Text Switch节点旨在基于指定条件动态选择多个文本输入中的一个。它在工作流中实现条件逻辑，允许根据运行时标准选择文本值。

# Input types
## Required
- select
    - 指定要选择的文本输入的索引。它在基于提供的条件确定选择哪个文本输入方面起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- on_missing
    - 定义当所选文本输入不满足指定条件时的行为，允许使用回退机制切换到上一个或下一个有效输入。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- input_i
    - 代表可供选择的十个文本输入之一，其中'i'可以从0到9不等。每个输入都可以单独设置默认值，确保即使未明确提供值也总是有可用的值。索引'i'允许在多个输入之间进行动态选择。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- selected
    - 根据指定条件和输入选择的文本值。它代表节点应用的条件逻辑的结果。
    - Comfy dtype: STRING
    - Python dtype: str


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
