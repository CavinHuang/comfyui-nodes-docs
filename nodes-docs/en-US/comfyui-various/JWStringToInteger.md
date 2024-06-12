---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# String to Integer
## Documentation
- Class name: `JWStringToInteger`
- Category: `jamesWalker55`
- Output node: `False`

This node converts a string representation of an integer into its numerical form. It is designed to parse strings containing integer values and transform them into actual integer data types, facilitating numerical operations on values that were originally in text format.
## Input types
### Required
- **`text`**
    - The 'text' parameter takes a string input that represents an integer. This parameter is crucial for the node's operation as it determines the integer value that will be produced by the node's execution.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is an integer representation of the input string. This allows for further numerical operations to be performed on the previously textual integer value.
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
