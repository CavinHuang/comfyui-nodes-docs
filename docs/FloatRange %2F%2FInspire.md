# Documentation
- Class name: FloatRange
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点在指定范围内生成一系列浮点数，根据用户定义的参数调整间隔，以便于进行各种数学和计算任务。

# Input types
## Required
- start
    - 序列的起始值。它设置了节点开始生成数字的初始点，这对于定义序列的下界至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- stop
    - 序列的结束值。它标记了范围的上限，决定了节点何时应停止生成数字。
    - Comfy dtype: FLOAT
    - Python dtype: float
- step
    - 序列中每个数字之间的增量。它决定了间距，并且对于控制范围内生成数字的密度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- limit
    - 生成的最大值数量。它限制了总输出，确保序列不会超过预定义的长度。
    - Comfy dtype: INT
    - Python dtype: int
- ensure_end
    - 一个标志，指示是否在序列中包括结束值。如果启用，它通过确保序列包括指定的停止值来影响最终输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- sequence
    - 在指定范围内生成的浮点数字列表，代表节点操作的输出。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]

# Usage tips
- Infra type: CPU

# Source code
```
class FloatRange:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'start': ('FLOAT', {'default': 0.0, 'min': -100.0, 'max': 100.0, 'step': 1e-09}), 'stop': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 1e-09}), 'step': ('FLOAT', {'default': 0.01, 'min': 0.0, 'max': 100.0, 'step': 1e-09}), 'limit': ('INT', {'default': 100, 'min': 2, 'max': 4096, 'step': 1}), 'ensure_end': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'})}}
    RETURN_TYPES = ('FLOAT',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

    def doit(self, start, stop, step, limit, ensure_end):
        if start >= stop or step == 0:
            return ([start],)
        res = []
        x = start
        last = x
        while x <= stop and limit > 0:
            res.append(x)
            last = x
            limit -= 1
            x += step
        if ensure_end and last != stop:
            if len(res) >= limit:
                res.pop()
            res.append(stop)
        return (res,)
```