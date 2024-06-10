# Documentation
- Class name: CR_CycleImages
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CycleImages节点旨在循环遍历图像列表，提供一种机制以指定的帧间隔顺序显示图像。它特别适用于从图像集合中创建动画或幻灯片。该节点通过根据'loops'参数确定的次数迭代图像列表，并基于'current_frame'和'frame_interval'参数选择当前图像来操作。

# Input types
## Required
- mode
    - 模式参数决定了图像循环的顺序。目前仅支持'Sequential'模式，它确保图像按照它们在图像列表中出现的顺序显示。
    - Comfy dtype: STRING
    - Python dtype: str
- image_list
    - image_list 是要循环播放的图像集合。列表中的每个条目都应该是包含图像别名和图像对象本身的元组。
    - Comfy dtype: IMAGE_LIST
    - Python dtype: List[Tuple[str, Image.Image]]
## Optional
- frame_interval
    - frame_interval 参数指定每张图像显示之间的帧延迟。它对于控制动画或幻灯片的速度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - loops 参数决定了图像列表将被循环多少次。它允许控制动画或幻灯片的持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - current_frame 参数指示循环中的当前位置，用于确定在任何给定时刻显示哪张图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - IMAGE 输出提供了基于输入参数的当前循环图像。它是节点操作的视觉结果，是节点功能的核心。
    - Comfy dtype: IMAGE
    - Python dtype: Image.Image
- show_help
    - show_help 输出提供了一个链接到文档页面的URL，以获取关于节点使用的进一步帮助或详细信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CycleImages:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Sequential']
        return {'required': {'mode': (modes,), 'image_list': ('IMAGE_LIST',), 'frame_interval': ('INT', {'default': 30, 'min': 0, 'max': 999, 'step': 1}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'cycle'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def cycle(self, mode, image_list, frame_interval, loops, current_frame):
        image_params = list()
        if image_list:
            for _ in range(loops):
                image_params.extend(image_list)
        if mode == 'Sequential':
            current_image_index = current_frame // frame_interval % len(image_params)
            print(f'[Debug] CR Cycle Image:{current_image_index}')
            current_image_params = image_params[current_image_index]
            (image_alias, current_image_item) = current_image_params
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-images'
            return (current_image_item, show_help)
```