---
tags:
- MathematicalFunctions
- Multiplication
---

# Integer Multiply
## Documentation
- Class name: `JWIntegerMul`
- Category: `jamesWalker55`
- Output node: `False`

Provides a functionality to multiply two integer values, returning the product as an integer. This node is designed for basic arithmetic operations involving integers.
## Input types
### Required
- **`a`**
    - The first integer operand in the multiplication operation. It plays a crucial role in determining the product's value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The second integer operand in the multiplication operation. It significantly influences the resulting product.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The result of multiplying the two input integers, returned as an integer.
    - Python dtype: `int`
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
