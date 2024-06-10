---
tags:
- RandomGeneration
- Randomization
---

# Random Number
## Documentation
- Class name: `Random Number`
- Category: `WAS Suite/Number`
- Output node: `False`

This node generates random numbers based on specified parameters, including the type of number (integer, float, or boolean), and the range within which the number should fall. It allows for the generation of random numbers with a seed to ensure reproducibility.
## Input types
### Required
- **`number_type`**
    - Specifies the type of number to generate, which can be an integer, float, or boolean. This affects the method used for generating the random number.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`minimum`**
    - The minimum value in the range from which the random number will be generated.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`maximum`**
    - The maximum value in the range from which the random number will be generated.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - A seed value to ensure the reproducibility of the random number generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The generated random number.
    - Python dtype: `Union[int, float, bool]`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The generated random number represented as a float.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The generated random number rounded to the nearest integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Random_Number:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number_type": (["integer", "float", "bool"],),
                "minimum": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615}),
                "maximum": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("NUMBER", "FLOAT", "INT")
    FUNCTION = "return_randm_number"

    CATEGORY = "WAS Suite/Number"

    def return_randm_number(self, minimum, maximum, seed, number_type='integer'):

        # Set Generator Seed
        random.seed(seed)

        # Return random number
        if number_type:
            if number_type == 'integer':
                number = random.randint(minimum, maximum)
            elif number_type == 'float':
                number = random.uniform(minimum, maximum)
            elif number_type == 'bool':
                number = random.random()
            else:
                return

        # Return number
        return (number, float(number), round(number))

    @classmethod
    def IS_CHANGED(cls, seed, **kwargs):
        m = hashlib.sha256()
        m.update(seed)
        return m.digest().hex()

```
