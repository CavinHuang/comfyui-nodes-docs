
# Documentation
- Class name: JWIntegerAbsolute
- Category: jamesWalker55
- Output node: False

JWIntegerAbsolute节点用于计算整数的绝对值。它将负数转换为其正数对应值，而正数保持不变。这个操作可以确保输出始终是非负的。

# Input types
## Required
- value
    - 指定需要计算绝对值的整数。这个输入决定了输出的大小，同时确保输出是非负的。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输入整数的非负绝对值。
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
