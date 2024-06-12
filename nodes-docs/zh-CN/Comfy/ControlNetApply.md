# Documentation
- Class name: ControlNetApply
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ControlNetApply 类中的 'apply_controlnet' 方法旨在将控制信号集成到神经网络的处理流程中。它接收条件数据、控制网络、图像和一个强度参数，以调节控制网络对图像的影响。该方法的目的是使用控制网络的指导增强图像，确保输出的条件反映了基于指定强度的预期调整。

# Input types
## Required
- conditioning
    - ‘conditioning’参数对于节点的操作至关重要，因为它为控制网络提供了应用其修改的初始状态或上下文。这是一个关键的输入，它直接影响图像处理的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- control_net
    - ‘control_net’参数定义了将用于指导对图像进行修改的网络。它是一个必需的输入，在形成节点处理的最终输出中起着核心作用。
    - Comfy dtype: CONTROL_NET
    - Python dtype: torch.nn.Module
- image
    - ‘image’参数是控制网络修改的对象。它代表了将根据提供的控制信号进行增强或更改的数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- strength
    - ‘strength’参数调整控制网络对图像影响的强度。它是一个可选输入，允许微调应用于图像的修改程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出 'conditioning' 表示在应用控制网络的影响后的修改状态。它很重要，因为它携带了对原始图像数据所做的最终调整。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ControlNetApply:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'control_net': ('CONTROL_NET',), 'image': ('IMAGE',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'apply_controlnet'
    CATEGORY = 'conditioning'

    def apply_controlnet(self, conditioning, control_net, image, strength):
        if strength == 0:
            return (conditioning,)
        c = []
        control_hint = image.movedim(-1, 1)
        for t in conditioning:
            n = [t[0], t[1].copy()]
            c_net = control_net.copy().set_cond_hint(control_hint, strength)
            if 'control' in t[1]:
                c_net.set_previous_controlnet(t[1]['control'])
            n[1]['control'] = c_net
            n[1]['control_apply_to_uncond'] = True
            c.append(n)
        return (c,)
```