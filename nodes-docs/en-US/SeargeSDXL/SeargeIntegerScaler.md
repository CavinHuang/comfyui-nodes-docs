# Integer Scaler
## Documentation
- Class name: `SeargeIntegerScaler`
- Category: `Searge/_deprecated_/Integers`
- Output node: `False`

The SeargeIntegerScaler node is designed for scaling integer values by a specified factor and ensuring the result is a multiple of a given value. It abstracts the mathematical operation of scaling and rounding to meet specific numerical constraints, making it a utility for precise integer manipulation.
## Input types
### Required
- **`value`**
    - The base integer value to be scaled. It serves as the primary input for the scaling operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`factor`**
    - A floating-point factor by which the base value is scaled. This allows for proportional scaling of the integer value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`multiple_of`**
    - Specifies that the resulting scaled value should be a multiple of this integer. It ensures the result adheres to specific alignment or divisibility requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`value`**
    - Comfy dtype: `INT`
    - The scaled integer value, adjusted to be a multiple of the specified 'multiple_of' parameter.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeIntegerScaler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            "factor": ("FLOAT", {"default": 1.0, "step": 0.01}),
            "multiple_of": ("INT", {"default": 1, "min": 0, "max": 65536}),
        },
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("value",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Integers"

    def get_value(self, value, factor, multiple_of):
        return (int(value * factor // multiple_of) * multiple_of,)

```
