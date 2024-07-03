
# Documentation
- Class name: DF_Tangent
- Category: Derfuu_Nodes/Math/Trigonometry
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DF_Tangent节点用于计算给定值的正切或反正切。它提供了指定角度测量单位（度数或弧度）的选项。这一功能允许在数学和三角计算中对角度数据进行转换和分析。

# Input types
## Required
- value
    - 需要计算正切或反正切的数值。这个输入对于确定特定角度或其正切值至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- type_
    - 指定输入值的角度测量单位，可以是弧度（RAD）或度数（DEG），影响值的解释和处理方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- arcTan
    - 一个布尔标志，用于确定是计算输入值的反正切（True）还是正切（False），为三角计算提供了灵活性。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool

# Output types
- float
    - 输入值的计算结果，即正切或反正切值，以浮点数形式提供。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class tgNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "value": Field.float(),
                "type_": Field.combo(["RAD", "DEG"],),
                "arcTan": Field.combo([False, True],)
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_TRIGONOMETRY

    def get_value(self, value, type_="RAD", arcTan=False):
        if type_ == "DEG":
            value = math.radians(value)
        if arcTan == True:
            value = math.atan(value)
        else:
            value = math.tan(value)
        return (value,)

```
