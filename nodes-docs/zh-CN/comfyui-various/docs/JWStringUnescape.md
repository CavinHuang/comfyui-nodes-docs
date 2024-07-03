
# Documentation
- Class name: JWStringUnescape
- Category: jamesWalker55
- Output node: False

JWStringUnescape节点旨在处理包含转义字符的字符串输入。它能将诸如'\n'这样的转义序列转换为实际的字符表示（如换行符）。这一功能对于准确处理和显示包含转义序列的字符串至关重要。

# Input types
## Required
- text
    - text参数是可能包含转义序列的输入字符串。该节点通过将这些序列转换为相应的字符来处理输入，从而提高字符串的可读性和可用性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出是一个所有转义序列都已转换为实际字符表示的字符串，使其更易读且更易于使用。
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
