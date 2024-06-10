---
tags:
- NumberRangeGeneration
---

# Range(Int)
## Documentation
- Class name: `easy rangeInt`
- Category: `EasyUse/Logic/Type`
- Output node: `False`

The 'build_range' node offers a versatile mechanism for generating a sequence of numbers, which can be either integers or floats, based on a comprehensive set of parameters including start, stop, step, and the number of steps. It supports different modes of operation and end conditions, making it highly adaptable for creating custom numerical ranges for a variety of applications.
## Input types
### Required
- **`range_mode`**
    - Determines the mode of range generation, either by specifying a step size or a fixed number of steps, which influences how the sequence is constructed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`start`**
    - Specifies the starting value of the range, setting the initial point for the sequence generation.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`stop`**
    - Defines the ending value of the range, determining where the sequence will stop.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`step`**
    - Indicates the increment between consecutive values in the range when 'range_mode' is set to 'step', allowing for control over the spacing of the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`num_steps`**
    - Specifies the total number of steps in the range when 'range_mode' is set to 'num_steps', controlling the length of the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_mode`**
    - Determines whether the ending value ('stop') is included in or excluded from the generated range, affecting the final sequence.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`range`**
    - Comfy dtype: `INT`
    - The generated sequence of numbers based on the input parameters, which can be tailored to include either a specific number of steps or a specific step size.
    - Python dtype: `List[float]`
- **`range_sizes`**
    - Comfy dtype: `INT`
    - The size of the generated range, providing information on the total number of elements within the sequence.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RangeInt:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "range_mode": (["step", "num_steps"], {"default": "step"}),
                "start": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "stop": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "step": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "num_steps": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "end_mode": (["Inclusive", "Exclusive"], {"default": "Inclusive"}),
            },
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("range", "range_sizes")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = "build_range"

    CATEGORY = "EasyUse/Logic/Type"

    def build_range(
        self,  range_mode, start, stop, step,  num_steps, end_mode
    ) -> Tuple[List[int], List[int]]:
        error_if_mismatched_list_args(locals())

        ranges = []
        range_sizes = []
        for range_mode, e_start, e_stop, e_num_steps, e_step, e_end_mode in zip_with_fill(
            range_mode, start, stop, num_steps, step, end_mode
        ):
            if range_mode == 'step':
                if e_end_mode == "Inclusive":
                    e_stop += 1
                vals = list(range(e_start, e_stop, e_step))
                ranges.extend(vals)
                range_sizes.append(len(vals))
            elif range_mode == 'num_steps':
                direction = 1 if e_stop > e_start else -1
                if e_end_mode == "Exclusive":
                    e_stop -= direction
                vals = (np.rint(np.linspace(e_start, e_stop, e_num_steps)).astype(int).tolist())
                ranges.extend(vals)
                range_sizes.append(len(vals))
        return ranges, range_sizes

```
