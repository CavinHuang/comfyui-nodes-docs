
# Documentation
- Class name: JWStringMultiline
- Category: jamesWalker55
- Output node: False

该节点旨在处理和返回多行字符串，保留文本中的换行符和格式。它简化了管理多行字符串的复杂性，使处理跨多行的文本变得更加容易。

# Input types
## Required
- text
    - text输入参数允许用户输入多行字符串。这个参数对于保留输入文本的格式和换行符至关重要，确保输出能准确反映原始文本的结构。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出是一个保留了输入文本格式和换行符的多行字符串，适用于需要保持原始文本结构的应用场景。
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
