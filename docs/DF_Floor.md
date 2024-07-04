
# Documentation
- Class name: DF_Floor
- Category: Derfuu_Nodes/Functions/Converters
- Output node: False

DF_Floor节点设计用于将输入的浮点数向下舍入到最接近的较小整数。这种操作通常被称为对数字进行"向下取整"。

# Input types
## Required
- Value
    - "Value"参数代表要向下舍入的浮点数。它对确定节点的输出至关重要，因为它直接影响向下取整操作。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- int
    - 输出是输入浮点数经过向下取整操作后得到的最接近的较小整数值。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloorNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(),
            }
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_CONVERTERS

    def get_value(self, Value):
        total = int(math.floor(Value))
        return (total,)

```
