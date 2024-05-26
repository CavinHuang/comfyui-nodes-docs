# Documentation
- Class name: CR_RandomMultilineColors
- Category: Comfyroll/Utils/Random
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomMultilineColors节点旨在生成一个包含随机颜色代码的多行字符串。它的目的是提供一组多样化的颜色代码，这些代码可以用于各种应用，如设计、可视化或任何需要随机颜色调色板的场景。节点的功能集中在基于指定的值类型创建不同格式的颜色代码，使其具有多功能性和适应性，以满足不同的需求。

# Input types
## Required
- seed
    - 种子参数对于确保随机颜色生成过程的可重复性至关重要。通过设置种子，用户可以在不同的运行中获得相同的一组随机颜色，这对于测试或需要一致结果时特别有用。
    - Comfy dtype: INT
    - Python dtype: int
- value_type
    - value_type参数决定了节点生成的颜色代码的格式。它允许用户指定他们是否希望颜色以十六进制格式、RGB格式，或者使用matplotlib xkcd颜色集中的颜色。这种灵活性迎合了广泛的用例和偏好。
    - Comfy dtype: COMBO['rgb', 'hex color', 'matplotlib xkcd']
    - Python dtype: str
- rows
    - rows参数决定了节点将生成的颜色代码行数。这允许用户控制生成的颜色代码的数量，可以根据应用程序或项目的具体要求进行调整。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- multiline_text
    - multiline_text输出包含生成的随机颜色代码字符串。每一行代表由value_type参数指定格式的单独颜色代码。这个输出很重要，因为它是节点操作的主要结果，为用户提供了所需的随机颜色调色板。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help输出提供了指向节点文档页面的URL链接。这对于需要额外信息或指导的用户来说特别有用，他们可能需要了解如何使用节点或解释其结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomMultilineColors:

    @classmethod
    def INPUT_TYPES(cls):
        types = ['rgb', 'hex color', 'matplotlib xkcd']
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'value_type': (types,), 'rows': ('INT', {'default': 5, 'min': 1, 'max': 2048})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('multiline_text', 'show_help')
    FUNCTION = 'generate'
    CATEGORY = icons.get('Comfyroll/Utils/Random')

    def generate(self, value_type, rows, seed):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-multiline-colors'
        random.seed(seed)
        xkcd_colors = mcolors.XKCD_COLORS
        if value_type == 'hex color':
            choice_str = '0123456789ABCDEF'
        if value_type == 'hex color':
            multiline_text = '\n'.join(['#' + ''.join((random.choice(choice_str) for _ in range(6))) for _ in range(rows)])
        elif value_type == 'rgb':
            multiline_text = '\n'.join([f'{random.randint(0, 255)},{random.randint(0, 255)},{random.randint(0, 255)}' for _ in range(rows)])
        elif value_type == 'matplotlib xkcd':
            multiline_text = '\n'.join([random.choice(list(xkcd_colors.keys())).replace('xkcd:', '') for _ in range(rows)])
        else:
            pass
        return (multiline_text, show_help)
```