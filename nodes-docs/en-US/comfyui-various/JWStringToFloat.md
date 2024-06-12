---
tags:
- DataTypeConversion
- MathematicalFunctions
---

# String to Float
## Documentation
- Class name: `JWStringToFloat`
- Category: `jamesWalker55`
- Output node: `False`

The JWStringToFloat node is designed to convert a string representation of a floating-point number into its actual float value. This node facilitates the transformation of textual data into numerical format for further processing or computation.
## Input types
### Required
- **`text`**
    - The text input is a string that represents a floating-point number. This input is crucial for converting the textual representation into a numerical float value, enabling further numerical operations or analyses.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is the floating-point number that has been converted from the input string. This allows for the numerical representation of the text to be used in subsequent operations.
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
