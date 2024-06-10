# Documentation
- Class name: WAS_Number_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `number_input_switch` 旨在根据布尔条件处理数值输入。它巧妙地展示了节点执行条件逻辑操作的能力，为处理数值数据提供了一种多功能的方法。节点的功能集中在其决策能力上，允许以可控和可预测的方式操作数字。

# Input types
## Required
- number_a
    - 参数 `number_a` 对节点的操作至关重要，因为它代表了节点将处理的第一个数值输入。它的作用很重要，因为它决定了节点决策过程的初始数据集。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
- number_b
    - 参数 `number_b` 作为节点的另一种数值输入。它的重要性在于提供一组不同的数值，当布尔条件不满足时，节点可以使用这些数值。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
## Optional
- boolean
    - 参数 `boolean` 作为一个开关，决定了节点的行为。它对于确定将由节点处理的数值输入集至关重要，从而影响节点的输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- output
    - 方法 `number_input_switch` 的输出是一个包含原始数字、其浮点表示和整数形式的元组。这种全面的输出提供了对处理过的数值数据的多方面视图，满足各种下游需求。
    - Comfy dtype: COMBO[NUMBER, FLOAT, INT]
    - Python dtype: Tuple[Union[int, float], float, int]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number_a': ('NUMBER',), 'number_b': ('NUMBER',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    FUNCTION = 'number_input_switch'
    CATEGORY = 'WAS Suite/Logic'

    def number_input_switch(self, number_a, number_b, boolean=True):
        if boolean:
            return (number_a, float(number_a), int(number_a))
        else:
            return (number_b, float(number_b), int(number_b))
```