
# Documentation
- Class name: FloatRange __Inspire
- Category: InspirePack/Util
- Output node: False

FloatRange节点用于生成一系列浮点数，从指定的起始值开始，到另一个值结束，并按定义的步长递增。它旨在创建具有精确控制的自定义范围，包括确保最终值包含在序列中的选项。

# Input types
## Required
- start
    - 定义范围的起点。它设置序列开始的初始值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- stop
    - 指定范围的终点。根据'ensure_end'标志，序列会生成到这个值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- step
    - 决定序列中每个数字之间的增量，允许对范围的进程进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- limit
    - 限制生成序列中的元素数量，以防止过多输出。
    - Comfy dtype: INT
    - Python dtype: int
- ensure_end
    - 启用时，确保终止值包含在序列中，必要时会调整序列。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- float
    - Comfy dtype: FLOAT
    - 构成生成范围的浮点数列表。此输出是一个列表，符合'float'类型序列的预期。
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatRange:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "start": ("FLOAT", {"default": 0.0, "min": -100.0, "max": 100.0, 'step': 0.000000001}),
                        "stop": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, 'step': 0.000000001}),
                        "step": ("FLOAT", {"default": 0.01, "min": 0.0, "max": 100.0, 'step': 0.000000001}),
                        "limit": ("INT", {"default": 100, "min": 2, "max": 4096, "step": 1}),
                        "ensure_end": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                     }
                }

    RETURN_TYPES = ("FLOAT",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, start, stop, step, limit, ensure_end):
        if start >= stop or step == 0:
            return ([start], )

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

        return (res, )

```
