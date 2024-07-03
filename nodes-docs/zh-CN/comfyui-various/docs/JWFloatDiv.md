
# Documentation
- Class name: JWFloatDiv
- Category: jamesWalker55
- Output node: False

JWFloatDiv节点执行两个浮点值之间的除法运算，并返回一个浮点数结果。这个操作允许基于浮点数动态计算比率或进行调整。

# Input types
## Required
- a
    - 'a'参数代表除法运算中的被除数。它是一个关键组成部分，因为它决定了除法开始的基准值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 'b'参数在除法运算中充当除数。它的值直接影响结果，对计算除法结果至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输出是将'a'参数除以'b'参数的结果。它以浮点数格式表示商。
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
