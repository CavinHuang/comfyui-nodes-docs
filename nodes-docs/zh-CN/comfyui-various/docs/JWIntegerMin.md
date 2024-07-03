
# Documentation
- Class name: JWIntegerMin
- Category: jamesWalker55
- Output node: False

JWIntegerMin节点用于计算两个整数值的最小值。它抽象了比较两个整数并返回最小值的过程，简化了需要确定最小值的操作。

# Input types
## Required
- a
    - 要比较的第一个整数值。在与第二个整数比较时，它在确定最小值中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 要比较的第二个整数值。在比较过程中，它对于确定两个整数之间的最小值至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出是通过比较两个输入整数获得的最小值。
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
