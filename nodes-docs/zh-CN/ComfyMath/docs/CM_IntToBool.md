# Documentation
- Class name: IntToBool
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

IntToBool节点旨在将整数值转换为布尔表示。在数值的存在与否至关重要的情况下，它作为一个基本的实用工具，从数值数据中抽象出真值概念。此节点在数据类型转换中扮演着关键角色，确保数值输入在布尔上下文中得到适当的解释。

# Input types
## Required
- a
    - 参数'a'是节点将处理的输入整数。它对节点的操作至关重要，因为它根据值是否非零来确定布尔输出。此参数直接影响节点的执行和生成的布尔值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- op
    - 'op'输出是一个布尔值，表示输入整数的真值。它之所以重要，是因为它在布尔上下文中提供了对数值输入的清晰和直接的解释，这通常在系统的进一步处理或决策中是必需的。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class IntToBool:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('INT', {'default': 0})}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: int) -> tuple[bool]:
        return (a != 0,)
```