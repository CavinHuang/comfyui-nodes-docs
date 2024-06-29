# Documentation
- Class name: WAS_Text_File_History
- Category: WAS Suite/History
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_File_History 节点旨在管理和检索历史文本文件数据。它提供从指定文件路径读取、处理其内容以及维护访问过的文本文件历史记录的功能。此节点对于需要跟踪和审查文本文档随时间演变的应用程序至关重要。

# Input types
## Required
- file
    - ‘file’参数非常关键，因为它指定了节点将从中读取数据的文本文件的路径。节点的操作严重依赖于该文件路径的有效性和可访问性。它直接影响节点处理和返回文本内容的能力。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- dictionary_name
    - ‘dictionary_name’参数允许用户为将包含文本文件内容的字典定义自定义名称。这对于需要为数据结构指定命名约定的应用程序特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - ‘text’输出参数代表处理后的文本文件内容。它是一个关键元素，因为它包含了节点读取并准备用于后续操作的实际数据。
    - Comfy dtype: STRING
    - Python dtype: str
- dictionary
    - ‘dictionary’输出参数是一个字典，它在指定的键下保存处理后的文本行，该键通常是文件名。它作为一种结构化的方式，在下游流程中访问和使用文本文件的内容。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[str]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_File_History:

    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)
        self.conf = getSuiteConfig()

    @classmethod
    def INPUT_TYPES(cls):
        HDB = WASDatabase(WAS_HISTORY_DATABASE)
        conf = getSuiteConfig()
        paths = ['No History']
        if HDB.catExists('History') and HDB.keyExists('History', 'TextFiles'):
            history_paths = HDB.get('History', 'TextFiles')
            if conf.__contains__('history_display_limit'):
                history_paths = history_paths[-conf['history_display_limit']:]
                paths = []
            for path_ in history_paths:
                paths.append(os.path.join('...' + os.sep + os.path.basename(os.path.dirname(path_)), os.path.basename(path_)))
        return {'required': {'file': (paths,), 'dictionary_name': ('STRING', {'default': '[filename]', 'multiline': True})}}
    RETURN_TYPES = (TEXT_TYPE, 'DICT')
    FUNCTION = 'text_file_history'
    CATEGORY = 'WAS Suite/History'

    def text_file_history(self, file=None, dictionary_name='[filename]]'):
        file_path = file.strip()
        filename = os.path.basename(file_path).split('.', 1)[0] if '.' in os.path.basename(file_path) else os.path.basename(file_path)
        if dictionary_name != '[filename]' or dictionary_name not in [' ', '']:
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
                if not line.strip().startswith('\n'):
                    line = line.replace('\n', '')
                lines.append(line.replace('\n', ''))
        dictionary = {filename: lines}
        return ('\n'.join(lines), dictionary)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```