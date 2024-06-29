# Documentation
- Class name: ControlNetApplyAdvanced
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ControlNetApplyAdvanced节点旨在将控制网络应用于一组条件输入，提高生成过程的精度和控制。它通过调整积极和消极条件因素的影响来操作，允许根据特定的图像特征和所需的强度对输出进行微调。

# Input types
## Required
- positive
    - “positive”输入代表应在输出中强调的所需特征。它对于引导生成过程朝向期望的结果至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - “negative”输入包含应在输出中避免的特征。它在提炼生成过程中以排除不需要的元素方面发挥重要作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- control_net
    - “control_net”参数是用于管理控制提示应用的预配置网络。它对节点的功能至关重要，决定了条件应用的方式。
    - Comfy dtype: CONTROL_NET
    - Python dtype: ControlNet
- image
    - “image”输入是将应用控制网络的视觉数据。它是基本组成部分，因为它定义了条件过程的上下文。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- strength
    - “strength”参数决定了控制网络对输出影响的强度。它是控制条件引起的变化程度的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - “start_percent”参数指定控制网络效果相对于图像尺寸的起始点。它在定义控制应用的初始范围方面很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - “end_percent”参数标记了控制网络影响的终点。它在定义控制网络影响输出的范围方面至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positive
    - “positive”输出是经过控制网络调整的精炼条件数据，确保所需特征在最终输出中更加突出。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - “negative”输出反映了通过控制网络应用最小化不需要的特征的条件数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ControlNetApplyAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'control_net': ('CONTROL_NET',), 'image': ('IMAGE',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('positive', 'negative')
    FUNCTION = 'apply_controlnet'
    CATEGORY = 'conditioning'

    def apply_controlnet(self, positive, negative, control_net, image, strength, start_percent, end_percent):
        if strength == 0:
            return (positive, negative)
        control_hint = image.movedim(-1, 1)
        cnets = {}
        out = []
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                prev_cnet = d.get('control', None)
                if prev_cnet in cnets:
                    c_net = cnets[prev_cnet]
                else:
                    c_net = control_net.copy().set_cond_hint(control_hint, strength, (start_percent, end_percent))
                    c_net.set_previous_controlnet(prev_cnet)
                    cnets[prev_cnet] = c_net
                d['control'] = c_net
                d['control_apply_to_uncond'] = False
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1])
```