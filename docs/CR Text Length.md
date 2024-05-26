# Documentation
- Class name: CR_TextLength
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextLength节点旨在测量给定文本字符串的长度。它作为文本处理工作流程中的基本工具，提供了一种直接的方法来确定输入文本中的字符数。此节点对于需要考虑文本长度的任务至关重要，例如数据清洗或格式化。

# Input types
## Required
- text
    - 'text'参数是将要确定长度的输入文本。这是一个关键元素，因为节点的操作完全依赖于这段文本的内容。节点处理这个输入以提供文本的长度，这对于各种文本分析或处理任务可能是必不可少的。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- INT
    - 'INT'输出代表了输入文本的长度，即文本字符串内的字符数。这个输出很重要，因为它直接反映了节点主要功能的结果，允许用户利用这些信息进行进一步的处理或在其应用程序中做出决策。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - 'show_help'输出提供了一个URL链接到节点的文档页面，以供进一步帮助。这个输出对于可能需要额外指导或有关节点功能信息的用户来说很有用，提供了直接访问节点wiki页面的参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextLength:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'multiline': False, 'default': '', 'forceInput': True})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    FUNCTION = 'len_text'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def len_text(self, text):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-length'
        int_out = len(text)
        return (int_out, show_help)
```