# Documentation
- Class name: WAS_Prompt_Styles_Selector
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Prompt_Styles_Selector 节点旨在管理和检索文本提示的风格。它在加载预定义风格方面起着关键作用，这些风格对于生成在上下文上相关且风格一致的文本输出至关重要。

# Input types
## Required
- style
    - ‘style’参数对于确定要加载哪种风格配置至关重要。它通过指定要从可用风格中应用到文本提示的特定风格，影响节点的操作。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- positive_string
    - ‘positive_string’输出提供了与所选风格相关联的正面提示，这对于引导文本生成过程朝着期望的方向至关重要。
    - Comfy dtype: str
    - Python dtype: str
- negative_string
    - ‘negative_string’输出提供了所选择风格对应的负面提示，用于通过阻止不希望出现的元素来完善文本生成。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Prompt_Styles_Selector:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        style_list = []
        if os.path.exists(STYLES_PATH):
            with open(STYLES_PATH, 'r') as f:
                if len(f.readlines()) != 0:
                    f.seek(0)
                    data = f.read()
                    styles = json.loads(data)
                    for style in styles.keys():
                        style_list.append(style)
        if not style_list:
            style_list.append('None')
        return {'required': {'style': (style_list,)}}
    RETURN_TYPES = (TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ('positive_string', 'negative_string')
    FUNCTION = 'load_style'
    CATEGORY = 'WAS Suite/Text'

    def load_style(self, style):
        styles = {}
        if os.path.exists(STYLES_PATH):
            with open(STYLES_PATH, 'r') as data:
                styles = json.load(data)
        else:
            cstr(f'The styles file does not exist at `{STYLES_PATH}`. Unable to load styles! Have you imported your AUTOMATIC1111 WebUI styles?').error.print()
        if styles and style != None or style != 'None':
            prompt = styles[style]['prompt']
            negative_prompt = styles[style]['negative_prompt']
        else:
            prompt = ''
            negative_prompt = ''
        return (prompt, negative_prompt)
```