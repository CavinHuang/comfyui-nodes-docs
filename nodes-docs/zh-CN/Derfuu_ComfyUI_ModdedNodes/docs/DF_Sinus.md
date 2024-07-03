
# Documentation
- Class name: DF_Sinus
- Category: Derfuu_Nodes/Math/Trigonometry
- Output node: False

DF_Sinus节点用于计算给定角度的正弦值。该节点支持以弧度或角度为单位的输入，并提供计算反正弦的选项，为三角函数计算提供了灵活性。

# Input types
## Required
- value
    - 需要计算正弦值的角度。根据'type_'参数的设置，可以是弧度或角度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- type_
    - 指定输入角度的单位：'RAD'表示弧度，'DEG'表示角度。这影响了计算前如何解释输入值。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- arcSin
    - 布尔标志，当设为true时，将操作从正弦变为反正弦，允许进行反三角函数计算。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool

# Output types
- float
    - 正弦或反正弦计算的结果，具体取决于输入参数。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SinNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "value": Field.float(),
                "type_": Field.combo(["RAD", "DEG"]),
                "arcSin": Field.combo([False, True])
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_TRIGONOMETRY

    def get_value(self, value, type_="RAD", arcSin=False):
        if type_ == "DEG":
            value = math.radians(value)
        if arcSin == True:
            value = math.asin(value)
        else:
            value = math.sin(value)
        return (value,)

```
