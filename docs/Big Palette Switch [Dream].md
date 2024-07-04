
# Documentation
- Class name: `Big Palette Switch [Dream]`
- Category: `✨ Dream/🛠 utils/⭆ switches`
- Output node: `False`

Big Palette Switch [Dream]节点旨在根据输入条件动态选择不同的调色板。它通过允许选择最符合给定标准或上下文的调色板，实现了项目中色彩方案的灵活操作。

# Input types
## Required
- select
    - 指定要选择的调色板索引。该参数根据索引决定选择哪一个潜在的输入调色板，直接影响节点的输出。
    - Comfy dtype: INT
    - Python dtype: int
- on_missing
    - 定义当所选调色板缺失时节点的行为。它可以选择移动到上一个或下一个可用的调色板，确保即使某些输入不可用时，选择过程也能无缝进行。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- input_i
    - 代表可能被选择的潜在调色板输入之一。索引i的范围从0到9，允许输入多达十种不同的调色板，提供了广泛的选择范围。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID

# Output types
- selected
    - 基于输入条件选择的调色板。这个输出反映了在考虑'select'和'on_missing'参数后所选择的调色板。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID


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
