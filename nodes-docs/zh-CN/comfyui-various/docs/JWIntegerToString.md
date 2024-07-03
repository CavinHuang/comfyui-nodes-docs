
# Documentation
- Class name: JWIntegerToString
- Category: jamesWalker55
- Output node: False

JWIntegerToString 节点用于将整数转换为字符串，并按照指定的格式进行转换。这个节点允许自定义整数的表示方式，便于将数值数据集成到基于文本的格式中。

# Input types
## Required
- value
    - 需要转换为字符串的整数值。该参数决定了最终字符串的数值内容。
    - Comfy dtype: INT
    - Python dtype: int
- format_string
    - 定义整数值如何表示为字符串的格式字符串。该参数允许灵活地自定义输出格式，包括填充、对齐和数字进制等。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 根据指定的格式字符串转换后的整数字符串表示。
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
