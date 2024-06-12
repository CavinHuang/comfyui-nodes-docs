---
tags:
- Concatenate
---

# String Concatenate
## Documentation
- Class name: `JWStringConcat`
- Category: `jamesWalker55`
- Output node: `False`

The JWStringConcat node is designed to concatenate two strings, providing a simple yet essential function for string manipulation within a data flow.
## Input types
### Required
- **`a`**
    - The first string to be concatenated. It serves as the initial part of the resulting concatenated string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`b`**
    - The second string to be concatenated. It is appended to the first string, forming the complete concatenated result.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The result of concatenating the two input strings, forming a single, combined string.
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
