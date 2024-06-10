# String Unescape
## Documentation
- Class name: `JWStringUnescape`
- Category: `jamesWalker55`
- Output node: `False`

The JWStringUnescape node is designed to process string inputs by converting escaped characters, such as '\n', into their actual character representations, like a newline character. This functionality is essential for handling and displaying strings that contain escape sequences accurately.
## Input types
### Required
- **`text`**
    - The 'text' parameter is the input string that may contain escape sequences. This node processes the input by converting these sequences into their corresponding characters, enhancing the readability and usability of the string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a string where all escape sequences have been converted to their actual character representations, making the string more readable and usable.
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
