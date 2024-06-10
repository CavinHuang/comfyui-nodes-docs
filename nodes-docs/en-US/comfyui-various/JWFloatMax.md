---
tags:
- MathematicalFunctions
---

# Float Maximum
## Documentation
- Class name: `JWFloatMax`
- Category: `jamesWalker55`
- Output node: `False`

This node calculates the maximum value between two floating-point numbers. It is designed to compare and return the larger of two float values, providing a simple yet essential operation for numerical data processing.
## Input types
### Required
- **`a`**
    - The first floating-point number to be compared. It plays a crucial role in determining the maximum value when compared with the second number.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - The second floating-point number to be compared. It is essential for determining the maximum value in conjunction with the first number.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The maximum value between the two input floating-point numbers.
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
