---
tags:
- DataTypeConversion
- MathematicalFunctions
---

# Integer Add
## Documentation
- Class name: `JWIntegerAdd`
- Category: `jamesWalker55`
- Output node: `False`

The JWIntegerAdd node performs the addition of two integer values, providing a simple arithmetic operation within the node network.
## Input types
### Required
- **`a`**
    - The first integer value to be added. It plays a crucial role in determining the outcome of the addition operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The second integer value to be added. It contributes equally to the result of the addition operation alongside the first integer.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The result of adding the two input integers. This output represents the sum of the inputs.
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
