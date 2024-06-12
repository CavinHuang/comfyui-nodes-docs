---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Float to String
## Documentation
- Class name: `JWFloatToString`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to convert a floating-point number into its string representation, facilitating the integration of numerical data with text-based processes or outputs.
## Input types
### Required
- **`value`**
    - The floating-point number to be converted into a string. This parameter is crucial for defining the specific numerical value that will undergo conversion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`format_string`**
    - A format string specifying how the floating-point number should be formatted when converted to a string. This allows for customization of the output string, including precision, padding, and other formatting options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string representation of the input floating-point number, formatted according to the provided format string.
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
