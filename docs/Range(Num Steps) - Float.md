
# Documentation
- Class name: Range(Num Steps) - Float
- Category: List Stuff
- Output node: False

该节点根据指定的起始值、结束值和步数生成一个浮点数范围。它可以创建均匀分布的数字序列，用于各种应用，如生成采样点或定义间隔。

# Input types
## Required
- start
    - 指定范围的起始值。它设置浮点数序列开始的初始点。
    - Comfy dtype: FLOAT
    - Python dtype: List[Union[float, Decimal]]
- stop
    - 定义范围的结束值。它决定浮点数序列将延伸到的最终点。
    - Comfy dtype: FLOAT
    - Python dtype: List[Union[float, Decimal]]
- num_steps
    - 确定指定范围内的总步数或间隔数。这会影响序列中每个数字之间的间隔。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Output types
- range
    - 表示基于输入参数生成的范围的浮点数列表。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- range_sizes
    - 包含每个生成范围大小的列表，指示每个序列中有多少个数字。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatNumStepsRangeNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "start": (
                    "FLOAT",
                    {"default": 0, "min": -4096, "max": 4096, "step": 1},
                ),
                "stop": ("FLOAT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "num_steps": ("INT", {"default": 1, "min": 1, "max": 4096, "step": 1}),
            },
        }

    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("range", "range_sizes")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = "build_range"

    CATEGORY = "List Stuff"

    @staticmethod
    def _decimal_range(
        start: Decimal, stop: Decimal, num_steps: int
    ) -> Iterator[float]:
        step = (stop - start) / (num_steps - 1)
        direction = 1 if step > 0 else -1

        ret_val = start
        for _ in range(num_steps):
            if (
                ret_val - stop
            ) * direction > 0:  # Ensure we don't exceed the 'stop' value
                break
            yield float(ret_val)
            ret_val += step

    def build_range(
        self,
        start: List[Union[float, Decimal]],
        stop: List[Union[float, Decimal]],
        num_steps: List[int],
    ) -> Tuple[List[float], List[int]]:
        error_if_mismatched_list_args(locals())
        getcontext().prec = 12

        start = [Decimal(s) for s in start]
        stop = [Decimal(s) for s in stop]

        ranges = []
        range_sizes = []
        for e_start, e_stop, e_num_steps in zip_with_fill(start, stop, num_steps):
            vals = list(self._decimal_range(e_start, e_stop, e_num_steps))
            ranges.extend(vals)
            range_sizes.append(len(vals))

        return ranges, range_sizes

```
