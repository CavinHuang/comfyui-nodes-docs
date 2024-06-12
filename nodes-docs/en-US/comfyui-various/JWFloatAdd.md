---
tags:
- DataTypeConversion
- MathematicalFunctions
---

# Float Add
## Documentation
- Class name: `JWFloatAdd`
- Category: `jamesWalker55`
- Output node: `False`

The JWFloatAdd node performs addition of two floating-point numbers, providing a simple yet essential arithmetic operation for numerical computations.
## Input types
### Required
- **`a`**
    - Represents the first floating-point number to be added. It plays a crucial role in determining the result of the addition operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - Represents the second floating-point number to be added. It affects the outcome of the addition operation alongside the first number.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of adding the two input floating-point numbers. It encapsulates the outcome of the arithmetic operation.
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
