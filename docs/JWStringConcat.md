
# Documentation
- Class name: JWStringConcat
- Category: jamesWalker55
- Output node: False

JWStringConcat节点用于连接两个字符串，为数据流中的字符串操作提供了一个简单而重要的功能。

# Input types
## Required
- a
    - 要连接的第一个字符串。它作为最终连接字符串的起始部分。
    - Comfy dtype: STRING
    - Python dtype: str
- b
    - 要连接的第二个字符串。它被附加到第一个字符串之后，形成完整的连接结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 连接两个输入字符串的结果，形成一个单一的组合字符串。
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
