---
tags:
- MathematicalFunctions
---

# Integer Absolute Value
## Documentation
- Class name: `JWIntegerAbsolute`
- Category: `jamesWalker55`
- Output node: `False`

The node computes the absolute value of an integer, transforming negative values to their positive counterparts without changing positive values.
## Input types
### Required
- **`value`**
    - Specifies the integer whose absolute value is to be computed. This input determines the magnitude of the output while ensuring it is non-negative.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The non-negative absolute value of the input integer.
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
