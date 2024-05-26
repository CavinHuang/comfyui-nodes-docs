# Documentation
- Class name: WAS_Text_to_Console
- Category: WAS Suite/Debug
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_to_Console节点旨在将文本输出到控制台，并可选择性地进行标签格式化。它通过为文本应用颜色和样式来增强控制台输出，以提高可见性和区分度。

# Input types
## Required
- text
    - ‘text’参数对于节点的操作至关重要，因为它定义了将被打印到控制台的内容。它在节点的执行中起着关键作用，决定了显示的信息。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- label
    - 'label'参数用于在文本输出前加上自定义标签。虽然不是必需的，但它对于分类或突出显示控制台输出以提高可读性和组织性可能很有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output
    - 'output'参数代表已格式化并打印到控制台的文本。它标志着节点操作的最终结果，封装了样式化文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_to_Console:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'label': ('STRING', {'default': f'Text Output', 'multiline': False})}}
    RETURN_TYPES = (TEXT_TYPE,)
    OUTPUT_NODE = True
    FUNCTION = 'text_to_console'
    CATEGORY = 'WAS Suite/Debug'

    def text_to_console(self, text, label):
        if label.strip() != '':
            cstr(f'\x1b[33m{label}\x1b[0m:\n{text}\n').msg.print()
        else:
            cstr(f'\x1b[33mText to Console\x1b[0m:\n{text}\n').msg.print()
        return (text,)
```