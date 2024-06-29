# Documentation
- Class name: CR_PromptList
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_PromptList 节点旨在处理和操作列表形式的文本数据。它接受多行文本输入，并允许用户在每行文本前后添加文本，并通过指定起始索引和最大行数来选择列表中的行范围。该节点的功能主要集中在从输入文本创建提示列表和正文文本列表，这些列表可以用于各种目的，如为 AI 模型生成提示或组织文本数据。

# Input types
## Required
- multiline_text
    - multiline_text 参数是节点的主要输入，包含将被拆分为列表的文本。它支持多行输入，允许处理复杂和详细的文本数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prepend_text
    - prepend_text 参数允许用户指定一个字符串，该字符串将被添加到输出列表中每行的开头。这可以用来自定义列表的格式或向文本添加上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- append_text
    - append_text 参数使用户能够在输出列表中每行的末尾添加一个字符串，这对于扩展文本或添加额外信息非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- start_index
    - start_index 参数确定列表中节点将从中开始选择行的位置。它提供了对将被处理的列表子集的控制。
    - Comfy dtype: INT
    - Python dtype: int
- max_rows
    - max_rows 参数设置将包含在输出列表中的行的最大数量。它有助于限制列表的大小和管理正在处理的数据量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- prompt
    - prompt 输出是一个字符串列表，其中每个字符串由前置文本、输入多行文本中的一行和后置文本组成。这可以用于为 AI 应用程序创建提示。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- body_text
    - body_text 输出是一个字符串列表，代表从输入多行文本中选择的行。它作为进一步处理或分析的主要内容。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - show_help 输出提供了一个指向与节点功能相关的文档或帮助页面的 URL 链接。这对于寻求有关如何使用节点的更多信息的用户非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_PromptList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prepend_text': ('STRING', {'multiline': False, 'default': ''}), 'multiline_text': ('STRING', {'multiline': True, 'default': 'body_text'}), 'append_text': ('STRING', {'multiline': False, 'default': ''}), 'start_index': ('INT', {'default': 0, 'min': 0, 'max': 9999}), 'max_rows': ('INT', {'default': 1000, 'min': 1, 'max': 9999})}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('prompt', 'body_text', 'show_help')
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = 'make_list'
    CATEGORY = icons.get('Comfyroll/List')

    def make_list(self, multiline_text, prepend_text='', append_text='', start_index=0, max_rows=9999):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-prompt-list'
        lines = multiline_text.split('\n')
        start_index = max(0, min(start_index, len(lines) - 1))
        end_index = min(start_index + max_rows, len(lines))
        selected_rows = lines[start_index:end_index]
        prompt_list_out = [prepend_text + line + append_text for line in selected_rows]
        body_list_out = selected_rows
        return (prompt_list_out, body_list_out, show_help)
```