---
tags:
- MathematicalFunctions
---

# Integer Minimum
## Documentation
- Class name: `JWIntegerMin`
- Category: `jamesWalker55`
- Output node: `False`

The JWIntegerMin node is designed to compute the minimum of two integer values. It abstracts the process of comparing two integers and returning the smallest one, simplifying operations that require minimum value determination.
## Input types
### Required
- **`a`**
    - The first integer value to be compared. It plays a crucial role in determining the minimum value when compared with the second integer.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The second integer value to be compared. It is essential in the comparison process to identify the minimum value between the two integers.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is the minimum value obtained from comparing the two input integers.
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
