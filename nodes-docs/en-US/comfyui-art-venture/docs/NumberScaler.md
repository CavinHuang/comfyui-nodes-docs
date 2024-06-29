# Number Scaler
## Documentation
- Class name: `NumberScaler`
- Category: `Art Venture/Utils`
- Output node: `False`

The NumberScaler node is designed to scale a numerical value within a specified range to a new range, effectively normalizing or denormalizing the value based on the provided minimum and maximum boundaries.
## Input types
### Required
- **`min`**
    - Specifies the minimum value of the original range. It sets the lower boundary for scaling the input value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max`**
    - Defines the maximum value of the original range. It sets the upper boundary for scaling the input value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_to_min`**
    - Determines the minimum value of the target scaling range. It influences the lower limit of the output scaled value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_to_max`**
    - Sets the maximum value of the target scaling range. It influences the upper limit of the output scaled value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`value`**
    - The numerical value to be scaled from its original range to the target range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The scaled numerical value, adjusted to fit within the new specified range.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilNumberScaler:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "max": ("FLOAT", {"default": 10.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "scale_to_min": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "scale_to_max": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "value": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "scale_number"

    def scale_number(self, min: float, max: float, scale_to_min: float, scale_to_max: float, value: float):
        num = (value - min) / (max - min) * (scale_to_max - scale_to_min) + scale_to_min
        return (num,)

```
