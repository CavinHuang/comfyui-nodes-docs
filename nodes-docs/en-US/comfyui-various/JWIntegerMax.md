---
tags:
- MathematicalFunctions
---

# Integer Maximum
## Documentation
- Class name: `JWIntegerMax`
- Category: `jamesWalker55`
- Output node: `False`

The JWIntegerMax node is designed to compute the maximum value between two integers. It abstracts the process of comparing two integer values and returning the larger one, simplifying operations that require finding the maximum of two numbers.
## Input types
### Required
- **`a`**
    - The first integer value to be compared. It plays a crucial role in determining the maximum value when compared with the second integer.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The second integer value to be compared with the first. This value is essential in the comparison process to identify the maximum of the two integers.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is the maximum value obtained from comparing the two input integers. It represents the larger of the two numbers provided as input.
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
