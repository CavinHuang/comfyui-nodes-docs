# Documentation
- Class name: AdvancedControlNetApply
- Category: Adv-ControlNet 🛂🅐🅒🅝
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

AdvancedControlNetApply节点旨在将控制信号应用于神经网络模型。它整合了正向和负向的调节输入以及控制网络，以影响模型的输出。该节点能够调整控制信号的强度和范围，确保对模型行为进行精细和精确的操控。

# Input types
## Required
- positive
    - 正向调节输入对于引导模型朝向期望的结果至关重要。它作为模型在生成过程中学习和应用的参考。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[Tensor, Iterable[Tuple[str, Dict]]]
- negative
    - 负向调节输入通过在生成过程中提供应排除的示例，帮助模型避免不希望的输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[Tensor, Iterable[Tuple[str, Dict]]]
- control_net
    - 控制网络是一个关键组件，它决定了模型的输出如何被影响。它用于将特定的控制信号应用于模型的不同部分。
    - Comfy dtype: CONTROL_NET
    - Python dtype: ControlBase
- image
    - 图像输入为模型提供视觉上下文，这对于生成与提供的视觉信息一致的输出至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: Tensor
- strength
    - 强度参数决定了施加在模型上的控制信号的强度。它允许微调控制网络对模型输出的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 开始百分比参数定义了控制信号影响的开始点，允许控制控制效果开始生效的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 结束百分比参数标记了控制信号影响的结束点，使控制效果的持续时间可控。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mask_optional
    - 可选的掩码输入可以用来选择性地将控制信号应用于模型输出的特定区域，提供了一种微调局部控制效果的手段。
    - Comfy dtype: MASK
    - Python dtype: Optional[Tensor]
- model_optional
    - model_optional参数允许提供另一个模型，该模型可以用来进一步细化应用于主模型的控制信号。
    - Comfy dtype: MODEL
    - Python dtype: Optional[ModelPatcher]
- timestep_kf
    - 时间步关键帧输入用于定义控制信号的时间结构，允许随时间动态控制。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: Optional[TimestepKeyframeGroup]
- latent_kf_override
    - 潜在关键帧覆盖允许定制控制信号对模型潜在空间的影响，提供了一种直接影响模型内部表示的方法。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: Optional[LatentKeyframeGroup]
- weights_override
    - 权重覆盖参数允许指定控制网络的自定义权重，允许对控制信号的微调进行更高级别的控制。
    - Comfy dtype: CONTROL_NET_WEIGHTS
    - Python dtype: Optional[ControlWeights]

# Output types
- positive
    - 正向输出代表了应用控制网络后的修改后的调节输入，反映了模型对期望结果的理解。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[Tensor, Iterable[Tuple[str, Dict]]]
- negative
    - 负向输出包括基于控制网络的影响，模型应该避免的修改后的调节输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[Tensor, Iterable[Tuple[str, Dict]]]
- model_opt
    - 可选的模型输出在应用控制网络期间提供了模型的任何更新或改进。
    - Comfy dtype: MODEL
    - Python dtype: Optional[ModelPatcher]

# Usage tips
- Infra type: GPU

# Source code
```
class AdvancedControlNetApply:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'control_net': ('CONTROL_NET',), 'image': ('IMAGE',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}, 'optional': {'mask_optional': ('MASK',), 'timestep_kf': ('TIMESTEP_KEYFRAME',), 'latent_kf_override': ('LATENT_KEYFRAME',), 'weights_override': ('CONTROL_NET_WEIGHTS',), 'model_optional': ('MODEL',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'MODEL')
    RETURN_NAMES = ('positive', 'negative', 'model_opt')
    FUNCTION = 'apply_controlnet'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝'

    def apply_controlnet(self, positive, negative, control_net, image, strength, start_percent, end_percent, mask_optional: Tensor=None, model_optional: ModelPatcher=None, timestep_kf: TimestepKeyframeGroup=None, latent_kf_override: LatentKeyframeGroup=None, weights_override: ControlWeights=None):
        if strength == 0:
            return (positive, negative, model_optional)
        if model_optional:
            model_optional = model_optional.clone()
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
                    c_net = convert_to_advanced(control_net.copy()).set_cond_hint(control_hint, strength, (start_percent, end_percent))
                    if is_advanced_controlnet(c_net):
                        c_net.disarm()
                        if c_net.require_model:
                            if not model_optional:
                                raise Exception(f"Type '{type(c_net).__name__}' requires model_optional input, but got None.")
                            c_net.patch_model(model=model_optional)
                        if timestep_kf is not None:
                            c_net.set_timestep_keyframes(timestep_kf)
                        if latent_kf_override is not None:
                            c_net.latent_keyframe_override = latent_kf_override
                        if weights_override is not None:
                            c_net.weights_override = weights_override
                        c_net.verify_all_weights()
                        if mask_optional is not None:
                            mask_optional = mask_optional.clone()
                            if len(mask_optional.shape) < 3:
                                mask_optional = mask_optional.unsqueeze(0)
                            c_net.set_cond_hint_mask(mask_optional)
                    c_net.set_previous_controlnet(prev_cnet)
                    cnets[prev_cnet] = c_net
                d['control'] = c_net
                d['control_apply_to_uncond'] = False
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1], model_optional)
```