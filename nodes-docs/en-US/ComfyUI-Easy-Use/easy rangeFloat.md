---
tags:
- NumberRangeGeneration
---

# Range(Float)
## Documentation
- Class name: `easy rangeFloat`
- Category: `EasyUse/Logic/Type`
- Output node: `False`

The `easy rangeFloat` node is designed to facilitate the manipulation and generation of floating-point numbers within a specified range. It abstracts the complexity of handling floating-point operations, providing a straightforward interface for generating, adjusting, and working with float values in a range defined by the user.
## Input types
### Required
- **`range_mode`**
    - Determines the mode of range calculation, either by specifying a step size or a total number of steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start`**
    - Specifies the starting value of the floating-point range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`stop`**
    - Defines the ending value of the floating-point range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`step`**
    - Sets the step size for the range when 'range_mode' is set to 'step'.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`num_steps`**
    - Specifies the total number of steps in the range when 'range_mode' is set to 'num_steps'.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_mode`**
    - Indicates whether the range should include ('Inclusive') or exclude ('Exclusive') the stop value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`range`**
    - Comfy dtype: `FLOAT`
    - The generated range of floating-point numbers based on the input parameters.
    - Python dtype: `List[float]`
- **`range_sizes`**
    - Comfy dtype: `INT`
    - The size of the generated range, indicating how many floating-point numbers are included.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RangeFloat:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "range_mode": (["step", "num_steps"], {"default": "step"}),
                "start": ("FLOAT", {"default": 0, "min": -4096, "max": 4096, "step": 0.1}),
                "stop": ("FLOAT", {"default": 0, "min": -4096, "max": 4096, "step": 0.1}),
                "step": ("FLOAT", {"default": 0, "min": -4096, "max": 4096, "step": 0.1}),
                "num_steps": ("INT", {"default": 0, "min": -4096, "max": 4096, "step": 1}),
                "end_mode": (["Inclusive", "Exclusive"], {"default": "Inclusive"}),
            },
        }

    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("range", "range_sizes")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = "build_range"

    CATEGORY = "EasyUse/Logic/Type"

    @staticmethod
    def _decimal_range(
           range_mode: String, start: Decimal, stop: Decimal, step: Decimal, num_steps: Int, inclusive: bool
    ) -> Iterator[float]:
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
                if (ret_val - stop) * direction > 0:  # Ensure we don't exceed the 'stop' value
                    break
                yield float(ret_val)
                ret_val += step

    def build_range(
            self,
            range_mode,
            start,
            stop,
            step,
            num_steps,
            end_mode,
    ) -> Tuple[List[float], List[int]]:
        error_if_mismatched_list_args(locals())
        getcontext().prec = 12

        start = [Decimal(s) for s in start]
        stop = [Decimal(s) for s in stop]
        step = [Decimal(s) for s in step]

        ranges = []
        range_sizes = []
        for range_mode, e_start, e_stop, e_step, e_num_steps, e_end_mode in zip_with_fill(
                range_mode, start, stop, step, num_steps, end_mode
        ):
            vals = list(
                self._decimal_range(range_mode, e_start, e_stop, e_step, e_num_steps, e_end_mode == 'Inclusive')
            )
            ranges.extend(vals)
            range_sizes.append(len(vals))

        return ranges, range_sizes

```
