
# Documentation
- Class name: JWFloatMax
- Category: jamesWalker55
- Output node: False

JWFloatMax节点用于计算两个浮点数之间的最大值。它旨在比较两个浮点值并返回较大的一个，为数值数据处理提供了一个简单而关键的操作。

# Input types
## Required
- a
    - 要比较的第一个浮点数。它在与第二个数字比较时对确定最大值起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 要比较的第二个浮点数。它与第一个数字一起，对确定最大值至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 两个输入浮点数之间的最大值。
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
