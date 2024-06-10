---
tags:
- List
- MultilineText
- Text
---

# String (Multiline)
## Documentation
- Class name: `JWStringMultiline`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to handle and return multiline strings, allowing for the preservation of line breaks and formatting within the text. It abstracts the complexity of managing multiline strings, making it easier to work with text that spans multiple lines.
## Input types
### Required
- **`text`**
    - The text input parameter allows users to input a multiline string. This parameter is crucial for preserving the formatting and line breaks of the input text, ensuring that the output accurately reflects the original structure of the text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a multiline string that preserves the formatting and line breaks of the input text, making it suitable for applications that require maintaining the original text structure.
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
