# Documentation
- Class name: RangeInt
- Category: EasyUse/Logic/Type
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

RangeInt类封装了根据用户定义的参数生成一系列整数的逻辑，便于为各种应用创建数值范围。

# Input types
## Required
- range_mode
    - range_mode参数决定了范围生成的方法，是通过固定的'step'大小还是指定的'num_steps'。这对于确定输出范围的结构和分布至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- start
    - start参数定义了范围的初始值。它至关重要，因为它设置了生成的整数序列的起点。
    - Comfy dtype: INT
    - Python dtype: int
- stop
    - stop参数指定了范围的上限。它与start参数共同作用，确定了整数序列的范围。
    - Comfy dtype: INT
    - Python dtype: int
- step
    - step参数设置了范围中每个元素之间的增量值。它显著影响生成序列的进程和间距。
    - Comfy dtype: INT
    - Python dtype: int
- num_steps
    - num_steps参数定义了范围内期望的步数。它对于确定输出序列的粒度很重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_mode
    - end_mode参数规定了范围中停止值是包含还是不包含。这影响了生成序列中是否包含上限。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- range
    - range输出是根据输入参数生成的整数列表，代表定义范围内的值序列。
    - Comfy dtype: LIST[INT]
    - Python dtype: List[int]
- range_sizes
    - range_sizes输出提供了每个单独生成的范围中整数的计数，提供了值分布的洞察。
    - Comfy dtype: LIST[INT]
    - Python dtype: List[int]

# Usage tips
- Infra type: CPU

# Source code
```
class RangeInt:

    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {'required': {'range_mode': (['step', 'num_steps'], {'default': 'step'}), 'start': ('INT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 1}), 'stop': ('INT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 1}), 'step': ('INT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 1}), 'num_steps': ('INT', {'default': 0, 'min': -4096, 'max': 4096, 'step': 1}), 'end_mode': (['Inclusive', 'Exclusive'], {'default': 'Inclusive'})}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('range', 'range_sizes')
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = 'build_range'
    CATEGORY = 'EasyUse/Logic/Type'

    def build_range(self, range_mode, start, stop, step, num_steps, end_mode) -> Tuple[List[int], List[int]]:
        error_if_mismatched_list_args(locals())
        ranges = []
        range_sizes = []
        for (range_mode, e_start, e_stop, e_num_steps, e_step, e_end_mode) in zip_with_fill(range_mode, start, stop, num_steps, step, end_mode):
            if range_mode == 'step':
                if e_end_mode == 'Inclusive':
                    e_stop += 1
                vals = list(range(e_start, e_stop, e_step))
                ranges.extend(vals)
                range_sizes.append(len(vals))
            elif range_mode == 'num_steps':
                direction = 1 if e_stop > e_start else -1
                if e_end_mode == 'Exclusive':
                    e_stop -= direction
                vals = np.rint(np.linspace(e_start, e_stop, e_num_steps)).astype(int).tolist()
                ranges.extend(vals)
                range_sizes.append(len(vals))
        return (ranges, range_sizes)
```