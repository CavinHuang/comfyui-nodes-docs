
# Documentation
- Class name: JWFloatSub
- Category: jamesWalker55
- Output node: False

该节点旨在执行两个浮点数之间的减法运算，为在计算图中计算数值差提供了一种简单直接的方法。

# Input types
## Required
- a
    - 表示减法运算中的被减数，即将要从中减去另一个数（减数）的数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 表示减法运算中的减数，即将要从另一个数（被减数）中减去的数。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 两个浮点数之间进行减法运算的结果。
    - Comfy dtype: FLOAT
    - Python dtype: tuple[float]


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
