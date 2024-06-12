# String Get Line
## Documentation
- Class name: `JWStringGetLine`
- Category: `jamesWalker55`
- Output node: `False`

This node extracts a specific line from a given string based on the line index provided. It is designed to facilitate text processing by allowing users to easily retrieve individual lines from larger text blocks.
## Input types
### Required
- **`source`**
    - The source string from which a line will be extracted. It serves as the text input for line retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`line_index`**
    - The index of the line to be retrieved from the source string. This determines which line of the text is extracted.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The extracted line from the source string at the specified index.
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
