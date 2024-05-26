# Documentation
- Class name: WAS_Dictionary_To_Console
- Category: WAS Suite/Debug
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Dictionary_To_Console节点旨在通过将字典的内容输出到控制台来促进调试过程。它通过格式化打印增强了数据的可见性，使得更容易审查和分析字典的结构和值。

# Input types
## Required
- dictionary
    - 字典参数对于节点的操作至关重要，因为它是将被打印到控制台的数据结构。它是必需的，并在节点的功能中扮演中心角色，决定了用于调试目的显示的信息。
    - Comfy dtype: DICT
    - Python dtype: Dict[Any, Any]
## Optional
- label
    - 标签参数用于为输出提供描述性标题，增强控制台输出的可读性。虽然它不是必需的，但在同时调试多个字典输出时，它增加了清晰度。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- dictionary
    - 节点的输出是传入的原始字典。这允许在需要时进行进一步的处理或调试，确保数据在工作流中的后续操作中仍然可用。
    - Comfy dtype: DICT
    - Python dtype: Dict[Any, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dictionary_To_Console:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dictionary': ('DICT',), 'label': ('STRING', {'default': f'Dictionary Output', 'multiline': False})}}
    RETURN_TYPES = ('DICT',)
    OUTPUT_NODE = True
    FUNCTION = 'text_to_console'
    CATEGORY = 'WAS Suite/Debug'

    def text_to_console(self, dictionary, label):
        if label.strip() != '':
            print(f'\x1b[34mWAS Node Suite \x1b[33m{label}\x1b[0m:\n')
            from pprint import pprint
            pprint(dictionary, indent=4)
            print('')
        else:
            cstr(f'\x1b[33mText to Console\x1b[0m:\n')
            pprint(dictionary, indent=4)
            print('')
        return (dictionary,)
```