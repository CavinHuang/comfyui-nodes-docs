
# Documentation
- Class name: JWIntegerMax
- Category: jamesWalker55
- Output node: False

JWIntegerMax节点用于计算两个整数之间的最大值。它抽象了比较两个整数值并返回较大值的过程，简化了需要找出两个数字中最大值的操作。

# Input types
## Required
- a
    - 要比较的第一个整数值。它在与第二个整数比较以确定最大值时起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 要与第一个整数比较的第二个整数值。这个值在比较过程中对于识别两个整数中的最大值至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出是通过比较两个输入整数获得的最大值。它代表了作为输入提供的两个数字中较大的一个。
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
