
# Documentation
- Class name: Range(Step) - Int
- Category: List Stuff
- Output node: False

该节点用于在指定范围内生成整数序列，允许用户控制起始值、终止值和步长。它旨在基于可自定义的间隔和端点创建整数列表，支持包含和不包含终点的两种模式。

# Input types
## Required
- start
    - 指定范围的起始值。该参数设置整数序列的起点。
    - Comfy dtype: INT
    - Python dtype: List[int]
- stop
    - 确定范围的终止值。该参数定义整数序列的终点，可以根据end_mode设置为包含或不包含。
    - Comfy dtype: INT
    - Python dtype: List[int]
- step
    - 定义范围内每个数字之间的间隔。该参数控制序列生成的步长。
    - Comfy dtype: INT
    - Python dtype: List[int]
- end_mode
    - 表示终止值是包含还是不包含。该参数允许灵活定义整数序列的边界。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- range
    - 在指定范围内生成的整数序列。
    - Comfy dtype: INT
    - Python dtype: List[int]
- range_sizes
    - 每个生成的整数序列的大小，提供了每个范围内元素数量的信息。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntRangeNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "start": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "stop": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "step": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "end_mode": (["Inclusive", "Exclusive"], {"default": "Inclusive"}),
            },
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("range", "range_sizes")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = "build_range"

    CATEGORY = "List Stuff"

    def build_range(
        self, start: List[int], stop: List[int], step: List[int], end_mode: List[str]
    ) -> Tuple[List[int], List[int]]:
        error_if_mismatched_list_args(locals())

        ranges = []
        range_sizes = []
        for e_start, e_stop, e_step, e_end_mode in zip_with_fill(
            start, stop, step, end_mode
        ):
            if e_end_mode == "Inclusive":
                e_stop += 1
            vals = list(range(e_start, e_stop, e_step))
            ranges.extend(vals)
            range_sizes.append(len(vals))

        return ranges, range_sizes

```
