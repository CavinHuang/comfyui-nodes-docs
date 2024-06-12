# Documentation
- Class name: ReferenceControlFinetune
- Category: Adv-ControlNet 🛂🅐🅒🅝/Reference
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

ReferenceControlFinetune 是一个用于高级图像处理任务的控制网络微调节点。它利用注意力和自适应实例归一化机制，在风格迁移和内容适应中实现高保真度。该节点在增强生成过程的控制中起着关键作用，允许对最终输出进行精细调整。

# Input types
## Required
- attn_style_fidelity
    - attn_style_fidelity 参数控制应用风格转换时注意力机制的保真度。它对于平衡风格化效果和保留内容细节至关重要，从而影响整体的美学结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_ref_weight
    - attn_ref_weight 参数确定注意力机制中参考的权重，影响风格转换受参考内容指导的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_strength
    - attn_strength 参数调整注意力机制对风格化过程的影响强度，允许控制应用风格的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- adain_style_fidelity
    - adain_style_fidelity 参数在应用风格时决定自适应实例归一化保真度级别，这对于在应用风格的同时保持原始图像特征的完整性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- adain_ref_weight
    - adain_ref_weight 参数设置自适应实例归一化中的参考权重，影响参考风格应用于图像的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- adain_strength
    - adain_strength 参数定义自适应实例归一化效果的总体强度，允许微调风格如何融入图像。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- control_net
    - ReferenceControlFinetune 节点的输出是一个控制网络，它封装了微调后的参数和机制，用于高级风格控制和操作。它是后续图像生成任务的关键组件。
    - Comfy dtype: CONTROL_NET
    - Python dtype: comfy.controlnet.ControlBase

# Usage tips
- Infra type: GPU

# Source code
```
class ReferenceControlFinetune:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'attn_style_fidelity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'attn_ref_weight': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'attn_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'adain_style_fidelity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'adain_ref_weight': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'adain_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/Reference'

    def load_controlnet(self, attn_style_fidelity: float, attn_ref_weight: float, attn_strength: float, adain_style_fidelity: float, adain_ref_weight: float, adain_strength: float):
        ref_opts = ReferenceOptions(reference_type=ReferenceType.ATTN_ADAIN, attn_style_fidelity=attn_style_fidelity, attn_ref_weight=attn_ref_weight, attn_strength=attn_strength, adain_style_fidelity=adain_style_fidelity, adain_ref_weight=adain_ref_weight, adain_strength=adain_strength)
        controlnet = ReferenceAdvanced(ref_opts=ref_opts, timestep_keyframes=None)
        return (controlnet,)
```