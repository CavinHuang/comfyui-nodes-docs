# Float Pair
## Documentation
- Class name: `SeargeFloatPair`
- Category: `Searge/_deprecated_/Floats`
- Output node: `False`

The SeargeFloatPair node is designed to simply return a pair of float values as provided in its input. It serves as a basic utility within a larger system, allowing for the straightforward passing and manipulation of float values.
## Input types
### Required
- **`value1`**
    - Specifies the first float value to be returned. It is a fundamental input that directly determines the first element of the output pair.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`value2`**
    - Defines the second float value to be returned. This input is crucial as it sets the second element of the output pair, complementing the first value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`value 1`**
    - Comfy dtype: `FLOAT`
    - unknown
    - Python dtype: `unknown`
- **`value 2`**
    - Comfy dtype: `FLOAT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeFloatPair:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "value1": ("FLOAT", {"default": 0.0, "step": 0.01}),
            "value2": ("FLOAT", {"default": 0.0, "step": 0.01}),
        },
        }

    RETURN_TYPES = ("FLOAT", "FLOAT",)
    RETURN_NAMES = ("value 1", "value 2",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Floats"

    def get_value(self, value1, value2):
        return (value1, value2,)

```
