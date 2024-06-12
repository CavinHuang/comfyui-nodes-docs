# Documentation
- Class name: WAS_Text_Load_From_File
- Category: WAS Suite/IO
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Load_From_File 节点旨在将指定文件路径中的文本数据加载到结构化格式中。它读取文件的内容，并将文本组织成列表，排除掉注释或空行。该节点还能够根据给定的字典名称重命名文件的标识符，允许更灵活的数据处理。

# Input types
## Required
- file_path
    - file_path 参数对节点的操作至关重要，因为它指定了要加载的文件的位置。节点读取此路径上的文件并处理其内容。缺少有效的文件路径将导致错误，节点将无法按预期工作。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- dictionary_name
    - dictionary_name 参数允许用户为文本文件的标识符分配一个自定义名称，这对于在应用程序内组织和引用数据非常有用。如果没有提供，节点将默认使用文件名作为标识符。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- joined_text
    - joined_text 输出是表示加载文件内容的连接字符串，已去除所有非必要行。这个输出很重要，因为它提供了一个干净、单一的字符串，可以很容易地进行处理或显示。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str
- dictionary
    - dictionary 输出是文件内容的结构化表示，其中文件的标识符是键，处理过的行列表是值。这个输出很重要，因为它以一种易于在应用程序中访问和操作的方式组织文本数据。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[str]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Load_From_File:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'file_path': ('STRING', {'default': '', 'multiline': False}), 'dictionary_name': ('STRING', {'default': '[filename]', 'multiline': False})}}
    RETURN_TYPES = (TEXT_TYPE, 'DICT')
    FUNCTION = 'load_file'
    CATEGORY = 'WAS Suite/IO'

    def load_file(self, file_path='', dictionary_name='[filename]]'):
        filename = os.path.basename(file_path).split('.', 1)[0] if '.' in os.path.basename(file_path) else os.path.basename(file_path)
        if dictionary_name != '[filename]':
            filename = dictionary_name
        if not os.path.exists(file_path):
            cstr(f'The path `{file_path}` specified cannot be found.').error.print()
            return ('', {filename: []})
        with open(file_path, 'r', encoding='utf-8', newline='\n') as file:
            text = file.read()
        update_history_text_files(file_path)
        import io
        lines = []
        for line in io.StringIO(text):
            if not line.strip().startswith('#'):
                if not line.strip().startswith('\n') or not line.strip().startswith('\r') or (not line.strip().startswith('\r\n')):
                    line = line.replace('\n', '').replace('\r', '').replace('\r\n', '')
                lines.append(line.replace('\n', '').replace('\r', '').replace('\r\n', ''))
        dictionary = {filename: lines}
        return ('\n'.join(lines), dictionary)
```