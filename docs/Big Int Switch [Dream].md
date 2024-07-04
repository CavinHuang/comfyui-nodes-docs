
# Documentation
- Class name: Big Int Switch [Dream]
- Category: ✨ Dream/🛠 utils/⭆ switches
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Big Int Switch节点旨在基于指定的选择标准有选择地输出一个整数值。它通过允许根据输入条件从预定义集合中选择整数，从而促进数据流中的动态决策。

# Input types
## Required
- select
    - 指定要选择的整数的索引。它在基于实现的选择逻辑确定节点输出哪个整数值方面起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- on_missing
    - 定义当所选整数缺失时节点的行为。通过指定替代选择策略，该参数确保节点可以优雅地处理所需整数不可用的情况。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- input_i
    - 代表可以选择的潜在整数值之一。该参数是一个系列（input_0到input_9）的一部分，这些参数共同定义了节点可以根据选择标准进行选择的整数集合。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- selected
    - 根据输入标准选择的整数值。这个输出反映了节点在从可用选项中选择一个整数时做出的决定。
    - Comfy dtype: INT
    - Python dtype: int


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
