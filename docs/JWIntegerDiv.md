
# Documentation
- Class name: JWIntegerDiv
- Category: jamesWalker55
- Output node: False

JWIntegerDiv节点执行两个整数输入之间的除法运算，产生一个浮点数结果。这个节点抽象了数学除法运算，允许在数据处理流程中集成除法功能。

# Input types
## Required
- a
    - 除法运算中的被除数。它代表要被除的整数值。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 除法运算中的除数。它代表用来除被除数的整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- float
    - 输出是除法运算的结果，以浮点数表示。
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
