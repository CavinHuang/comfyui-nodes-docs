# Documentation
- Class name: NumberToFloat
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

NumberToFloat节点旨在将输入数字转换为浮点格式。它在确保不同数据类型之间的数值计算保持精度和一致性中发挥着关键作用。

# Input types
## Required
- a
    - 'a'参数是节点打算转换为浮点值的输入数字。它对节点的操作至关重要，因为它直接影响输出的数值表示。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float, str]

# Output types
- result
    - 'result'输出是从输入派生的转换后的浮点数。它很重要，因为它代表了节点的主要输出和转换过程的最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class NumberToFloat:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('NUMBER', {'default': 0.0})}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: number) -> tuple[float]:
        return (float(a),)
```