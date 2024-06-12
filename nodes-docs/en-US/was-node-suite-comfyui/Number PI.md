---
tags:
- DataTypeConversion
- NumericConversion
---

# Number PI
## Documentation
- Class name: `Number PI`
- Category: `WAS Suite/Number`
- Output node: `False`

The Number PI node provides the mathematical constant pi, offering a straightforward way to access this fundamental value within numerical computations and simulations.
## Input types
### Required
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - Returns the mathematical constant pi as a floating-point number.
    - Python dtype: `float`
- **`float`**
    - Comfy dtype: `FLOAT`
    - Returns the mathematical constant pi, ensuring compatibility with operations requiring float data types.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_PI:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {}
        }

    RETURN_TYPES = ("NUMBER", "FLOAT")
    FUNCTION = "number_pi"

    CATEGORY = "WAS Suite/Number"

    def number_pi(self):
        return (math.pi, math.pi)

```
