
# Documentation
- Class name: JWIntegerMul
- Category: jamesWalker55
- Output node: False

JWIntegerMul节点提供了一个简单的整数乘法功能。它接收两个整数作为输入，并返回它们的乘积。这个节点主要用于涉及整数的基本算术运算。

# Input types
## Required
- a
    - 乘法运算中的第一个整数操作数。它在决定最终乘积的值上起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 乘法运算中的第二个整数操作数。它对最终的乘积结果有重要影响。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 两个输入整数相乘的结果，以整数形式返回。
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
