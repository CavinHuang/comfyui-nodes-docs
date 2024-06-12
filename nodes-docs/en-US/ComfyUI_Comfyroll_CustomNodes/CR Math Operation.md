---
tags:
- Math
- VectorMath
---

# ⚙️ CR Math Operation
## Documentation
- Class name: `CR Math Operation`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/⚙️ Other`
- Output node: `False`

The CR_MathOperation node performs a variety of mathematical operations on a given input value, such as trigonometric functions, square root, exponentiation, logarithm, negation, and absolute value. It allows for the specification of the operation to be performed and the number of decimal places for the result, making it a versatile tool for mathematical manipulations within the node network.
## Input types
### Required
- **`a`**
    - The input value on which the mathematical operation will be performed. The choice of operation affects the node's execution and the nature of the result.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`operation`**
    - Specifies the mathematical operation to be applied to the input value. This determines the mathematical transformation that the input will undergo.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`decimal_places`**
    - Determines the number of decimal places to which the result will be rounded. This allows for control over the precision of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`a`**
    - Comfy dtype: `FLOAT`
    - The result of the specified mathematical operation performed on the input value, rounded to the specified number of decimal places.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing detailed information about the mathematical operations supported by this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_MathOperation:

    @classmethod
    def INPUT_TYPES(cls):
    
        operations = ["sin", "cos", "tan", "sqrt", "exp", "log", "neg", "abs"]
        
        return {
            "required": {
                "a": ("FLOAT", {"default": 1.0},), 
                "operation": (operations, ),
                "decimal_places": ("INT", {"default": 2, "min": 0, "max": 10}),
            }
        }
    
    RETURN_TYPES =("FLOAT", "STRING", )
    RETURN_NAMES =("a", "show_help", )
    FUNCTION = "do_math"    
    CATEGORY = icons.get("Comfyroll/Utils/Other")

    def do_math(self, a, operation, decimal_places):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-math-operation"    

        #Apply the specified operation on the input value 'a'.
        if operation == 'sin':
            result = math.sin(a)
        elif operation == 'cos':
            result = math.cos(a)
        elif operation == 'tan':
            result = math.cos(a)        
        elif operation == 'sqrt':
            result = math.sqrt(a)
        elif operation == 'exp':
            result = math.exp(a)
        elif operation == 'log':
            result = math.log(a)            
        elif operation == 'neg':
            result = -a
        elif operation == 'abs':
            result = abs(a)
        else:
            raise ValueError("CR Math Operation: Unsupported operation.")
            
        result = round(result, decimal_places)   
            
        return (result, show_help, )

```
