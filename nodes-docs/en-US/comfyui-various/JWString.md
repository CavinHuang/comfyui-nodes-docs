---
tags:
- String
- Text
---

# String
## Documentation
- Class name: `JWString`
- Category: `jamesWalker55`
- Output node: `False`

This node transforms a list of strings into a formatted string based on a provided template. It allows for dynamic string manipulation and formatting, enabling the creation of structured text outputs from a list of individual strings.
## Input types
### Required
- **`text`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The resulting string after applying the template formatting to the input string list.
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
