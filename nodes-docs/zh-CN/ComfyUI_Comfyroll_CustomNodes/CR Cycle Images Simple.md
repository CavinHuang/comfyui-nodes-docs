# Documentation
- Class name: CR_CycleImagesSimple
- Category: Animation
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CycleImagesSimple 节点旨在通过顺序或随机方式循环遍历图像列表，创建动画效果。它允许指定帧间隔、循环次数和当前帧来控制动画序列。该节点特别适用于从一组图像生成动态视觉内容。

# Input types
## Required
- mode
    - 模式参数确定图像循环的顺序。它可以设置为'Sequential'以特定顺序循环图像，或者在未来更新中支持随机模式。此设置直接影响动画序列和用户体验。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- frame_interval
    - frame_interval 参数指定动画中每次图像变化之间的帧数。它影响图像循环的速度，对于正确控制动画节奏至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - loops 参数设置动画重复的次数。它对于定义动画序列的持续时间很重要，并且可以用来创建连续或有限的动画。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - current_frame 参数指示动画的起始点。它对于将动画与其它元素同步或为设置动画序列的特定点以开始至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image_1
    - image_1 参数是可以在动画循环中包含的第一张图像。它很重要，因为它有助于丰富动画序列的内容和多样性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- image_list_simple
    - image_list_simple 参数是可以在动画循环中包含的图像列表。它在向序列中添加多个图像时提供了灵活性，并增强了整体动画效果。
    - Comfy dtype: IMAGE_LIST_SIMPLE
    - Python dtype: List[PIL.Image.Image]

# Output types
- IMAGE
    - IMAGE 输出提供了动画循环中的当前图像。它是节点操作的主要视觉结果，对于显示动画至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- show_help
    - show_help 输出提供了文档的URL，以获取有关节点功能的进一步帮助和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CycleImagesSimple:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Sequential']
        return {'required': {'mode': (modes,), 'frame_interval': ('INT', {'default': 30, 'min': 0, 'max': 999, 'step': 1}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}, 'optional': {'image_1': ('IMAGE',), 'image_2': ('IMAGE',), 'image_3': ('IMAGE',), 'image_4': ('IMAGE',), 'image_5': ('IMAGE',), 'image_list_simple': ('IMAGE_LIST_SIMPLE',)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'cycle_image'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def cycle_image(self, mode, frame_interval, loops, current_frame, image_1=None, image_2=None, image_3=None, image_4=None, image_5=None, image_list_simple=None):
        image_params = list()
        image_list = list()
        if image_1 != None:
            (image_list.append(image_1),)
        if image_2 != None:
            (image_list.append(image_2),)
        if image_3 != None:
            (image_list.append(image_3),)
        if image_4 != None:
            (image_list.append(image_4),)
        if image_5 != None:
            (image_list.append(image_5),)
        for _ in range(loops):
            if image_list_simple:
                image_params.extend(image_list_simple)
            image_params.extend(image_list)
        if mode == 'Sequential':
            current_image_index = current_frame // frame_interval % len(image_params)
            print(f'[Debug] CR Cycle Text:{current_image_index}')
            current_image_item = image_params[current_image_index]
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-images-simple'
            return (current_image_item, show_help)
```