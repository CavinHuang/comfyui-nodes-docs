# Documentation
- Class name: WLSH_SDXL_Steps
- Category: WLSH Nodes/number
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_SDXL_Steps节点的'set_steps'方法旨在为加权最小二乘问题配置步长参数。它在确定步骤的序列和间隔方面起着关键作用，这可以显著影响数值过程的结果。

# Input types
## Required
- precondition
    - “precondition”参数对于设置步序列之前的初始条件至关重要。它影响数值过程的起始点，对节点的整体执行至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- base
    - “base”参数定义了派生步序列的基本步长值。它是计算中的关键决定因素，直接影响步长模式的结构。
    - Comfy dtype: INT
    - Python dtype: int
- total
    - “total”参数指定序列中要采取的步数的总数。它是控制数值操作的范围及其计算负载的关键因素。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pre
    - “pre”输出反映了由“precondition”参数设置的初始条件，标志着步序列的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- base
    - “base”输出对应于输入的基本步长值，代表步序列计算的基础。
    - Comfy dtype: INT
    - Python dtype: int
- total
    - “total”输出指示程序将执行的总步数，由“total”参数确定。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_SDXL_Steps:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'precondition': ('INT', {'default': 3, 'min': 1, 'max': 10000}), 'base': ('INT', {'default': 12, 'min': 1, 'max': 10000}), 'total': ('INT', {'default': 20, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('INT', 'INT', 'INT')
    RETURN_NAMES = ('pre', 'base', 'total')
    FUNCTION = 'set_steps'
    CATEGORY = 'WLSH Nodes/number'

    def set_steps(self, precondition, base, total):
        return (precondition, base, total)
```