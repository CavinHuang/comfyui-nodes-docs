---
tags:
- MathematicalFunctions
- Multiplication
---

# Multiply Float Float (JPS)
## Documentation
- Class name: `Multiply Float Float (JPS)`
- Category: `JPS Nodes/Math`
- Output node: `False`

Performs multiplication of two floating-point numbers, returning both integer and floating-point representations of the result. This node is designed to facilitate mathematical operations within a broader computational workflow, emphasizing flexibility in handling numerical data.
## Input types
### Required
- **`float_a`**
    - Represents the first floating-point number to be multiplied. Its value influences the multiplication operation and the resulting output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`float_b`**
    - Represents the second floating-point number to be multiplied. Together with float_a, it determines the outcome of the multiplication process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`int_multiply`**
    - Comfy dtype: `INT`
    - The result of the multiplication operation cast to an integer, providing a whole number representation of the product.
    - Python dtype: `int`
- **`float_multiply`**
    - Comfy dtype: `FLOAT`
    - The result of the multiplication operation as a floating-point number, offering a precise representation of the product.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Multiply_FLOAT_FLOAT:

    def init(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float_a": ("FLOAT", {"default": 1,}),
                "float_b": ("FLOAT", {"default": 1,}),
            }
        }

    RETURN_TYPES = ("INT","FLOAT")
    RETURN_NAMES = ("int_multiply","float_multiply")
    FUNCTION = "get_multiply_float_float"

    CATEGORY="JPS Nodes/Math"

    def get_multiply_float_float(self,float_a,float_b):
        int_multiply = float(float_a) * float(float_b)
        float_multiply = float(float_a) * float(float_b)

        return(int(int_multiply),float(float_multiply))

```
