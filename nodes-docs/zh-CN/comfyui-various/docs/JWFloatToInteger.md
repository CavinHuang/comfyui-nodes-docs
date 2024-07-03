
# Documentation
- Class name: JWFloatToInteger
- Category: jamesWalker55
- Output node: False

JWFloatToInteger节点用于将浮点数转换为整数。它提供了不同的舍入模式，如四舍五入、向下取整和向上取整，以控制转换过程。这个节点在需要将连续的浮点值离散化为整数的场景中非常有用，比如在图像处理或数值计算中。

# Input types
## Required
- value
    - 这是要转换为整数的浮点数。转换的具体行为可以通过'mode'参数来控制。value参数是节点的主要输入，决定了最终输出的整数值的基础。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mode
    - 指定转换时使用的舍入模式：'round'表示四舍五入到最接近的整数，'floor'表示向下取整到最接近的较小整数，'ceiling'表示向上取整到最接近的较大整数。这个参数决定了如何将浮点数舍入为整数结果，从而影响最终的输出值。
    - Comfy dtype: ['round', 'floor', 'ceiling']
    - Python dtype: Literal['round', 'floor', 'ceiling']

# Output types
- int
    - 根据指定的舍入模式将浮点数转换后得到的整数结果。这个输出反映了输入浮点数经过选定舍入方式处理后的离散化结果。
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
