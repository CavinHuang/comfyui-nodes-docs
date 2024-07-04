
# Documentation
- Class name: Range(Step) - Float
- Category: List Stuff
- Output node: False

该节点用于生成指定范围内的浮点数序列,可精确控制起始值、结束值和步长。它专为需要以特定增量遍历浮点数范围的操作而设计,非常适用于需要在数值之间保持均匀间隔的场景。

# Input types
## Required
- start
    - 指定范围的起始值。它设定生成数字序列的下限。
    - Comfy dtype: FLOAT
    - Python dtype: List[Union[float, Decimal]]
- stop
    - 定义范围的结束值。它设定生成数字序列的上限。
    - Comfy dtype: FLOAT
    - Python dtype: List[Union[float, Decimal]]
- step
    - 决定范围内每个数字之间的增量。这个值控制生成序列中连续数字之间的间隔。
    - Comfy dtype: FLOAT
    - Python dtype: List[Union[float, Decimal]]
- end_mode
    - 指示结束值是否包含在范围内。这个参数影响序列中的最后一个数字是否达到或排除结束值。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- range
    - 在指定范围内生成的浮点数序列。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- range_sizes
    - 每个生成范围的大小,表示每个序列中的元素数量。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatRangeNode:
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
                "step": ("FLOAT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "end_mode": (["Inclusive", "Exclusive"], {"default": "Inclusive"}),
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
        start: Decimal, stop: Decimal, step: Decimal, inclusive: bool
    ) -> Iterator[float]:
        ret_val = start
        if inclusive:
            stop = stop + step

        direction = 1 if step > 0 else -1
        # while ret_val < stop:
        #     yield float(ret_val)
        #     ret_val += step
        while (ret_val - stop) * direction < 0:
            yield float(ret_val)
            ret_val += step

    def build_range(
        self,
        start: List[Union[float, Decimal]],
        stop: List[Union[float, Decimal]],
        step: List[Union[float, Decimal]],
        end_mode: List[str],
    ) -> Tuple[List[float], List[int]]:
        error_if_mismatched_list_args(locals())
        getcontext().prec = 12

        start = [Decimal(s) for s in start]
        stop = [Decimal(s) for s in stop]
        step = [Decimal(s) for s in step]

        ranges = []
        range_sizes = []
        for e_start, e_stop, e_step, e_end_mode in zip_with_fill(
            start, stop, step, end_mode
        ):
            vals = list(
                self._decimal_range(e_start, e_stop, e_step, e_end_mode == "Inclusive")
            )
            ranges.extend(vals)
            range_sizes.append(len(vals))

        return ranges, range_sizes

```
