
# Documentation
- Class name: JWStringGetLine
- Category: jamesWalker55
- Output node: False

这个节点根据提供的行索引从给定的字符串中提取特定行。它旨在通过允许用户轻松地从较大的文本块中检索单独的行来促进文本处理。

# Input types
## Required
- source
    - 将从中提取行的源字符串。它作为行检索的文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- line_index
    - 从源字符串中检索的行的索引。这决定了提取文本的哪一行。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 从源字符串中指定索引处提取的行。
    - Comfy dtype: STRING
    - Python dtype: str


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
