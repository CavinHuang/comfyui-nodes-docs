
# Documentation
- Class name: JWFloatMul
- Category: jamesWalker55
- Output node: False

JWFloatMul节点执行两个浮点数之间的乘法运算，为在浮点数环境中缩放或组合数值提供了一种直接的方法。这个节点在需要精确数值计算的场景中特别有用，例如在图像处理、金融计算或科学模拟等领域。

# Input types
## Required
- a
    - 要进行乘法运算的第一个浮点数。它作为乘法操作中的一个操作数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 要进行乘法运算的第二个浮点数。它作为乘法操作中的另一个操作数，共同决定最终的乘积。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 两个输入浮点数相乘的结果，以单个浮点数的形式返回。
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
