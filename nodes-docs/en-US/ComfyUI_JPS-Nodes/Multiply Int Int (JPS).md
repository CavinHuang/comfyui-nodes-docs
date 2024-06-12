---
tags:
- MathematicalFunctions
- Multiplication
---

# Multiply Int Int (JPS)
## Documentation
- Class name: `Multiply Int Int (JPS)`
- Category: `JPS Nodes/Math`
- Output node: `False`

Performs multiplication of two integer inputs and provides the result in both integer and floating-point formats.
## Input types
### Required
- **`int_a`**
    - Represents the first integer input for multiplication. Its value influences the multiplication result directly.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`int_b`**
    - Represents the second integer input for multiplication. Its value influences the multiplication result directly.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int_multiply`**
    - Comfy dtype: `INT`
    - The result of multiplying the two integer inputs, returned as an integer.
    - Python dtype: `int`
- **`float_multiply`**
    - Comfy dtype: `FLOAT`
    - The result of multiplying the two integer inputs, returned as a floating-point number.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Multiply_INT_INT:

    def init(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int_a": ("INT", {"default": 1,}),
                "int_b": ("INT", {"default": 1,}),
            }
        }

    RETURN_TYPES = ("INT","FLOAT")
    RETURN_NAMES = ("int_multiply","float_multiply")
    FUNCTION = "get_multiply_int_int"

    CATEGORY="JPS Nodes/Math"

    def get_multiply_int_int(self,int_a,int_b):
        int_multiply = int(int_a) * int(int_b)
        float_multiply = int(int_a) * int(int_b)

        return(int(int_multiply),float(float_multiply))

```
