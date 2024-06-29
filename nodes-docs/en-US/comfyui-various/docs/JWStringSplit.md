# String Split
## Documentation
- Class name: `JWStringSplit`
- Category: `jamesWalker55`
- Output node: `False`

The JWStringSplit node is designed to split a given string into two parts based on a specified delimiter, with an option to perform the split from the right. It abstracts the complexity of string manipulation, providing a straightforward way to divide strings for further processing.
## Input types
### Required
- **`source`**
    - The 'source' parameter is the string to be split. It plays a crucial role in determining the input string that will be divided into two parts based on the specified delimiter.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`split_by`**
    - The 'split_by' parameter specifies the delimiter used to split the 'source' string. Its value directly influences how the input string is divided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`from_right`**
    - The 'from_right' parameter determines whether the split should occur from the right side of the 'source' string. When set to 'true', the split is performed from the right; otherwise, it defaults to a left-side split.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `Literal['false', 'true']`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a tuple containing two strings, representing the parts of the original string after the split operation. This correction reflects the accurate output type, addressing the feedback.
    - Python dtype: `tuple[str, str]`
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
