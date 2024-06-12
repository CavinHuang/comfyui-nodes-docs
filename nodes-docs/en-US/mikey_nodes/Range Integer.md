---
tags:
- NumberRangeGeneration
---

# Range Integer (Mikey)
## Documentation
- Class name: `Range Integer`
- Category: `Mikey/Utils`
- Output node: `False`

The RangeInteger node is designed to generate a list of integers within a specified range, using a step value derived from a seed. It then selects an integer from this list based on an offset calculated from the seed, providing a way to deterministically select a number within a range.
## Input types
### Required
- **`start`**
    - Specifies the starting point of the range. It is crucial for defining the lower bound of the generated list of numbers.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end`**
    - Defines the end point of the range, setting the upper limit for the list of integers to be generated.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`step`**
    - Determines the interval between each number in the range. It is derived from the seed value, adding a layer of determinism to the selection process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - Used as a basis for calculating the step value and the offset for selecting the final number. It introduces a deterministic element to the number selection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The integer selected from the generated list based on the seed-derived offset.
    - Python dtype: `int`
- **`string`**
    - Comfy dtype: `STRING`
    - A string representation of the selected integer, providing a textual format of the output.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RangeInteger:
    # using the seed value as the step in a range
    # generate a list of numbers from start to end with a step value
    # then select the number at the offset value
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"start": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "end": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "step": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})}}

    RETURN_TYPES = ('INT','STRING',)
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Utils'

    def generate(self, start, end, step, seed):
        range_ = np.arange(start, end, step)
        list_of_numbers = list(range_)
        # offset
        offset = seed % len(list_of_numbers)
        return (list_of_numbers[offset], f'{list_of_numbers[offset]}',)

```
