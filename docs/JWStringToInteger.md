
# Documentation
- Class name: JWStringToInteger
- Category: jamesWalker55
- Output node: False

该节点将整数的字符串表示转换为其数值形式。它旨在解析包含整数值的字符串，并将其转换为实际的整数数据类型，从而便于对原本为文本格式的值进行数值运算。

# Input types
## Required
- text
    - 'text'参数接受一个表示整数的字符串输入。这个参数对节点的操作至关重要，因为它决定了节点执行后将产生的整数值。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- int
    - 输出是输入字符串的整数表示。这允许对之前的文本整数值进行进一步的数值运算。
    - Comfy dtype: INT
    - Python dtype: int


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
