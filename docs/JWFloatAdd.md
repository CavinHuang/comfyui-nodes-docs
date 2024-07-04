
# Documentation
- Class name: JWFloatAdd
- Category: jamesWalker55
- Output node: False

JWFloatAdd节点用于执行两个浮点数的加法运算，为数值计算提供了一个简单而基本的算术操作功能。

# Input types
## Required
- a
    - 表示要相加的第一个浮点数。它在决定加法运算的结果中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 表示要相加的第二个浮点数。它与第一个数一起影响加法运算的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 两个输入浮点数相加的结果。它封装了这个算术运算的最终输出。
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
