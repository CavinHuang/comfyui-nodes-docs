# Documentation
- Class name: IntToNumber
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

该节点将整数输入转换为适合进一步处理的数字格式，强调在计算工作流中数据类型转换的重要性。

# Input types
## Required
- a
    - 参数'a'是一个关键的输入，它为节点提供整数值。正确输入对于节点准确执行转换和影响最终结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 该节点的输出是输入整数的数字表示形式，对于需要数值数据的后续操作至关重要。
    - Comfy dtype: NUMBER
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class IntToNumber:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('INT', {'default': 0})}}
    RETURN_TYPES = ('NUMBER',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: int) -> tuple[number]:
        return (a,)
```