# Documentation
- Class name: IntToFloat
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

IntToFloat节点旨在将整数值转换为其浮点数等价物。它在数值运算中扮演着关键角色，确保在需要准确结果的情况下进行计算时数据类型保持一致，从而保证了计算的精度。

# Input types
## Required
- a
    - 参数'a'表示要转换为浮点数的整数值。它对节点的操作至关重要，因为它决定了转换过程的起始点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 输出'result'是输入整数的浮点表示。它很重要，因为它提供了可以用于后续数值计算的转换后的值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class IntToFloat:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('INT', {'default': 0})}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: int) -> tuple[float]:
        return (float(a),)
```