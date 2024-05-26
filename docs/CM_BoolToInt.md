# Documentation
- Class name: BoolToInt
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

BoolToInt节点旨在将布尔值转换为其整数等价物。在需要布尔状态的数值表示的情况下，例如数学运算或数据处理工作流中，它发挥着关键作用。

# Input types
## Required
- a
    - 'a'参数是节点期待的布尔输入。它对于转换过程至关重要，因为节点的目的是将这个布尔值转换为整数。输入的布尔特性直接影响输出的整数值，'True'映射为1，'False'映射为0。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Output types
- op
    - 'op'输出提供了输入布尔值的整数转换。它很重要，因为它代表了节点操作的直接结果，概括了从布尔到整数的转换过程的本质。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class BoolToInt:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('BOOL', {'default': False})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: bool) -> tuple[int]:
        return (int(a),)
```