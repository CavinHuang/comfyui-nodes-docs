---
tags:
- DataTypeConversion
- Math
- MathematicalExpressions
---

# 🔧 Simple Math
## Documentation
- Class name: `SimpleMath+`
- Category: `essentials`
- Output node: `False`

SimpleMath is a node designed to evaluate mathematical expressions dynamically. It supports basic arithmetic operations, conditional logic, and custom functions, allowing for flexible mathematical computations.
## Input types
### Required
- **`value`**
    - The mathematical expression to be evaluated. Supports basic arithmetic, variables, and custom functions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`a`**
    - A variable that can be used within the mathematical expression.
    - Comfy dtype: `INT,FLOAT`
    - Python dtype: `float`
- **`b`**
    - Another variable that can be used within the mathematical expression.
    - Comfy dtype: `INT,FLOAT`
    - Python dtype: `float`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The rounded result of the evaluated mathematical expression.
    - Python dtype: `int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The exact result of the evaluated mathematical expression, before rounding.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SimpleMath:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "a": ("INT,FLOAT", { "default": 0.0, "step": 0.1 }),
                "b": ("INT,FLOAT", { "default": 0.0, "step": 0.1 }),
            },
            "required": {
                "value": ("STRING", { "multiline": False, "default": "" }),
            },
        }

    RETURN_TYPES = ("INT", "FLOAT", )
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, value, a = 0.0, b = 0.0):
        def eval_(node):
            if isinstance(node, ast.Num): # number
                return node.n
            elif isinstance(node, ast.Name): # variable
                if node.id == "a":
                    return a
                if node.id == "b":
                    return b
            elif isinstance(node, ast.BinOp): # <left> <operator> <right>
                return operators[type(node.op)](eval_(node.left), eval_(node.right))
            elif isinstance(node, ast.UnaryOp): # <operator> <operand> e.g., -1
                return operators[type(node.op)](eval_(node.operand))
            elif isinstance(node, ast.Call): # custom function
                if node.func.id in op_functions:
                    args =[eval_(arg) for arg in node.args]
                    return op_functions[node.func.id](*args)
            else:
                return 0

        result = eval_(ast.parse(value, mode='eval').body)

        if math.isnan(result):
            result = 0.0

        return (round(result), result, )

```
