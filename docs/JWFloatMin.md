
# Documentation
- Class name: JWFloatMin
- Category: jamesWalker55
- Output node: False

JWFloatMin 节点计算两个浮点数的最小值，为数值数据处理提供了一个简单而基本的数学运算。

# Input types
## Required
- a
    - 要比较的第一个浮点数。它在与第二个数字比较以确定最小值时起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 要比较的第二个浮点数。它与第一个数字一起对确定最小值至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 两个输入浮点数之间的最小值。
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
