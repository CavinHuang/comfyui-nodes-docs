
# Documentation
- Class name: `ControlNetHadamard (manual)`
- Category: `Bmad/conditioning`
- Output node: `False`

ControlNetHadamard (manual)节点将控制网络应用于一组图像，基于提供的条件和指定的强度，调整图像的条件以进行进一步处理。它利用Hadamard乘积的概念在控制网络的上下文中调节控制网络对图像的影响。

# Input types
## Required
- conds
    - 应用于每个图像的条件，决定控制网络如何修改图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- control_net
    - 要应用于图像的控制网络，决定修改的性质。
    - Comfy dtype: CONTROL_NET
    - Python dtype: torch.nn.Module
- strength
    - 一个标量值，决定控制网络对图像影响的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- inputs_len
    - 指定要处理的图像数量，允许根据输入动态调整。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - 将控制网络应用于图像后修改的条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ControlNetHadamardManual(ControlNetHadamard):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conds": ("CONDITIONING",),
                             "control_net": ("CONTROL_NET",),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "inputs_len": ("INT", {"default": 9, "min": 0, "max": 32})
                             }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/conditioning"
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def apply(self, conds, control_net, strength, inputs_len, **kwargs):
        inputs_len = inputs_len[0]
        images = []
        for i in range(inputs_len):
            arg_name = get_arg_name_from_multiple_inputs("image", i)
            images.append(kwargs[arg_name][0])
        return super().apply(conds, control_net, images, strength)

```
