# Documentation
- Class name: SeargeConditioningMuxer2
- Category: Searge/_deprecated_/FlowControl
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为一个条件多路复用器，根据选择器的值来选择两个条件输入中的一个。它的设计是为了在数据流中路由适当的输入到输出，使得数据处理能够有条件地进行。

# Input types
## Required
- input0
    - 第一个条件输入，将由节点考虑进行选择。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- input1
    - 第二个条件输入，是第一个输入的替代选项。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- input_selector
    - 选择器参数，决定哪个条件输入将被路由到输出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 基于input_selector值所选择的条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeConditioningMuxer2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input0': ('CONDITIONING',), 'input1': ('CONDITIONING',), 'input_selector': ('INT', {'default': 0, 'min': 0, 'max': 1})}}
    RETURN_TYPES = ('CONDITIONING',)
    RETURN_NAMES = ('output',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/FlowControl'

    def mux(self, input0, input1, input_selector):
        if input_selector == 1:
            return (input1,)
        else:
            return (input0,)
```