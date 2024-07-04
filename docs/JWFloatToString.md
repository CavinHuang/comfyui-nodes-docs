
# Documentation
- Class name: JWFloatToString
- Category: jamesWalker55
- Output node: False

JWFloatToString节点的设计目的是将浮点数转换为其字符串表示形式，从而方便将数值数据与基于文本的处理或输出进行集成。

# Input types
## Required
- value
    - 需要转换为字符串的浮点数。这个参数对于确定将要进行转换的具体数值至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- format_string
    - 一个格式字符串，用于指定浮点数在转换为字符串时应如何格式化。这允许自定义输出字符串，包括精度、填充和其他格式选项。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输入浮点数的字符串表示，根据提供的格式字符串进行格式化。
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
