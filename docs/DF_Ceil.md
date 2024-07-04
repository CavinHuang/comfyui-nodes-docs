
# Documentation
- Class name: DF_Ceil
- Category: Derfuu_Nodes/Functions/Converters
- Output node: False

DF_Ceil节点实现了数学上的向上取整函数。它会将给定的浮点数向上舍入到最接近的整数。

# Input types
## Required
- Value
    - 指定需要向上取整的浮点数。这个输入对于确定节点的输出结果至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- int
    - 表示输入浮点数向上取整后的整数结果。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CeilNode:
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
        total = int(math.ceil(Value))
        return (total,)

```
