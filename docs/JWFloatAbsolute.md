
# Documentation
- Class name: JWFloatAbsolute
- Category: jamesWalker55
- Output node: False

JWFloatAbsolute节点用于计算给定浮点数的绝对值，有效地去除任何负号以确保结果为非负数。

# Input types
## Required
- value
    - 需要计算绝对值的输入浮点数。该参数允许节点处理正数和负数，将它们转换为对应的非负数。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输入浮点数的非负绝对值。
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
