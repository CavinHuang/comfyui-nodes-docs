---
tags:
- Arithmetic
- MathematicalFunctions
---

# Integer Divide
## Documentation
- Class name: `JWIntegerDiv`
- Category: `jamesWalker55`
- Output node: `False`

The JWIntegerDiv node performs division between two integer inputs, producing a floating-point result. This node abstracts the mathematical division operation, allowing for the integration of division functionality within data processing pipelines.
## Input types
### Required
- **`a`**
    - The dividend in the division operation. It represents the integer value to be divided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The divisor in the division operation. It represents the integer value by which the dividend is divided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is the result of the division operation, represented as a floating-point number.
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
