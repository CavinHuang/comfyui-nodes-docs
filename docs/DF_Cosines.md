
# Documentation
- Class name: DF_Cosines
- Category: Derfuu_Nodes/Math/Trigonometry
- Output node: False

Cosines节点用于计算给定角度的余弦值，也可以选择计算反余弦。它支持度数和弧度两种角度单位，为灵活的三角函数计算提供了便利。

# Input types
## Required
- value
    - 需要计算余弦（或反余弦）的角度数值。这个值决定了三角函数运算中涉及的具体角度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- type_
    - 指定输入角度的单位：弧度（'RAD'）或度数（'DEG'）。这会影响三角函数计算时对角度的解释方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- arcCos
    - 布尔标志，当设置为True时，将操作从计算余弦更改为计算给定角度的反余弦。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool

# Output types
- float
    - 给定角度的余弦（或反余弦）计算结果。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CosNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "value": Field.float(),
                "type_": Field.combo(["RAD", "DEG"],),
                "arcCos": Field.combo([False, True],)
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_TRIGONOMETRY

    def get_value(self, value, type_="RAD", arcCos=False):
        if type_ == "DEG":
            value = math.radians(value)
        if arcCos == True:
            value = math.acos(value)
        else:
            value = math.cos(value)
        return (value,)

```
