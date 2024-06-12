# Documentation
- Class name: CR_ApplyControlNet
- Category: ControlNet
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ApplyControlNet 节点旨在将控制网络集成到图像生成过程中，允许应用特定条件和调整以完善输出。它通过利用强度参数和开关机制，在增强生成图像的可控性和质量方面发挥关键作用。

# Input types
## Required
- conditioning
    - 条件参数对于定义图像生成的初始状态或上下文至关重要。它为控制网络的操作奠定了基础，并对最终输出的特征产生重大影响。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- control_net
    - 控制网络参数作为一个指导框架，指导如何根据提供的条件下生成图像。它是实现节点操作所需结果的关键组件。
    - Comfy dtype: CONTROL_NET
    - Python dtype: comfy.controlnet.ControlNet
- image
    - 图像输入是控制网络将处理的原始材料。它是节点功能的基础，因为它是在控制网络的影响下将被转换的实体。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- switch
    - 开关参数决定是否应用控制网络的影响。它作为启用或禁用节点核心功能的切换器，从而控制节点的行为。
    - Comfy dtype: COMBO[On, Off]
    - Python dtype: str
- strength
    - 强度参数调节控制网络对图像生成过程的影响强度。它允许微调控制网络的效果，以实现控制和创造力之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- CONDITIONING
    - 输出条件提供了应用控制网络后的转换状态或上下文，封装了进一步处理或分析的精细条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- show_help
    - show_help 输出提供了文档链接，以进一步协助和指导有效使用节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ApplyControlNet:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'control_net': ('CONTROL_NET',), 'image': ('IMAGE',), 'switch': (['On', 'Off'],), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING', 'STRING')
    RETURN_NAMES = ('CONDITIONING', 'show_help')
    FUNCTION = 'apply_controlnet'
    CATEGORY = icons.get('Comfyroll/ControlNet')

    def apply_controlnet(self, conditioning, control_net, image, switch, strength):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/ControlNet-Nodes#cr-apply-controlnet'
        if strength == 0 or switch == 'Off':
            return (conditioning, show_help)
        c = []
        control_hint = image.movedim(-1, 1)
        for t in conditioning:
            n = [t[0], t[1].copy()]
            c_net = control_net.copy().set_cond_hint(control_hint, strength)
            if 'control' in t[1]:
                c_net.set_previous_controlnet(t[1]['control'])
            n[1]['control'] = c_net
            c.append(n)
        return (c, show_help)
```