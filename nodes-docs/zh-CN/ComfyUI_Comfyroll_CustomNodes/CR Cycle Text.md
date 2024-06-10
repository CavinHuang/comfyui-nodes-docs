# Documentation
- Class name: CR_CycleText
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CycleText节点旨在以指定的时间间隔循环遍历预定义的文本项列表，创建动画文本序列。它以连续模式运行，迭代文本列表以产生动态的文本显示。该节点特别适用于需要基于文本的动画的应用，例如演示或交互式显示。

# Input types
## Required
- mode
    - 模式参数决定了文本项的循环顺序。它对于确定文本动画的顺序和模式至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- text_list
    - text_list参数是节点将循环遍历的文本项列表。它是必需的，因为它定义了动画的内容。
    - Comfy dtype: TEXT_LIST
    - Python dtype: List[str]
## Optional
- frame_interval
    - frame_interval参数指定动画中每次文本更改之间的时间间隔。它影响文本循环的速度。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - loops参数确定将循环遍历文本列表的次数。它控制动画序列的持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - current_frame参数表示文本动画中的当前位置。它用于跟踪动画的进度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- STRING
    - STRING输出提供了正在循环的文本列表中的当前文本项。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help输出提供了一个链接到文档，以获取关于节点操作的进一步帮助或详细信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CycleText:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Sequential']
        return {'required': {'mode': (modes,), 'text_list': ('TEXT_LIST',), 'frame_interval': ('INT', {'default': 30, 'min': 0, 'max': 999, 'step': 1}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'cycle_text'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def cycle_text(self, mode, text_list, frame_interval, loops, current_frame):
        text_params = list()
        if text_list:
            for _ in range(loops):
                text_params.extend(text_list)
        if mode == 'Sequential':
            current_text_index = current_frame // frame_interval % len(text_params)
            current_text_params = text_params[current_text_index]
            print(f'[Debug] CR Cycle Text:{current_text_params}')
            (text_alias, current_text_item) = current_text_params
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-text'
            return (current_text_item, show_help)
```