# Documentation
- Class name: ApplyInstantIDControlNet
- Category: InstantID
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_InstantID.git

该节点基于给定的嵌入和关键点信息应用控制网络来修改图像中的面部特征。它根据指定的正面和负面调节输入调整面部外观，允许微调面部表情和结构。

# Input types
## Required
- face_embeds
    - 该参数包含面部嵌入，对于节点的操作至关重要，因为它们提供了将要被操作的面部的基础表示。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]
- control_net
    - 控制网络对于应用面部特征的更改至关重要。它根据调节输入作为修改的指南。
    - Comfy dtype: CONTROL_NET
    - Python dtype: torch.nn.Module
- image_kps
    - 图像的关键点信息至关重要，因为它提供了面部特征的空间上下文，确保根据控制网络进行精确调整。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
- positive
    - 正面调节输入作为期望的面部特征的参考，指导节点实现预期的外观。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- negative
    - 负面调节输入通过与正面输入形成对比，帮助避免不希望的特征，提高面部调整的精确度。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- strength
    - 强度参数决定了控制网络对面部特征影响的强度，允许根据输入值进行微妙或显著的变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at
    - 该参数定义了控制网络影响的起点，使节点能够逐渐或从一开始就应用更改。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 结束点参数指定何时结束控制网络的调整，确保面部特征修改的控制过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mask
    - 当提供掩码参数时，它允许通过指定应应用或排除更改的图像区域来进行有针对性的调整。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- positive
    - 输出的正面参数代表基于输入正面调节的修改后的面部特征，反映了节点的调整。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- negative
    - 输出的负面参数显示了对输入负面调节所做的更改，展示了节点在完善面部特征的同时避免不希望的特质的能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: GPU

# Source code
```
class ApplyInstantIDControlNet:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'face_embeds': ('FACE_EMBEDS',), 'control_net': ('CONTROL_NET',), 'image_kps': ('IMAGE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}, 'optional': {'mask': ('MASK',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('positive', 'negative')
    FUNCTION = 'apply_controlnet'
    CATEGORY = 'InstantID'

    def apply_controlnet(self, face_embeds, control_net, image_kps, positive, negative, strength, start_at, end_at, mask=None):
        self.device = comfy.model_management.get_torch_device()
        if strength == 0:
            return (positive, negative)
        if mask is not None:
            mask = mask.to(self.device)
        if mask is not None and len(mask.shape) < 3:
            mask = mask.unsqueeze(0)
        image_prompt_embeds = face_embeds['cond']
        uncond_image_prompt_embeds = face_embeds['uncond']
        cnets = {}
        cond_uncond = []
        control_hint = image_kps.movedim(-1, 1)
        is_cond = True
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                prev_cnet = d.get('control', None)
                if prev_cnet in cnets:
                    c_net = cnets[prev_cnet]
                else:
                    c_net = control_net.copy().set_cond_hint(control_hint, strength, (start_at, end_at))
                    c_net.set_previous_controlnet(prev_cnet)
                    cnets[prev_cnet] = c_net
                d['control'] = c_net
                d['control_apply_to_uncond'] = False
                d['cross_attn_controlnet'] = image_prompt_embeds.to(comfy.model_management.intermediate_device()) if is_cond else uncond_image_prompt_embeds.to(comfy.model_management.intermediate_device())
                if mask is not None and is_cond:
                    d['mask'] = mask
                    d['set_area_to_bounds'] = False
                n = [t[0], d]
                c.append(n)
            cond_uncond.append(c)
            is_cond = False
            print(cond_uncond[0])
        return (cond_uncond[0], cond_uncond[1])
```