# Documentation
- Class name: FloatToNumber
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

FloatToNumber节点旨在将浮点数值转换为更通用的数字表示形式。它在数据类型转换中扮演着关键角色，确保了数学或计算工作流程的不同部分之间的兼容性。

# Input types
## Required
- a
    - 'a'参数是一个浮点数，该节点旨在进行转换。它对节点的操作至关重要，因为它决定了需要转换的输入数据类型。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 'result'输出是由输入浮点值转换得到的数字。它标志着从特定数据类型成功转换为更通用的数字形式。
    - Comfy dtype: NUMBER
    - Python dtype: number

# Usage tips
- Infra type: CPU

# Source code
```
class FloatToNumber:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('FLOAT', {'default': 0.0})}}
    RETURN_TYPES = ('NUMBER',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: float) -> tuple[number]:
        return (a,)
```