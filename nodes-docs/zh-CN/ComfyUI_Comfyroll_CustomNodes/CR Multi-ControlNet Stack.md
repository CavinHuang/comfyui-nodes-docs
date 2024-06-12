# Documentation
- Class name: CR_ControlNetStack
- Category: Comfyroll/ControlNet
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ControlNetStack 是一个用于管理和应用多个 ControlNet 配置的节点，以顺序方式进行。它允许用户切换各个 ControlNet 的开关，调整它们的影响力度，并定义它们应该应用的范围。这个节点对于微调图像生成过程的控制和方向至关重要，确保了高度的定制化和精确度。

# Input types
## Optional
- switch_1
    - 开关参数决定第一个 ControlNet 是否在栈中激活。它在控制节点内控制信号流中起着关键作用，可以启用或禁用特定的影响层。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- controlnet_1
    - controlnet_1 参数指定了栈中要使用的第一个 ControlNet。它对于定义要应用的控制类型至关重要，并且对图像生成过程的结果有显著影响。
    - Comfy dtype: COMBO[<list of controlnet filenames>]
    - Python dtype: str
- controlnet_strength_1
    - controlnet_strength_1 参数调整第一个 ControlNet 影响的强度。它是微调节点内不同控制层之间平衡的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent_1
    - start_percent_1 参数定义了图像生成过程中第一个 ControlNet 开始生效的起始百分比。它对于控制控制信号的空间分布很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent_1
    - end_percent_1 参数标志着图像生成过程中第一个 ControlNet 影响结束的百分比。它对于确定控制应用的范围至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- image_1
    - image_1 参数代表与第一个 ControlNet 相关联的图像。它对于为控制机制提供视觉上下文和指导至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- CONTROLNET_STACK
    - CONTROLNET_STACK 输出包含已编译的激活 ControlNets 列表及其各自的设置，准备应用于图像生成过程。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: List[Tuple[comfy.controlnet.ControlNet, PIL.Image, float, float, float]]
- show_help
    - show_help 输出提供了一个 URL 到文档，以获取有关使用 CR_ControlNetStack 节点的进一步指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ControlNetStack:
    controlnets = ['None'] + folder_paths.get_filename_list('controlnet')

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'switch_1': (['Off', 'On'],), 'controlnet_1': (cls.controlnets,), 'controlnet_strength_1': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'start_percent_1': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent_1': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'switch_2': (['Off', 'On'],), 'controlnet_2': (cls.controlnets,), 'controlnet_strength_2': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'start_percent_2': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent_2': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'switch_3': (['Off', 'On'],), 'controlnet_3': (cls.controlnets,), 'controlnet_strength_3': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'start_percent_3': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent_3': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'image_1': ('IMAGE',), 'image_2': ('IMAGE',), 'image_3': ('IMAGE',), 'controlnet_stack': ('CONTROL_NET_STACK',)}}
    RETURN_TYPES = ('CONTROL_NET_STACK', 'STRING')
    RETURN_NAMES = ('CONTROLNET_STACK', 'show_help')
    FUNCTION = 'controlnet_stacker'
    CATEGORY = icons.get('Comfyroll/ControlNet')

    def controlnet_stacker(self, switch_1, controlnet_1, controlnet_strength_1, start_percent_1, end_percent_1, switch_2, controlnet_2, controlnet_strength_2, start_percent_2, end_percent_2, switch_3, controlnet_3, controlnet_strength_3, start_percent_3, end_percent_3, image_1=None, image_2=None, image_3=None, controlnet_stack=None):
        controlnet_list = []
        if controlnet_stack is not None:
            controlnet_list.extend([l for l in controlnet_stack if l[0] != 'None'])
        if controlnet_1 != 'None' and switch_1 == 'On' and (image_1 is not None):
            controlnet_path = folder_paths.get_full_path('controlnet', controlnet_1)
            controlnet_1 = comfy.controlnet.load_controlnet(controlnet_path)
            (controlnet_list.extend([(controlnet_1, image_1, controlnet_strength_1, start_percent_1, end_percent_1)]),)
        if controlnet_2 != 'None' and switch_2 == 'On' and (image_2 is not None):
            controlnet_path = folder_paths.get_full_path('controlnet', controlnet_2)
            controlnet_2 = comfy.controlnet.load_controlnet(controlnet_path)
            (controlnet_list.extend([(controlnet_2, image_2, controlnet_strength_2, start_percent_2, end_percent_2)]),)
        if controlnet_3 != 'None' and switch_3 == 'On' and (image_3 is not None):
            controlnet_path = folder_paths.get_full_path('controlnet', controlnet_3)
            controlnet_3 = comfy.controlnet.load_controlnet(controlnet_path)
            (controlnet_list.extend([(controlnet_3, image_3, controlnet_strength_3, start_percent_3, end_percent_3)]),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/ControlNet-Nodes#cr-multi-controlnet-stack'
        return (controlnet_list, show_help)
```