---
tags:
- DataTypeConversion
- MathematicalFunctions
---

# Integer to Float
## Documentation
- Class name: `JWIntegerToFloat`
- Category: `jamesWalker55`
- Output node: `False`

The JWIntegerToFloat node is designed to convert an integer input into its floating-point representation. This transformation allows for the preservation of numerical data in a format that can accommodate decimals, facilitating operations that require fractional values.
## Input types
### Required
- **`value`**
    - The integer value to be converted into a floating-point number. This input is crucial for the operation as it determines the exact numerical data that will undergo the conversion process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The floating-point representation of the input integer. This output is significant as it enables the use of the converted value in contexts that require floating-point precision.
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
