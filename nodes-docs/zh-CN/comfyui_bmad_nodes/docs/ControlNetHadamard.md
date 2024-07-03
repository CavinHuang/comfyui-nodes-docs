
# Documentation
- Class name: `ControlNetHadamard`
- Category: `Bmad/conditioning`
- Output node: `False`

ControlNetHadamard节点应用控制网络到一组图像和条件上，根据控制网络的输出和指定的强度调整条件。它旨在实现动态图像调节，允许根据控制网络的逻辑修改图像属性或风格。

# Input types
## Required
- conds
    - 要应用于每个图像的条件，这些条件会被控制网络修改以达到预期效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]
- control_net
    - 用于基于图像和指定强度修改条件的控制网络。
    - Comfy dtype: CONTROL_NET
    - Python dtype: torch.nn.Module
- image
    - 应用条件的图像，作为控制网络修改的基础。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- strength
    - 决定控制网络对条件影响的强度，允许进行精细调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 经过控制网络处理后的修改条件，反映了应用的变化。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ControlNetHadamard(nodes.ControlNetApply):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conds": ("CONDITIONING",),
                             "control_net": ("CONTROL_NET",),
                             "image": ("IMAGE",),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/conditioning"
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def apply(self, conds, control_net, images, strength):
        control_net = control_net[0]
        strength = strength[0]

        if len(images) != len(conds):
            raise "lists sizes do not match"  # maybe relax check and allow for fewer conds than images?

        print(len(images))
        print(len(images[0]))
        print(len(conds))
        new_conds = []
        for i in range(len(images)):
            new_conds.append(super().apply_controlnet(conds[i], control_net, images[i], strength)[0])
        return (new_conds,)

```
