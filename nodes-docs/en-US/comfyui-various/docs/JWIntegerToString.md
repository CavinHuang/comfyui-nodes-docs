---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Integer to String
## Documentation
- Class name: `JWIntegerToString`
- Category: `jamesWalker55`
- Output node: `False`

Converts an integer to a string according to a specified format. This node allows for the customization of integer representation, facilitating the integration of numerical data into text-based formats.
## Input types
### Required
- **`value`**
    - The integer value to be converted into a string. This parameter determines the numerical content of the resulting string.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`format_string`**
    - A format string defining how the integer value should be represented as a string. This parameter allows for flexible customization of the output format, including padding, alignment, and number base.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string representation of the input integer, formatted according to the specified format string.
    - Python dtype: `str`
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
