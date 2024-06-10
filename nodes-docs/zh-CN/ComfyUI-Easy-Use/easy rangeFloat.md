# Documentation
- Class name: RangeFloat
- Category: EasyUse/Logic/Type
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点便于在指定范围内生成一系列浮点数，根据用户定义的模式和参数。它抽象了创建范围的过程，允许对起始值、终止值和步长值进行精确控制，以及步数和端点的包含性。

# Input types
## Required
- range_mode
    - 模式参数决定了生成范围序列所用的逻辑。它是必要的，因为它为节点设置了操作上下文，决定了范围是由固定的'步长'还是指定的'步数'生成。
    - Comfy dtype: COMBO[String]
    - Python dtype: str
- start
    - 起始参数定义了范围的初始值。它至关重要，因为它设定了生成范围序列的基线，影响整个输出。
    - Comfy dtype: FLOAT
    - Python dtype: decimal.Decimal
- stop
    - 终止参数标记了范围的终点。它很重要，因为它与起始值一起，定义了生成范围序列的边界。
    - Comfy dtype: FLOAT
    - Python dtype: decimal.Decimal
- step
    - 步长参数决定了范围序列中每个值之间的增量。它的值直接影响生成序列的粒度和模式。
    - Comfy dtype: FLOAT
    - Python dtype: decimal.Decimal
- end_mode
    - 结束模式参数决定终止值是否包含在范围序列中。这影响了终点的包含性，从而影响了输出的组成。
    - Comfy dtype: COMBO[String]
    - Python dtype: str
## Optional
- num_steps
    - 步数参数指定了范围序列中期望的步数。它很重要，因为它直接影响节点产生的值的数量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- range
    - 范围输出提供了生成的浮点数序列，这是节点操作的核心结果。它封装了范围生成过程的精髓。
    - Comfy dtype: LIST[FLOAT]
    - Python dtype: List[float]
- range_sizes
    - 范围大小输出提供了每个单独生成的范围序列中的值的数量，提供了对输出的分布和结构的洞察。
    - Comfy dtype: LIST(INT)
    - Python dtype: List[int]

# Usage tips
- Infra type: CPU

# Source code
```
class RangeFloat:

    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {'required': {'range_mode': (['step', 'num_steps'], {'default': 'step'}), 'start': ('FLOAT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 0.1}), 'stop': ('FLOAT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 0.1}), 'step': ('FLOAT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 0.1}), 'num_steps': ('INT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 1}), 'end_mode': (['Inclusive', 'Exclusive'], {'default': 'Inclusive'})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    RETURN_NAMES = ('range', 'range_sizes')
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = 'build_range'
    CATEGORY = 'EasyUse/Logic/Type'

    @staticmethod
    def _decimal_range(range_mode: String, start: Decimal, stop: Decimal, step: Decimal, num_steps: Int, inclusive: bool) -> Iterator[float]:
        if range_mode == 'step':
            ret_val = start
            if inclusive:
                stop = stop + step
            direction = 1 if step > 0 else -1
            while (ret_val - stop) * direction < 0:
                yield float(ret_val)
                ret_val += step
        elif range_mode == 'num_steps':
            step = (stop - start) / (num_steps - 1)
            direction = 1 if step > 0 else -1
            ret_val = start
            for _ in range(num_steps):
                if (ret_val - stop) * direction > 0:
                    break
                yield float(ret_val)
                ret_val += step

    def build_range(self, range_mode, start, stop, step, num_steps, end_mode) -> Tuple[List[float], List[int]]:
        error_if_mismatched_list_args(locals())
        getcontext().prec = 12
        start = [Decimal(s) for s in start]
        stop = [Decimal(s) for s in stop]
        step = [Decimal(s) for s in step]
        ranges = []
        range_sizes = []
        for (range_mode, e_start, e_stop, e_step, e_num_steps, e_end_mode) in zip_with_fill(range_mode, start, stop, step, num_steps, end_mode):
            vals = list(self._decimal_range(range_mode, e_start, e_stop, e_step, e_num_steps, e_end_mode == 'Inclusive'))
            ranges.extend(vals)
            range_sizes.append(len(vals))
        return (ranges, range_sizes)
```