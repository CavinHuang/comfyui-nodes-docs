---
tags:
- NumberRangeGeneration
---

# Range Float (Mikey)
## Documentation
- Class name: `Range Float`
- Category: `Mikey/Utils`
- Output node: `False`

The Range Float node generates a list of floating-point numbers within a specified range using a step value, then selects a specific number based on a seed value. This node is useful for creating sequences of numbers with precision and selecting an element from the sequence in a deterministic manner.
## Input types
### Required
- **`start`**
    - Defines the starting point of the range. It is crucial for determining the lower bound of the generated sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end`**
    - Specifies the ending point of the range. It sets the upper limit for the sequence of numbers to be generated.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`step`**
    - Determines the increment between each number in the range. This value affects the density and total count of numbers in the sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Used as a basis for selecting a specific number from the generated list. It ensures a deterministic selection process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The floating-point number selected from the generated sequence.
    - Python dtype: `float`
- **`string`**
    - Comfy dtype: `STRING`
    - The string representation of the selected floating-point number.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RangeFloat:
    # using the seed value as the step in a range
    # generate a list of numbers from start to end with a step value
    # then select the number at the offset value
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"start": ("FLOAT", {"default": 0, "min": 0, "step": 0.0001, "max": 0xffffffffffffffff}),
                             "end": ("FLOAT", {"default": 0, "min": 0, "step": 0.0001, "max": 0xffffffffffffffff}),
                             "step": ("FLOAT", {"default": 0, "min": 0, "step": 0.0001, "max": 0xffffffffffffffff}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})}}

    RETURN_TYPES = ('FLOAT','STRING',)
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Utils'

    def generate(self, start, end, step, seed):
        range_ = np.arange(start, end, step)
        list_of_numbers = list(range_)
        # offset
        offset = seed % len(list_of_numbers)
        return (list_of_numbers[offset], f'{list_of_numbers[offset]}',)

```
