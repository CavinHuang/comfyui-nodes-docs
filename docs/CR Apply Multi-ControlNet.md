# Documentation
- Class name: CR_ApplyControlNetStack
- Category: Comfyroll/ControlNet
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ApplyControlNetStack节点旨在将一系列ControlNet应用于一对基础图像，增强生成过程的控制。它根据用户定义的参数管理多个ControlNet的集成，确保对最终输出进行细粒度控制。

# Input types
## Required
- base_positive
    - base_positive参数是一个关键输入，代表正面条件图像。它被用作参考，以指导ControlNet的应用，显著影响生成输出的方向和质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- base_negative
    - base_negative参数作为负面条件图像，通过与base_positive图像形成对比，帮助细化生成过程。它在引导输出远离不希望的特征方面起着至关重要的作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- switch
    - switch参数是一个开关，决定是否激活ControlNet堆栈应用。它对于启用或禁用ControlNet对生成过程的影响至关重要。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
## Optional
- controlnet_stack
    - controlnet_stack参数是一个可选输入，一旦提供，允许将预定义的ControlNet集合应用于基础图像。堆栈中的每个ControlNet都有助于整体条件化，增强了生成的特异性和精确度。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: List[Tuple[str, torch.Tensor, float, float, float]]

# Output types
- base_pos
    - base_pos输出是在应用ControlNet堆栈后修改的正面条件图像。它包含了所有应用的ControlNet的集体效应，代表了生成过程的精细指南。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- base_neg
    - base_neg输出对应于在应用ControlNet堆栈期间修改的负面条件图像。它在塑造最终输出方面起着工具性作用，通过引导它避免不希望的特性。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了一个URL，链接到CR_ApplyControlNetStack节点的文档，以获得更多帮助和使用指导。对于寻求有关节点功能和用法的更多信息的用户来说，这是一个有用的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class CR_ApplyControlNetStack:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_positive': ('CONDITIONING',), 'base_negative': ('CONDITIONING',), 'switch': (['Off', 'On'],), 'controlnet_stack': ('CONTROL_NET_STACK',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'STRING')
    RETURN_NAMES = ('base_pos', 'base_neg', 'show_help')
    FUNCTION = 'apply_controlnet_stack'
    CATEGORY = icons.get('Comfyroll/ControlNet')

    def apply_controlnet_stack(self, base_positive, base_negative, switch, controlnet_stack=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/ControlNet-Nodes#cr-apply-multi-controlnet-stack'
        if switch == 'Off':
            return (base_positive, base_negative, show_help)
        if controlnet_stack is not None:
            for controlnet_tuple in controlnet_stack:
                (controlnet_name, image, strength, start_percent, end_percent) = controlnet_tuple
                if type(controlnet_name) == str:
                    controlnet_path = folder_paths.get_full_path('controlnet', controlnet_name)
                    controlnet = comfy.sd.load_controlnet(controlnet_path)
                else:
                    controlnet = controlnet_name
                controlnet_conditioning = ControlNetApplyAdvanced().apply_controlnet(base_positive, base_negative, controlnet, image, strength, start_percent, end_percent)
                (base_positive, base_negative) = (controlnet_conditioning[0], controlnet_conditioning[1])
        return (base_positive, base_negative, show_help)
```