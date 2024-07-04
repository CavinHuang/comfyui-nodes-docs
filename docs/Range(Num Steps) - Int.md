
# Documentation
- Class name: Range(Num Steps) - Int
- Category: List Stuff
- Output node: False

该节点根据指定的起始点和终止点、步数以及结束模式生成一系列整数值。它允许创建均匀或不均匀间隔的整数序列，并可选择在最终范围中包含或排除终止点。

# Input types
## Required
- start
    - 定义范围的起始点。它设置范围开始的初始值。
    - Comfy dtype: INT
    - Python dtype: List[int]
- stop
    - 设置范围的结束点。根据结束模式，这个值可能包含在最终范围内，也可能被排除。
    - Comfy dtype: INT
    - Python dtype: List[int]
- num_steps
    - 指定在范围内生成的步数（或值的数量）。它决定了序列中将包含多少个整数。
    - Comfy dtype: INT
    - Python dtype: List[int]
- end_mode
    - 决定结束点是包含在（'Inclusive'）还是排除在（'Exclusive'）生成的范围之外。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- allow_uneven_steps
    - 指示是否允许在范围内的整数之间产生不均匀间隔的步长。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- range
    - 在指定范围内生成的整数序列。
    - Comfy dtype: INT
    - Python dtype: List[int]
- range_sizes
    - 每个生成范围的大小，表示每个序列中有多少个整数。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntNumStepsRangeNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "start": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "stop": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "num_steps": (
                    "INT",
                    {"default": 0, "min": -4096, "max": 4096, "step": 1},
                ),
                "end_mode": (["Inclusive", "Exclusive"], {"default": "Inclusive"}),
                "allow_uneven_steps": (["True", "False"], {"default": "False"}),
            }
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("range", "range_sizes")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = "build_range"

    CATEGORY = "List Stuff"

    def build_range(
        self,
        start: List[int],
        stop: List[int],
        num_steps: List[int],
        end_mode: List[str],
        allow_uneven_steps: List[str],
    ) -> Tuple[List[int], List[int]]:
        if len(allow_uneven_steps) > 1:
            raise Exception("List input for allow_uneven_steps is not supported.")

        error_if_mismatched_list_args(locals())

        ranges = []
        range_sizes = []
        for e_start, e_stop, e_num_steps, e_end_mode in zip_with_fill(
            start, stop, num_steps, end_mode
        ):
            direction = 1 if e_stop > e_start else -1
            if e_end_mode == "Exclusive":
                e_stop -= direction

            # Check for uneven steps
            step_size = (e_stop - e_start) / (e_num_steps - 1)
            if not allow_uneven_steps[0] == "True" and step_size != int(step_size):
                raise ValueError(
                    f"Uneven steps detected for start={e_start}, stop={e_stop}, num_steps={e_num_steps}."
                )

            vals = (
                np.rint(np.linspace(e_start, e_stop, e_num_steps)).astype(int).tolist()
            )
            ranges.extend(vals)
            range_sizes.append(len(vals))

        return ranges, range_sizes

```
