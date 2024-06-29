---
tags:
- NumberRangeGeneration
---

# Range(Step) - Int
## Documentation
- Class name: `Range(Step) - Int`
- Category: `List Stuff`
- Output node: `False`

This node generates a sequence of integers within a specified range, allowing for control over the start, stop, and step values. It is designed to facilitate the creation of integer lists based on customizable intervals and endpoints, supporting both inclusive and exclusive end modes.
## Input types
### Required
- **`start`**
    - Specifies the starting value of the range. This parameter sets the initial point from which the integer sequence begins.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`stop`**
    - Determines the stopping value of the range. This parameter defines the endpoint for the integer sequence, which can be inclusive or exclusive based on the end_mode.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`step`**
    - Defines the interval between each number in the range. This parameter controls the step size for the sequence generation.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`end_mode`**
    - Indicates whether the stop value is inclusive or exclusive. This parameter allows for flexibility in defining the bounds of the integer sequence.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`range`**
    - Comfy dtype: `INT`
    - The generated sequence of integers within the specified range.
    - Python dtype: `List[int]`
- **`range_sizes`**
    - Comfy dtype: `INT`
    - The size of each generated integer sequence, providing insight into the number of elements within each range.
    - Python dtype: `List[int]`
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
