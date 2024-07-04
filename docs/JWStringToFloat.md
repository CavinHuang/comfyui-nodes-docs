
# Documentation
- Class name: JWStringToFloat
- Category: jamesWalker55
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

JWStringToFloat节点旨在将浮点数的字符串表示转换为实际的浮点数值。该节点有助于将文本数据转化为数值格式，以便进行进一步的处理或计算。

# Input types
## Required
- text
    - 文本输入是一个代表浮点数的字符串。这个输入对于将文本表示转换为数值浮点数至关重要，使后续的数值运算或分析成为可能。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- float
    - 输出是从输入字符串转换而来的浮点数。这使得文本的数值表示可以在后续操作中使用。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
