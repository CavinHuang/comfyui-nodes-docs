# Documentation
- Class name: CR_MultilineText
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_MultilineText节点旨在处理和操作文本数据，提供将文本从CSV格式转换、根据指定分隔符拆分字符串以及移除不需要的字符等功能。它在各种应用的文本预处理中扮演着关键角色，确保文本为下游任务正确格式化。

# Input types
## Required
- text
    - ‘text’参数是节点的主要输入，可以包含多行文本或CSV格式的数据。它对节点的操作至关重要，因为它决定了将被处理和转换的内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- convert_from_csv
    - ‘convert_from_csv’参数允许用户指定输入文本是否应被视为CSV数据。启用时，节点将根据CSV规则解析文本，这对于将表格数据转换为可用格式很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- csv_quote_char
    - ‘csv_quote_char’参数定义了在CSV数据中用于引用字段的字符，这在解析CSV文本以确保准确性以及处理包含逗号或换行符的字段时至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- remove_chars
    - ‘remove_chars’参数指示是否应从文本中移除某些字符。这对于清理文本并为其进一步分析或处理做准备很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- chars_to_remove
    - ‘chars_to_remove’参数指定在启用‘remove_chars’选项时需要从文本中移除的字符。它在自定义文本清理过程中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- split_string
    - ‘split_string’参数决定输入文本是否应根据分隔符拆分成单独的值。这个功能对于将复杂的字符串分解成可管理的部分至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- multiline_text
    - ‘multiline_text’输出包含应用所有转换后的文本。它代表了文本的最终状态，准备好用于后续操作。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - ‘show_help’输出提供了与节点相关联的文档或帮助页面的链接。它作为用户寻求有关如何使用节点的更多信息或帮助的快速参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_MultilineText:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'default': '', 'multiline': True}), 'convert_from_csv': ('BOOLEAN', {'default': False}), 'csv_quote_char': ('STRING', {'default': "'", 'choices': ["'", '"']}), 'remove_chars': ('BOOLEAN', {'default': False}), 'chars_to_remove': ('STRING', {'multiline': False, 'default': ''}), 'split_string': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('multiline_text', 'show_help')
    FUNCTION = 'text_multiline'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def text_multiline(self, text, chars_to_remove, split_string=False, remove_chars=False, convert_from_csv=False, csv_quote_char="'"):
        new_text = []
        text = text.rstrip(',')
        if convert_from_csv:
            csv_reader = csv.reader(io.StringIO(text), quotechar=csv_quote_char)
            for row in csv_reader:
                new_text.extend(row)
        if split_string:
            if text.startswith("'") and text.endswith("'"):
                text = text[1:-1]
                values = [value.strip() for value in text.split("', '")]
                new_text.extend(values)
            elif text.startswith('"') and text.endswith('"'):
                text = text[1:-1]
                values = [value.strip() for value in text.split('", "')]
                new_text.extend(values)
            elif ',' in text and text.count("'") % 2 == 0:
                text = text.replace("'", '')
                values = [value.strip() for value in text.split(',')]
                new_text.extend(values)
            elif ',' in text and text.count('"') % 2 == 0:
                text = text.replace('"', '')
                values = [value.strip() for value in text.split(',')]
                new_text.extend(values)
        if convert_from_csv == False and split_string == False:
            for line in io.StringIO(text):
                if not line.strip().startswith('#'):
                    if not line.strip().startswith('\n'):
                        line = line.replace('\n', '')
                    if remove_chars:
                        line = line.replace(chars_to_remove, '')
                    new_text.append(line)
        new_text = '\n'.join(new_text)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-multiline-text'
        return (new_text, show_help)
```