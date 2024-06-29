# Documentation
- Class name: WAS_Prompt_Multiple_Styles_Selector
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Prompt_Multiple_Styles_Selector 类的 `load_style` 方法旨在将多个风格提示集成到一个单一的、连贯的提示字符串中。它通过从预定义的风格文件中选择和组合特定于风格的提示来实现这一点，允许使用各种风格细微差别来定制文本生成过程。

# Input types
## Required
- style1
    - 参数 `style1` 对于从风格文件中指定要加载的第一个风格至关重要。它通过确定将包含的风格特征直接影响最终提示的构成。
    - Comfy dtype: str
    - Python dtype: str
- style2
    - 参数 `style2` 允许将第二种独特的风格包含在提示中。其选择有助于增加文本生成过程的多样性和丰富性。
    - Comfy dtype: str
    - Python dtype: str
- style3
    - 参数 `style3` 允许将第三种风格添加到提示中，进一步增强文本生成可用的风格选项。
    - Comfy dtype: str
    - Python dtype: str
- style4
    - 参数 `style4` 用于指定可以混合到提示中的第四种风格。它为文本生成输出提供额外的风格层次。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- positive_string
    - 输出参数 `positive_string` 表示编译后的提示，它将选定的风格组合成一个连贯且风格丰富的文本生成提示。
    - Comfy dtype: str
    - Python dtype: str
- negative_string
    - 输出参数 `negative_string` 捕获从选定风格派生的负面提示，这些提示可以用来细化和引导文本生成过程，使其远离不希望的属性。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Prompt_Multiple_Styles_Selector:

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
        return {'required': {'style1': (style_list,), 'style2': (style_list,), 'style3': (style_list,), 'style4': (style_list,)}}
    RETURN_TYPES = (TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ('positive_string', 'negative_string')
    FUNCTION = 'load_style'
    CATEGORY = 'WAS Suite/Text'

    def load_style(self, style1, style2, style3, style4):
        styles = {}
        if os.path.exists(STYLES_PATH):
            with open(STYLES_PATH, 'r') as data:
                styles = json.load(data)
        else:
            cstr(f'The styles file does not exist at `{STYLES_PATH}`. Unable to load styles! Have you imported your AUTOMATIC1111 WebUI styles?').error.print()
            return ('', '')
        selected_styles = [style1, style2, style3, style4]
        for style in selected_styles:
            if style not in styles:
                print(f"Style '{style}' was not found in the styles file.")
                return ('', '')
        prompt = ''
        negative_prompt = ''
        for style in selected_styles:
            prompt += styles[style]['prompt'] + ' '
            negative_prompt += styles[style]['negative_prompt'] + ' '
        return (prompt.strip(), negative_prompt.strip())
```