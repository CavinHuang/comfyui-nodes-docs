
# Documentation
- Class name: DF_Int_to_Float
- Category: Derfuu_Nodes/Functions/Converters
- Output node: False

DF_Int_to_Float节点旨在将整数值转换为浮点数，以便进行需要小数精度的运算。这种转换对于在需要更高精度的计算中使用整数输入非常重要。

# Input types
## Required
- Value
    - Value参数代表将被转换为浮点数的整数输入。这种转换对于启用整数本身无法适应的精确计算至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- float
    - 输出是输入整数的浮点表示，允许在后续操作中使用小数精度。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Int2Float:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.int(),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_CONVERTERS

    def get_value(self, Value):
        return (float(Value),)

```
