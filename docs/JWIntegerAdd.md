
# Documentation
- Class name: JWIntegerAdd
- Category: jamesWalker55
- Output node: False

JWIntegerAdd节点执行两个整数值的加法运算，在节点网络中提供了一个简单的算术操作功能。

# Input types
## Required
- a
    - 要相加的第一个整数值。它在确定加法运算结果中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 要相加的第二个整数值。它与第一个整数一起对加法运算的结果做出同等贡献。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 两个输入整数相加的结果。这个输出代表了输入值的总和。
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
