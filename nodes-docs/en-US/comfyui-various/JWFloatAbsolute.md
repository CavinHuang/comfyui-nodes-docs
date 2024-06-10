---
tags:
- MathematicalFunctions
---

# Float Absolute Value
## Documentation
- Class name: `JWFloatAbsolute`
- Category: `jamesWalker55`
- Output node: `False`

The JWFloatAbsolute node calculates the absolute value of a given float number, effectively removing any negative sign to ensure the result is non-negative.
## Input types
### Required
- **`value`**
    - The input float number whose absolute value is to be calculated. This parameter allows the node to handle both positive and negative numbers by converting them to their non-negative counterpart.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The non-negative absolute value of the input float number.
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
