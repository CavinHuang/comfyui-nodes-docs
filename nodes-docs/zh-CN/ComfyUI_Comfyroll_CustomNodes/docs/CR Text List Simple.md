# Documentation
- Class name: CR_TextListSimple
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextListSimple 节点旨在高效地管理和组合多个文本输入到一个单一的列表中。它适用于需要文本聚合的应用程序，例如准备批量处理的数据或生成组合文本输出。该节点以其简单性和灵活性而著称，允许轻松地将各种文本源集成到一个统一的结构中。

# Input types
## Optional
- text_1
    - 参数 'text_1' 是一个可选输入，允许用户向列表中贡献一行文本。它在聚合过程中起着重要作用，增强了节点处理多样化文本输入的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- text_2
    - 参数 'text_2' 是另一个可选输入，用于向列表中添加一行文本。在需要多个文本条目以形成全面数据集的场景中，它至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_3
    - 参数 'text_3' 用于在列表中包含另一行文本。它通过为用户提供更多的文本内容选项，为节点的整体功能做出贡献。
    - Comfy dtype: STRING
    - Python dtype: str
- text_4
    - 参数 'text_4' 允许在列表中包含另一行文本，进一步扩展了可以由节点整合的文本输入范围。
    - Comfy dtype: STRING
    - Python dtype: str
- text_5
    - 参数 'text_5' 是一个可选字段，用户可以向列表中添加另一行文本。它是节点设计的重要组成部分，以适应各种文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- text_list_simple
    - 参数 'text_list_simple' 是一个可选输入，允许包含一个预先存在的文本行列表。对于希望扩展或修改现有文本列表而不必从头开始的用户来说，这非常有用。
    - Comfy dtype: TEXT_LIST_SIMPLE
    - Python dtype: List[str]

# Output types
- TEXT_LIST_SIMPLE
    - 输出 'TEXT_LIST_SIMPLE' 是提供给节点的所有文本输入的合并列表。它代表了节点操作的主要结果，作为准备进一步处理或分析的聚合文本数据集。
    - Comfy dtype: TEXT_LIST_SIMPLE
    - Python dtype: List[str]
- show_help
    - 输出 'show_help' 提供了指向节点文档页面的 URL 链接，使用户能够直接访问有关有效使用节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextListSimple:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'text_1': ('STRING', {'multiline': False, 'default': ''}), 'text_2': ('STRING', {'multiline': False, 'default': ''}), 'text_3': ('STRING', {'multiline': False, 'default': ''}), 'text_4': ('STRING', {'multiline': False, 'default': ''}), 'text_5': ('STRING', {'multiline': False, 'default': ''}), 'text_list_simple': ('TEXT_LIST_SIMPLE',)}}
    RETURN_TYPES = ('TEXT_LIST_SIMPLE', 'STRING')
    RETURN_NAMES = ('TEXT_LIST_SIMPLE', 'show_help')
    FUNCTION = 'text_list_simple'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def text_list_simple(self, text_1, text_2, text_3, text_4, text_5, text_list_simple=None):
        texts = list()
        if text_list_simple is not None:
            texts.extend((l for l in text_list_simple))
        if text_1 != '' and text_1 != None:
            (texts.append(text_1),)
        if text_2 != '' and text_2 != None:
            texts.append(text_2)
        if text_3 != '' and text_3 != None:
            texts.append(text_3)
        if text_4 != '' and text_4 != None:
            (texts.append(text_4),)
        if text_5 != '' and text_5 != None:
            (texts.append(text_5),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-list-simple'
        return (texts, show_help)
```