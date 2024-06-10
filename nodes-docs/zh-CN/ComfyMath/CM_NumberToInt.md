# Documentation
- Class name: NumberToInt
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

NumberToInt节点旨在将数值输入转换为整数形式。在不需要浮点数的精度且更倾向于整数的简单性和效率的场景中，它发挥着关键作用。

# Input types
## Required
- a
    - 'a'参数是节点将转换为整数的数值输入。它对节点的操作至关重要，因为它决定了转换过程的起点。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]

# Output types
- op
    - 'op'输出提供了输入参数'a'的整数转换。它很重要，因为它代表了可以用于进一步处理的最终转换值。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class NumberToInt:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('NUMBER', {'default': 0.0})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: number) -> tuple[int]:
        return (int(a),)
```