---
tags:
- MathematicalFunctions
- Multiplication
---

# Multiply Int Float (JPS)
## Documentation
- Class name: `Multiply Int Float (JPS)`
- Category: `JPS Nodes/Math`
- Output node: `False`

The `Math_Multiply_INT_FLOAT` node is designed to perform multiplication between an integer and a floating-point number, producing both integer and floating-point results. This node facilitates mathematical operations within a flow, allowing for the combination of different numerical types to achieve precise calculations.
## Input types
### Required
- **`int_a`**
    - Represents the integer value to be multiplied. Its role is crucial as it determines the scale of the multiplication operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`float_b`**
    - Represents the floating-point number to be multiplied with the integer. It allows for fractional scaling in the multiplication process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`int_multiply`**
    - Comfy dtype: `INT`
    - The integer result of multiplying the input integer and floating-point number.
    - Python dtype: `int`
- **`float_multiply`**
    - Comfy dtype: `FLOAT`
    - The floating-point result of the multiplication, providing a precise outcome.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Multiply_INT_FLOAT:

    def init(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int_a": ("INT", {"default": 1,}),
                "float_b": ("FLOAT", {"default": 1,}),
            }
        }

    RETURN_TYPES = ("INT","FLOAT")
    RETURN_NAMES = ("int_multiply","float_multiply")
    FUNCTION = "get_multiply_int_float"

    CATEGORY="JPS Nodes/Math"

    def get_multiply_int_float(self,int_a,float_b):
        int_multiply = int(int_a) * float(float_b)
        float_multiply = int(int_a) * float(float_b)

        return(int(int_multiply),float(float_multiply))

```
