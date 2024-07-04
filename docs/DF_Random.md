
# Documentation
- Class name: DF_Random
- Category: Derfuu_Nodes/Functions
- Output node: False

DF_Random节点用于在指定范围内生成一个随机浮点数。它利用种子来产生可重复的随机性，从而确保在多次执行时能得到一致的结果。

# Input types
## Required
- Value_A
    - 指定随机数范围的下限。它影响随机数生成器可以产生的最小值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Value_B
    - 定义随机数范围的上限。它设置随机数生成器可以输出的最大值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 随机数生成器的种子值，用于确保结果的可重复性。它决定了生成的数字序列，允许在不同运行中保持一致的随机性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- float
    - 输出是一个在指定范围内的随机浮点数，由输入的边界和种子决定。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RandomValue:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value_A": Field.float(default=0),
                "Value_B": Field.float(default=1),
                "seed": Field.int(default=0, min=0, max=2**32-1),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_rand"

    CATEGORY = TREE_FUNCTIONS

    def get_rand(self, Value_A, Value_B, seed):
        random.seed(seed)
        value = random.uniform(Value_A, Value_B)
        return (value,)

```
