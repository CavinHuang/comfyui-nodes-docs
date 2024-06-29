---
tags:
- RandomGeneration
- Randomization
---

# Random Int
## Documentation
- Class name: `RandomInt`
- Category: `Art Venture/Utils`
- Output node: `False`

The `RandomInt` node generates a random integer within a specified range. It abstracts the complexity of random number generation, providing a simple interface for obtaining integers for various applications, such as random sampling or stochastic processes.
## Input types
### Required
- **`min`**
    - Specifies the minimum value in the range from which the random integer will be generated. It sets the lower bound for the random number generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max`**
    - Defines the maximum value in the range for the random integer generation. It establishes the upper limit, ensuring the generated number does not exceed this value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The generated random integer within the specified range.
    - Python dtype: `int`
- **`string`**
    - Comfy dtype: `STRING`
    - A string representation of the generated random integer, facilitating its use in contexts requiring textual data.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilRandomInt:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "max": ("INT", {"default": 100, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }

    RETURN_TYPES = ("INT", "STRING")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "random_int"

    @classmethod
    def IS_CHANGED(s, *args, **kwargs):
        return torch.rand(1).item()

    def random_int(self, min: int, max: int):
        num = torch.randint(min, max, (1,)).item()
        return (num, str(num))

```
