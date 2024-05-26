# Documentation
- Class name: WAS_Random_Number
- Category: WAS Suite/Number
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Random_Number 节点旨在根据指定的参数生成随机数。它提供了生成整数、浮点数或布尔值等不同类型的随机数的灵活性，并允许自定义生成的随机数的最小值和最大值。该节点通过使用种子来确保随机数生成过程的可重复性。

# Input types
## Required
- number_type
    - 参数 'number_type' 决定了要生成的随机数的类型。它可以设置为 'integer'、'float' 或 'bool'，每种都产生相应类型的随机值。此参数至关重要，因为它定义了输出的性质。
    - Comfy dtype: STRING
    - Python dtype: str
- minimum
    - 参数 'minimum' 设置了可以生成的随机数范围的下限。它对于定义随机数将出现的范围内至关重要，确保输出满足所需的约束条件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- maximum
    - 参数 'maximum' 确定了可以生成的随机数范围的上限。它与 'minimum' 参数协同工作，以确保生成的数字落在一个特定的区间内。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 参数 'seed' 用于初始化随机数生成器，确保产生的随机数序列是可重复的。它在维护节点输出在不同运行中的一致性和可靠性中起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- NUMBER
    - 输出 'NUMBER' 提供了作为整数、浮点数或布尔值生成的随机数，这取决于指定的 'number_type'。它是节点操作的主要结果，对下游处理非常重要。
    - Comfy dtype: INT
    - Python dtype: Union[int, float, bool]
- FLOAT
    - 输出 'FLOAT' 表示生成的随机数作为浮点值。当需要对数字进行进一步计算或分析时，十进制表示形式特别有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 输出 'INT' 提供了作为整数值生成的随机数。当某些应用需要整数数值或不需要浮点数的精度时，这非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Random_Number:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number_type': (['integer', 'float', 'bool'],), 'minimum': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'maximum': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    FUNCTION = 'return_randm_number'
    CATEGORY = 'WAS Suite/Number'

    def return_randm_number(self, minimum, maximum, seed, number_type='integer'):
        random.seed(seed)
        if number_type:
            if number_type == 'integer':
                number = random.randint(minimum, maximum)
            elif number_type == 'float':
                number = random.uniform(minimum, maximum)
            elif number_type == 'bool':
                number = random.random()
            else:
                return
        return (number, float(number), round(number))

    @classmethod
    def IS_CHANGED(cls, seed, **kwargs):
        m = hashlib.sha256()
        m.update(seed)
        return m.digest().hex()
```