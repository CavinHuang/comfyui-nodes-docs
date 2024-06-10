# Documentation
- Class name: CR_LoadTextList
- Category: List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadTextList节点旨在将文本数据从文件加载到列表格式中。它能够处理CSV和TXT文件扩展名，为进一步处理提供了一种多功能的方式来吸收文本信息。此节点在数据准备中扮演着关键角色，适用于需要文本输入的各种应用。

# Input types
## Required
- input_file_path
    - input_file_path参数指定了文本文件所在的目录。这对于节点成功定位和读取文件至关重要，因此影响节点的执行和加载的文本数据列表的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- file_name
    - file_name参数表示要加载的文本文件的名称，不包括其扩展名。它是识别给定目录中特定文件的关键组件，影响节点的操作和加载的文本数据。
    - Comfy dtype: STRING
    - Python dtype: str
- file_extension
    - file_extension参数指示要加载的文本文件类型，可以是'txt'或'csv'。这个选择决定了节点处理文件的方式，影响结果文本列表的结构和格式。
    - Comfy dtype: COMBO['txt', 'csv']
    - Python dtype: Literal['txt', 'csv']

# Output types
- list
    - list输出参数表示以字符串列表形式组织的加载的文本数据。每个元素对应文本文件中的一行，提供了一种直接的方式来访问和操作文本数据。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - show_help输出提供了一个文档URL，用于进一步的帮助。对于寻求有关节点使用和功能的更多信息的用户来说，这非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadTextList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_file_path': ('STRING', {'multiline': False, 'default': ''}), 'file_name': ('STRING', {'multiline': False, 'default': ''}), 'file_extension': (['txt', 'csv'],)}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'load_list'
    CATEGORY = icons.get('Comfyroll/List')

    def load_list(self, input_file_path, file_name, file_extension):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-load-value-list'
        filepath = input_file_path + '\\' + file_name + '.' + file_extension
        print(f'CR Load Values: Loading {filepath}')
        list = []
        if file_extension == 'csv':
            with open(filepath, 'r') as csv_file:
                for row in csv_file:
                    list.append(row)
        elif file_extension == 'txt':
            with open(filepath, 'r') as txt_file:
                for row in txt_file:
                    list.append(row)
        else:
            pass
        return (list, show_help)
```