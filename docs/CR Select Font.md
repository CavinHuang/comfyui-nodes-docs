# Documentation
- Class name: CR_SelectFont
- Category: Comfyroll/Graphics/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SelectFont 节点旨在允许用户从预定义的可用 TrueType 字体列表中选择字体。它在设置文本渲染中的字体方面起着至关重要的作用。此节点通过为用户选择所需的字体提供直接的接口，抽象化了字体管理的复杂性，确保了不同操作系统之间的兼容性和易用性。

# Input types
## Required
- font_name
    - ‘font_name’ 参数对于指定用户希望用于文本渲染的确切字体至关重要。它直接影响渲染文本的视觉输出和风格，是实现所需审美和可读性的关键选择。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- font_name
    - ‘font_name’ 输出参数表示将在后续文本渲染过程中使用的选定字体。它标志着成功选择了一种字体，对于整个工作流程中文本样式的连续性和一致性至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - ‘show_help’ 输出提供了一个文档的 URL 链接，以供进一步的帮助。对于需要额外指导如何使用选定字体或更多了解字体选择过程的用户来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SelectFont:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        if platform.system() == 'Windows':
            system_root = os.environ.get('SystemRoot')
            font_dir = os.path.join(system_root, 'Fonts') if system_root else None
        elif platform.system() == 'Linux':
            font_dir = '/usr/share/fonts/truetype'
        elif platform.system() == 'Darwin':
            font_dir = '/System/Library/Fonts'
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'font_name': (file_list,)}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('font_name', 'show_help')
    FUNCTION = 'select_font'
    CATEGORY = icons.get('Comfyroll/Graphics/Text')

    def select_font(self, font_name):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-select-font'
        return (font_name, show_help)
```