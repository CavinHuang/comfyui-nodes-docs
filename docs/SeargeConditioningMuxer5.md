# Documentation
- Class name: SeargeConditioningMuxer5
- Category: Searge/_deprecated_/FlowControl
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为一个条件多路复用器，根据选择器的值来选择特定的调节输入。它有助于数据通过网络的路由，确保将适当的调节信号传递给后续操作。

# Input types
## Required
- input0
    - 第一个调节输入，是节点操作的关键组成部分。它代表输入选择器可以选中的潜在数据流之一。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- input1
    - 第二个调节输入，节点功能的另一个重要部分。当输入选择器设置为1时，它将是被选中的数据流。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- input2
    - 第三个调节输入，有助于节点根据选择器的值路由不同的数据流。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- input3
    - 第四个调节输入，是节点多样化选择机制的一部分。当输入选择器为3时，它将成为活动的输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- input4
    - 第五个调节输入，完成了节点的选择集。当输入选择器的值为4时，它将是被选中的输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- input_selector
    - 选择器参数决定哪个调节输入通过节点。它对于根据设定的值范围确定输出至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 节点的输出是基于输入选择器选出的调节输入。它代表了节点操作的结果，即下游过程的适当调节信号。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeConditioningMuxer5:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input0': ('CONDITIONING',), 'input1': ('CONDITIONING',), 'input2': ('CONDITIONING',), 'input3': ('CONDITIONING',), 'input4': ('CONDITIONING',), 'input_selector': ('INT', {'default': 0, 'min': 0, 'max': 4})}}
    RETURN_TYPES = ('CONDITIONING',)
    RETURN_NAMES = ('output',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/FlowControl'

    def mux(self, input0, input1, input2, input3, input4, input_selector):
        if input_selector == 1:
            return (input1,)
        elif input_selector == 2:
            return (input2,)
        elif input_selector == 3:
            return (input3,)
        elif input_selector == 4:
            return (input4,)
        else:
            return (input0,)
```