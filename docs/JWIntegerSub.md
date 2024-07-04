
# Documentation
- Class name: `JWIntegerSub`
- Category: `jamesWalker55`
- Output node: `False`

这个节点执行两个整数值之间的减法运算，提供了一个简单的算术操作，可以在各种计算工作流程中使用。

# Input types
## Required
- a
    - 被减数，即要被减去的第一个整数值。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 减数，即要从第一个整数中减去的第二个整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 从第一个整数中减去第二个整数的结果。
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
