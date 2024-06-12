# Documentation
- Class name: WAS_Seed
- Category: WAS Suite/Number
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Seed 节点旨在生成和操作数值种子，这些种子对于初始化随机数生成器或确保随机过程中的可重复性至关重要。它在数值操作中提供了基础性的作用，其中种子值对于控制随机性是必不可少的。

# Input types
## Required
- seed
    - ‘seed’参数对于节点的操作至关重要，因为它决定了生成一系列数字的起始点。它确保了随机数生成过程的可预测性和可重复性，这在模拟和概率模型中非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - ‘seed’输出代表了提供给节点的原始数值种子，它是依赖于随机数生成的后续操作的基本组成部分。
    - Comfy dtype: INT
    - Python dtype: int
- number
    - ‘number’输出是种子的小数点表示形式，它可以用于需要非整数值的计算中，扩大了节点在各种数学情境中的应用性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- float
    - ‘float’输出是将种子值转换为浮点数，这对于需要小数精度的操作至关重要，例如科学计算和统计分析。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int
    - ‘int’输出提供了种子值的整数形式，适用于仅接受整数输入的操作，确保与广泛的数值算法和应用兼容。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Seed:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('SEED', 'NUMBER', 'FLOAT', 'INT')
    RETURN_NAMES = ('seed', 'number', 'float', 'int')
    FUNCTION = 'seed'
    CATEGORY = 'WAS Suite/Number'

    def seed(self, seed):
        return ({'seed': seed}, seed, float(seed), int(seed))
```