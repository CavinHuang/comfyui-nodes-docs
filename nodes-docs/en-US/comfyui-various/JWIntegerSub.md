---
tags:
- Arithmetic
- MathematicalFunctions
---

# Integer Subtract
## Documentation
- Class name: `JWIntegerSub`
- Category: `jamesWalker55`
- Output node: `False`

This node performs subtraction between two integer values, providing a simple arithmetic operation that can be used in various computational workflows.
## Input types
### Required
- **`a`**
    - The first integer value to be subtracted from.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The second integer value which will be subtracted from the first.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The result of subtracting the second integer from the first.
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
