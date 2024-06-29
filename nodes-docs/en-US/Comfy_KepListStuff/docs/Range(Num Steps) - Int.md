---
tags:
- NumberRangeGeneration
---

# Range(Num Steps) - Int
## Documentation
- Class name: `Range(Num Steps) - Int`
- Category: `List Stuff`
- Output node: `False`

This node generates a range of integer values based on specified start and stop points, a number of steps, and an end mode. It allows for the creation of evenly or unevenly spaced sequences of integers, with options to include or exclude the stop point in the final range.
## Input types
### Required
- **`start`**
    - Defines the starting point of the range. It sets the initial value from which the range begins.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`stop`**
    - Sets the ending point of the range. This value can be included or excluded from the final range based on the end mode.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`num_steps`**
    - Specifies the number of steps (or values) to generate within the range. It determines how many integers will be included in the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`end_mode`**
    - Determines whether the stop point is included ('Inclusive') or excluded ('Exclusive') from the generated range.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`allow_uneven_steps`**
    - Indicates whether to allow steps that result in uneven spacing between the integers in the range.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`range`**
    - Comfy dtype: `INT`
    - The generated sequence of integers within the specified range.
    - Python dtype: `List[int]`
- **`range_sizes`**
    - Comfy dtype: `INT`
    - The size of each generated range, indicating how many integers are in each sequence.
    - Python dtype: `List[int]`
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
