# Documentation
- Class name: ImpactValueReceiver
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactValueReceiver节点的'doit'方法旨在根据指定的类型处理和转换输入值。它在确保输入系统的数据格式正确方面发挥着关键作用，从而促进数据在ImpactPack框架内的无缝集成和运行。

# Input types
## Required
- typ
    - 参数'typ'指示'doit'方法将对输入'value'执行哪种类型的转换。它对节点的执行至关重要，因为它决定了输入数据的处理和转换方式。
    - Comfy dtype: STRING
    - Python dtype: str
- value
    - 参数'value'表示将由'doit'方法转换的数据。正确输入对于节点产生预期输出至关重要，因为它直接影响节点的操作和产生的结果。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- link_id
    - 参数'link_id'在系统中作为连接的可选标识符。它可以用于跟踪或引用特定的数据点，并有助于整体组织和管理节点的执行。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- converted_value
    - 输出参数'converted_value'代表'doit'方法转换过程的结果。它非常重要，因为它反映了节点根据指定类型准确转换输入数据的能力，确保了输出的完整性和可用性。
    - Comfy dtype: COMBO[STRING, INT, FLOAT, BOOLEAN]
    - Python dtype: Union[str, int, float, bool]

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactValueReceiver:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'typ': (['STRING', 'INT', 'FLOAT', 'BOOLEAN'],), 'value': ('STRING', {'default': ''}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = (any_typ,)

    def doit(self, typ, value, link_id=0):
        if typ == 'INT':
            return (int(value),)
        elif typ == 'FLOAT':
            return (float(value),)
        elif typ == 'BOOLEAN':
            return (value.lower() == 'true',)
        else:
            return (value,)
```