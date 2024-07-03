
# Documentation
- Class name: JWIntegerToFloat
- Category: jamesWalker55
- Output node: False

JWIntegerToFloat节点旨在将整数输入转换为其浮点数表示。这种转换允许以可容纳小数的格式保存数值数据，从而便于需要分数值的操作。

# Input types
## Required
- value
    - 要转换为浮点数的整数值。这个输入对于操作至关重要，因为它决定了将要进行转换过程的确切数值数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- float
    - 输入整数的浮点数表示。这个输出很重要，因为它使得转换后的值可以在需要浮点精度的场景中使用。
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
