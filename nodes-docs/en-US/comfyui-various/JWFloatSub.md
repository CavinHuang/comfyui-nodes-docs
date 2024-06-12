---
tags:
- Arithmetic
- MathematicalFunctions
---

# Float Subtract
## Documentation
- Class name: `JWFloatSub`
- Category: `jamesWalker55`
- Output node: `False`

The node is designed to perform subtraction between two floating-point numbers, providing a straightforward way to calculate the difference between values in a computational graph.
## Input types
### Required
- **`a`**
    - Represents the minuend in the subtraction operation, essentially the number from which another number (the subtrahend) is to be subtracted.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - Represents the subtrahend in the subtraction operation, essentially the number that is to be subtracted from another number (the minuend).
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of the subtraction operation between two floating-point numbers.
    - Python dtype: `tuple[float]`
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
