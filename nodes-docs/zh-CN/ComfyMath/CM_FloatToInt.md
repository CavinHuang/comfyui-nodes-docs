# Documentation
- Class name: FloatToInt
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

FloatToInt节点旨在将浮点数转换为它们的整数等价物。在需要将精确的小数值转换为整数的情境中，它扮演着至关重要的角色，促进了需要整数输入的操作。

# Input types
## Required
- a
    - 'a'参数是要被节点转换为整数的浮点数。它对节点的操作至关重要，因为它直接影响输出，决定了转换过程的起始值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 'result'输出是输入浮点数的整数表示。它标志着转换过程的结果，提供了一个可以在随后的基于整数的计算中使用的整数。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class FloatToInt:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('FLOAT', {'default': 0.0})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: float) -> tuple[int]:
        return (int(a),)
```