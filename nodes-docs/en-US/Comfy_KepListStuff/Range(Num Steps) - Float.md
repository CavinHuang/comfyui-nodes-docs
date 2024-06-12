---
tags:
- NumberRangeGeneration
---

# Range(Num Steps) - Float
## Documentation
- Class name: `Range(Num Steps) - Float`
- Category: `List Stuff`
- Output node: `False`

This node generates a range of floating-point numbers based on specified start and stop values, and a number of steps. It allows for the creation of evenly spaced sequences of numbers, which can be used for various applications such as generating sample points or defining intervals.
## Input types
### Required
- **`start`**
    - Specifies the starting value of the range. It sets the initial point from which the sequence of floating-point numbers will begin.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[Union[float, Decimal]]`
- **`stop`**
    - Defines the ending value of the range. It determines the final point up to which the sequence of floating-point numbers will extend.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[Union[float, Decimal]]`
- **`num_steps`**
    - Determines the total number of steps or intervals within the specified range. This affects the spacing between each number in the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
## Output types
- **`range`**
    - Comfy dtype: `FLOAT`
    - A list of floating-point numbers representing the generated range based on the input parameters.
    - Python dtype: `List[float]`
- **`range_sizes`**
    - Comfy dtype: `INT`
    - A list containing the size of each generated range, indicating how many numbers are in each sequence.
    - Python dtype: `List[int]`
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
