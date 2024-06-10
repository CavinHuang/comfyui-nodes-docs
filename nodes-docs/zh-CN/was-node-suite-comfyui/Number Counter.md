# Documentation
- Class name: WAS_Number_Counter
- Category: WAS Suite/Number
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Number_Counter节点旨在根据指定的操作模式管理和操作数值。它有效地处理递增、递减和边界控制的计数操作。此节点特别适用于需要序列生成或迭代数值调整的应用程序。

# Input types
## Required
- number_type
    - ‘number_type’参数确定节点将处理的数值类型，可以是整数或浮点数。这个选择影响精度以及可以执行的算术操作类型。
    - Comfy dtype: STRING
    - Python dtype: str
- mode
    - ‘mode’参数指示节点将如何修改计数器值。它可以设置为递增、递减、递增到停止值或递减到停止值，这对于控制计数行为至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- start
    - ‘start’参数设定计数器的初始值。这是一个基本设置，为节点执行的所有计数操作设定起始点。
    - Comfy dtype: FLOAT
    - Python dtype: Union[int, float]
- stop
    - ‘stop’参数定义计数操作的边界值。当达到此值时，将根据所选模式停止递增或递减计数。
    - Comfy dtype: FLOAT
    - Python dtype: Union[int, float]
- step
    - ‘step’参数指定每次操作期间应用于计数器的增量或减量值。它直接影响数值序列的变化速率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unique_id
    - ‘unique_id’参数是节点管理的每个计数器的唯一标识符。它确保每个计数操作被独立跟踪和操作。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
## Optional
- reset_bool
    - ‘reset_bool’参数允许在设置为大于或等于1的值时将计数器重置为其初始值。它提供了一种重新开始计数操作的方法。
    - Comfy dtype: NUMBER
    - Python dtype: Optional[Union[int, bool]]

# Output types
- number
    - ‘number’输出提供了操作后计数器当前值的整数表示。当需要整数精度时特别有用。
    - Comfy dtype: INT
    - Python dtype: int
- float
    - ‘float’输出提供计数器当前值的浮点表示。适用于需要小数精度的场景。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int
    - ‘int’输出返回计数器的整数值，类似于‘number’输出，确保结果以整数类型呈现。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_Counter:

    def __init__(self):
        self.counters = {}

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number_type': (['integer', 'float'],), 'mode': (['increment', 'decrement', 'increment_to_stop', 'decrement_to_stop'],), 'start': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 0.01}), 'stop': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 0.01}), 'step': ('FLOAT', {'default': 1, 'min': 0, 'max': 99999, 'step': 0.01})}, 'optional': {'reset_bool': ('NUMBER',)}, 'hidden': {'unique_id': 'UNIQUE_ID'}}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    RETURN_NAMES = ('number', 'float', 'int')
    FUNCTION = 'increment_number'
    CATEGORY = 'WAS Suite/Number'

    def increment_number(self, number_type, mode, start, stop, step, unique_id, reset_bool=0):
        counter = int(start) if mode == 'integer' else start
        if self.counters.__contains__(unique_id):
            counter = self.counters[unique_id]
        if round(reset_bool) >= 1:
            counter = start
        if mode == 'increment':
            counter += step
        elif mode == 'deccrement':
            counter -= step
        elif mode == 'increment_to_stop':
            counter = counter + step if counter < stop else counter
        elif mode == 'decrement_to_stop':
            counter = counter - step if counter > stop else counter
        self.counters[unique_id] = counter
        result = int(counter) if number_type == 'integer' else float(counter)
        return (result, float(counter), int(counter))
```