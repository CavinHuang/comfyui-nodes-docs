---
tags:
- DataTypeConversion
- MathematicalFunctions
---

# Float to Integer
## Documentation
- Class name: `JWFloatToInteger`
- Category: `jamesWalker55`
- Output node: `False`

This node converts a floating-point number to an integer, offering different rounding modes such as round, floor, and ceiling to control the conversion process.
## Input types
### Required
- **`value`**
    - The floating-point number to be converted to an integer. The conversion behavior can be controlled through the 'mode' parameter.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mode`**
    - Specifies the rounding mode for the conversion: 'round' for nearest integer, 'floor' for the nearest lower integer, and 'ceiling' for the nearest higher integer. This parameter determines how the floating-point number is rounded to produce an integer result.
    - Comfy dtype: `['round', 'floor', 'ceiling']`
    - Python dtype: `Literal['round', 'floor', 'ceiling']`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The resulting integer after converting the floating-point number according to the specified rounding mode.
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
