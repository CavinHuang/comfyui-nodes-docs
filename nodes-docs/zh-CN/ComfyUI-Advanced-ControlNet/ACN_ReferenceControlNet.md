# Documentation
- Class name: ReferenceControlNetNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/Reference
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

ReferenceControlNetNode 类旨在管理控制网络的加载和应用，并带有参考选项。它封装了创建高级控制结构的逻辑，这些结构可用于引导生成模型的行为，基于用户定义的参考类型和风格保真度提供了一个灵活的接口来控制生成过程。

# Input types
## Required
- reference_type
    - 参考类型参数决定了要使用的控制网络类型，这对生成输出的风格和行为有显著影响。它对定义控制机制的方法及其对最终结果的影响至关重要。
    - Comfy dtype: str
    - Python dtype: str
- style_fidelity
    - 风格保真度参数调整对参考风格的遵循程度，影响输出的风格一致性。它在平衡创造性输出与所需的风格控制水平方面发挥着重要作用。
    - Comfy dtype: float
    - Python dtype: float
- ref_weight
    - ref_weight 参数设置控制网络中参考的权重，直接影响应用控制的强度。对于微调控制对生成过程的影响至关重要。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- CONTROL_NET
    - ReferenceControlNetNode 的输出是一个控制网络对象，它封装了高级控制逻辑。它对于通过应用指定的控制参数将生成模型引导到期望的结果具有重要意义。
    - Comfy dtype: ControlBase
    - Python dtype: comfy.controlnet.ControlBase

# Usage tips
- Infra type: CPU

# Source code
```
class ReferenceControlNetNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'reference_type': (ReferenceType._LIST,), 'style_fidelity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'ref_weight': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/Reference'

    def load_controlnet(self, reference_type: str, style_fidelity: float, ref_weight: float):
        ref_opts = ReferenceOptions.create_combo(reference_type=reference_type, style_fidelity=style_fidelity, ref_weight=ref_weight)
        controlnet = ReferenceAdvanced(ref_opts=ref_opts, timestep_keyframes=None)
        return (controlnet,)
```