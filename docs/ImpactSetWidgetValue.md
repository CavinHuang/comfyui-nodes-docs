# Documentation
- Class name: ImpactSetWidgetValue
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactSetWidgetValue节点的'doit'方法旨在处理将不同数据类型赋值给指定的控件。它通过确定数据类型，然后将相应的值应用到控件上，抽象地管理设置控件值的复杂性，从而简化了在ImpactPack套件内与控件交互的过程。

# Input types
## Required
- signal
    - ‘signal’参数对于节点的操作至关重要，因为它代表了触发控件值赋值过程的控制信号。节点要正确运行，其存在是必需的。
    - Comfy dtype: any_typ
    - Python dtype: Any
- node_id
    - ‘node_id’参数至关重要，因为它在系统中唯一标识节点，使得控件值赋值能够精确定位。它在确保控件被准确操作中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- widget_name
    - ‘widget_name’参数对于节点的功能至关重要，因为它指定了将被赋值的控件的名称。它是节点目的成功执行的关键信息。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- boolean_value
    - 当提供‘boolean_value’参数时，允许节点将布尔值赋给指定的控件，增强了节点操作的多功能性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- int_value
    - 当使用‘int_value’参数时，使节点能够为控件设置整数值，有助于节点处理各种数据类型的能力。
    - Comfy dtype: INT
    - Python dtype: int
- float_value
    - 如果提供‘float_value’参数，指示节点将浮点数赋给控件，展示了节点管理不同数值格式的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- string_value
    - 当提供‘string_value’参数时，使节点能够将字符串赋给控件，突出了节点在处理控件配置的字符串数据方面的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- signal_opt
    - ‘signal_opt’输出参数代表节点在控件值赋值后可能返回的可选控制信号，表示操作的完成。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactSetWidgetValue:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'signal': (any_typ,), 'node_id': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'widget_name': ('STRING', {'multiline': False})}, 'optional': {'boolean_value': ('BOOLEAN', {'forceInput': True}), 'int_value': ('INT', {'forceInput': True}), 'float_value': ('FLOAT', {'forceInput': True}), 'string_value': ('STRING', {'forceInput': True})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('signal_opt',)
    OUTPUT_NODE = True

    def doit(self, signal, node_id, widget_name, boolean_value=None, int_value=None, float_value=None, string_value=None):
        kind = None
        if boolean_value is not None:
            value = boolean_value
            kind = 'BOOLEAN'
        elif int_value is not None:
            value = int_value
            kind = 'INT'
        elif float_value is not None:
            value = float_value
            kind = 'FLOAT'
        elif string_value is not None:
            value = string_value
            kind = 'STRING'
        else:
            value = None
        if value is not None:
            PromptServer.instance.send_sync('impact-node-feedback', {'node_id': node_id, 'widget_name': widget_name, 'type': kind, 'value': value})
        return (signal,)
```