---
tags:
- RandomGeneration
- Randomization
---

# Random Float
## Documentation
- Class name: `RandomFloat`
- Category: `Art Venture/Utils`
- Output node: `False`

The RandomFloat node generates a random floating-point number within a specified range. It abstracts the complexity of random number generation using PyTorch's capabilities to provide a simple interface for obtaining a random float, which can be used in various applications requiring stochastic behavior.
## Input types
### Required
- **`min`**
    - Specifies the minimum value in the range from which the random float will be generated. It sets the lower bound for the random number, ensuring that the output is not less than this value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max`**
    - Defines the maximum value in the range for the random float generation. It acts as the upper limit, guaranteeing that the generated number does not exceed this value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The generated random floating-point number.
    - Python dtype: `float`
- **`string`**
    - Comfy dtype: `STRING`
    - The string representation of the generated random floating-point number.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilRandomFloat:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "max": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }

    RETURN_TYPES = ("FLOAT", "STRING")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "random_float"

    @classmethod
    def IS_CHANGED(s, *args, **kwargs):
        return torch.rand(1).item()

    def random_float(self, min: float, max: float):
        num = torch.rand(1).item() * (max - min) + min
        return (num, str(num))

```
