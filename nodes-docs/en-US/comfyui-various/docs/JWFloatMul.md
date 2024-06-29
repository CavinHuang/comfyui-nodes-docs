---
tags:
- MathematicalFunctions
- Multiplication
---

# Float Multiply
## Documentation
- Class name: `JWFloatMul`
- Category: `jamesWalker55`
- Output node: `False`

This node performs multiplication between two floating-point numbers, providing a straightforward way to scale or combine numerical values in a floating-point context.
## Input types
### Required
- **`a`**
    - The first floating-point number to be multiplied. It serves as one of the operands in the multiplication operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - The second floating-point number to be multiplied. It acts as the other operand in the multiplication operation, contributing to the final product.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of multiplying the two input floating-point numbers, returned as a single floating-point number.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
        @register_node(identifier, display_name)
        class _:
            CATEGORY = category
            INPUT_TYPES = lambda: {"required": required_inputs}
            RETURN_TYPES = tuple(return_types)
            OUTPUT_NODE = output_node
            FUNCTION = "execute"

            def execute(self, *args, **kwargs):
                return func(*args, **kwargs)

```
