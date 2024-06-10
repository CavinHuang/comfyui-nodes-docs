---
tags:
- Text
- TextReplacement
---

# String Replace
## Documentation
- Class name: `JWStringReplace`
- Category: `jamesWalker55`
- Output node: `False`

This node performs a string replacement operation, substituting all occurrences of a specified substring within a source string with another substring. It's designed to modify text data by replacing specific text patterns with alternative text, facilitating text preprocessing or data normalization tasks.
## Input types
### Required
- **`source`**
    - The original string where replacements will be made. It serves as the base text for the operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`to_replace`**
    - The substring within the source string that needs to be replaced. It identifies the specific pattern or text to be substituted.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace_with`**
    - The substring that will replace occurrences of the 'to_replace' substring in the source string. It specifies the new text to be inserted.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The modified string after all occurrences of the 'to_replace' substring have been replaced with the 'replace_with' substring.
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
