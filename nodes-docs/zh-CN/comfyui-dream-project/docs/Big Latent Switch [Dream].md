
# Documentation
- Class name: Big Latent Switch [Dream]
- Category: ✨ Dream/🛠 utils/⭆ switches
- Output node: False

Big Latent Switch节点旨在根据指定条件动态选择多个潜在输入之间的一个。它能够灵活操控计算图中的潜在表示，实现数据在不同处理路径间的条件性路由。

# Input types
## Required
- select
    - 指定要选择的潜在输入的索引。此参数决定了多个潜在输入中哪一个将被主动传递通过节点。
    - Comfy dtype: INT
    - Python dtype: int
- on_missing
    - 定义当所选输入缺失时开关的行为。它可以选择继续处理下一个可用输入或回退到前一个输入，以确保操作的连续性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- input_i
    - 代表可被开关选择的多个潜在输入之一。该节点可以处理任意数量的这些输入，根据'select'参数动态地在它们之间进行选择。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Output types
- selected
    - Big Latent Switch节点的输出，即基于指定条件选择的潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: dict


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
