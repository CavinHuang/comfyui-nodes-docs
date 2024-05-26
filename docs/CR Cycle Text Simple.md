# Documentation
- Class name: CR_CycleTextSimple
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CycleTextSimple 是一个设计用于顺序循环文本字符串列表的节点。它能够处理多个文本输入，并根据指定的帧间隔和循环次数进行循环。这个节点特别适用于在 Comfy UI 环境中创建动态文本动画。

# Input types
## Required
- mode
    - 模式参数决定了文本字符串的循环顺序。它对于定义文本动画的顺序和模式至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- frame_interval
    - 帧间隔决定了文本字符串循环的速率，影响动画的速度。
    - Comfy dtype: int
    - Python dtype: int
- loops
    - 循环次数参数指定了文本字符串将循环的次数，影响动画的持续时间。
    - Comfy dtype: int
    - Python dtype: int
- current_frame
    - 当前帧指示动画序列中的当前位置，用于确定显示哪个文本字符串。
    - Comfy dtype: int
    - Python dtype: int
## Optional
- text_1
    - Text_1 是列表中第一个文本字符串的可选输入。它为循环提供了多样化的文本内容。
    - Comfy dtype: str
    - Python dtype: str
- text_list_simple
    - Text_list_simple 是一个可选参数，它允许简化输入多个文本字符串，简化了添加文本内容的过程。
    - Comfy dtype: TEXT_LIST_SIMPLE
    - Python dtype: List[str]

# Output types
- current_text_item
    - 当前文本项代表当前正在显示的文本字符串，作为文本循环动画的一部分。
    - Comfy dtype: str
    - Python dtype: str
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以获取有关节点使用的进一步帮助和信息。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CycleTextSimple:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Sequential']
        return {'required': {'mode': (modes,), 'frame_interval': ('INT', {'default': 30, 'min': 0, 'max': 999, 'step': 1}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}, 'optional': {'text_1': ('STRING', {'multiline': False, 'default': ''}), 'text_2': ('STRING', {'multiline': False, 'default': ''}), 'text_3': ('STRING', {'multiline': False, 'default': ''}), 'text_4': ('STRING', {'multiline': False, 'default': ''}), 'text_5': ('STRING', {'multiline': False, 'default': ''}), 'text_list_simple': ('TEXT_LIST_SIMPLE',)}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'cycle_text'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def cycle_text(self, mode, frame_interval, loops, current_frame, text_1, text_2, text_3, text_4, text_5, text_list_simple=None):
        text_params = list()
        text_list = list()
        if text_1 != '':
            text_list.append(text_1)
        if text_2 != '':
            text_list.append(text_2)
        if text_3 != '':
            text_list.append(text_3)
        if text_4 != '':
            text_list.append(text_4)
        if text_5 != '':
            text_list.append(text_5)
        for _ in range(loops):
            if text_list_simple:
                text_params.extend(text_list_simple)
            text_params.extend(text_list)
        if mode == 'Sequential':
            current_text_index = current_frame // frame_interval % len(text_params)
            current_text_item = text_params[current_text_index]
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-text-simple'
            return (current_text_item, show_help)
```