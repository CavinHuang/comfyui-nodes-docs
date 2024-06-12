# Documentation
- Class name: ImpactLogicalOperators
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactLogicalOperators节点的'doit'方法旨在对两个布尔输入执行逻辑运算。它抽象地代表了逻辑推理的基本概念，其中节点处理输入以根据指定的运算符产生单个布尔输出。该节点在决策过程中起着关键作用，其中结果取决于两个条件之间的逻辑关系。

# Input types
## Required
- operator
    - ‘operator’参数决定了要执行的逻辑操作类型。它至关重要，因为它决定了节点将在两个布尔输入之间建立的逻辑关系，从而影响节点的执行和最终输出结果。
    - Comfy dtype: STRING
    - Python dtype: str
- bool_a
    - ‘bool_a’参数代表逻辑操作的第一个布尔输入。它的作用很重要，因为它构成了节点设计用来评估的逻辑比较或连接的一半。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- bool_b
    - ‘bool_b’参数是逻辑操作的第二个输入。它至关重要，因为它补充了第一个布尔输入‘bool_a’，以完成节点处理的逻辑表达式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- result
    - ‘result’参数是由节点执行的逻辑操作的布尔结果。它表示在评估两个输入布尔值之间的逻辑关系后得到的最终输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactLogicalOperators:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'operator': (['and', 'or', 'xor'],), 'bool_a': ('BOOLEAN', {'forceInput': True}), 'bool_b': ('BOOLEAN', {'forceInput': True})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = ('BOOLEAN',)

    def doit(self, operator, bool_a, bool_b):
        if operator == 'and':
            return (bool_a and bool_b,)
        elif operator == 'or':
            return (bool_a or bool_b,)
        else:
            return (bool_a != bool_b,)
```