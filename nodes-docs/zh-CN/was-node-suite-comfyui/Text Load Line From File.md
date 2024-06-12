# Documentation
- Class name: WAS_Text_Load_Line_From_File
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Load_Line_From_File节点旨在从指定文件中读取和处理文本行。它能够处理单个或多行文本，并提供按索引加载文本或基于计数器自动加载的功能。该节点还维护了访问过的文本文件的历史记录，方便检索先前加载的文本数据。

# Input types
## Required
- file_path
    - file_path参数指定了要读取的文本文件的位置。这是一个关键参数，因为节点的操作取决于成功访问此路径上的文件。文件路径中的任何错误都将阻止节点执行其预期功能。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- dictionary_name
    - dictionary_name参数定义了加载的文本行将在结果字典中存储的键。它允许用户标记文本数据，以便在应用程序的上下文中更容易引用和组织。
    - Comfy dtype: STRING
    - Python dtype: str
- label
    - label参数用于在应用程序中识别和管理不同的文本批次。它有助于跟踪和组织系统中的文本数据流，特别是涉及多个文本源时。
    - Comfy dtype: STRING
    - Python dtype: str
- mode
    - mode参数确定节点从文本文件中检索行的方法。它可以设置为'automatic'以进行顺序访问，或设置为'index'以根据其在文件中的位置加载特定行。
    - Comfy dtype: COMBO[automatic, index]
    - Python dtype: str
- index
    - 当mode设置为'index'时，index参数适用。它指定要从文本文件中加载的行的基于零的位置。这允许直接访问文件中的特定行。
    - Comfy dtype: INT
    - Python dtype: int
- multiline_text
    - multiline_text参数提供了一种向节点提供文本的替代方式。节点将直接通过此参数处理提供的文本，而不是从文件中读取。这对于动态或内联文本处理场景特别有用。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Output types
- line_text
    - line_text输出包含根据指定的模式和索引从文件中检索到的实际文本行。这是节点处理的文本数据的主要输出。
    - Comfy dtype: STRING
    - Python dtype: str
- dictionary
    - dictionary输出是由dictionary_name参数索引的文本行集合。它作为在应用程序内访问和使用文本数据的结构化方式。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[str]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Load_Line_From_File:

    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'file_path': ('STRING', {'default': '', 'multiline': False}), 'dictionary_name': ('STRING', {'default': '[filename]', 'multiline': False}), 'label': ('STRING', {'default': 'TextBatch', 'multiline': False}), 'mode': (['automatic', 'index'],), 'index': ('INT', {'default': 0, 'min': 0, 'step': 1})}, 'optional': {'multiline_text': (TEXT_TYPE, {'forceInput': True})}}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        if kwargs['mode'] != 'index':
            return float('NaN')
        else:
            m = hashlib.sha256()
            if os.path.exists(kwargs['file_path']):
                with open(kwargs['file_path'], 'rb') as f:
                    m.update(f.read())
                return m.digest().hex()
            else:
                return False
    RETURN_TYPES = (TEXT_TYPE, 'DICT')
    RETURN_NAMES = ('line_text', 'dictionary')
    FUNCTION = 'load_file'
    CATEGORY = 'WAS Suite/Text'

    def load_file(self, file_path='', dictionary_name='[filename]', label='TextBatch', mode='automatic', index=0, multiline_text=None):
        if multiline_text is not None:
            lines = multiline_text.strip().split('\n')
            if mode == 'index':
                if index < 0 or index >= len(lines):
                    cstr(f'Invalid line index `{index}`').error.print()
                    return ('', {dictionary_name: []})
                line = lines[index]
            else:
                line_index = self.HDB.get('TextBatch Counters', label)
                if line_index is None:
                    line_index = 0
                line = lines[line_index % len(lines)]
                self.HDB.insert('TextBatch Counters', label, line_index + 1)
            return (line, {dictionary_name: lines})
        if file_path == '':
            cstr('No file path specified.').error.print()
            return ('', {dictionary_name: []})
        if not os.path.exists(file_path):
            cstr(f'The path `{file_path}` specified cannot be found.').error.print()
            return ('', {dictionary_name: []})
        file_list = self.TextFileLoader(file_path, label)
        (line, lines) = (None, [])
        if mode == 'automatic':
            (line, lines) = file_list.get_next_line()
        elif mode == 'index':
            if index >= len(file_list.lines):
                index = index % len(file_list.lines)
            (line, lines) = file_list.get_line_by_index(index)
        if line is None:
            cstr('No valid line was found. The file may be empty or all lines have been read.').error.print()
            return ('', {dictionary_name: []})
        file_list.store_index()
        update_history_text_files(file_path)
        return (line, {dictionary_name: lines})

    class TextFileLoader:

        def __init__(self, file_path, label):
            self.WDB = WDB
            self.file_path = file_path
            self.lines = []
            self.index = 0
            self.load_file(file_path, label)

        def load_file(self, file_path, label):
            stored_file_path = self.WDB.get('TextBatch Paths', label)
            stored_index = self.WDB.get('TextBatch Counters', label)
            if stored_file_path != file_path:
                self.index = 0
                self.WDB.insert('TextBatch Counters', label, 0)
                self.WDB.insert('TextBatch Paths', label, file_path)
            else:
                self.index = stored_index
            with open(file_path, 'r', encoding='utf-8', newline='\n') as file:
                self.lines = [line.strip() for line in file]

        def get_line_index(self):
            return self.index

        def set_line_index(self, index):
            self.index = index
            self.WDB.insert('TextBatch Counters', 'TextBatch', self.index)

        def get_next_line(self):
            if self.index >= len(self.lines):
                self.index = 0
            line = self.lines[self.index]
            self.index += 1
            if self.index == len(self.lines):
                self.index = 0
            cstr(f'{cstr.color.YELLOW}TextBatch{cstr.color.END} Index: {self.index}').msg.print()
            return (line, self.lines)

        def get_line_by_index(self, index):
            if index < 0 or index >= len(self.lines):
                cstr(f'Invalid line index `{index}`').error.print()
                return (None, [])
            self.index = index
            line = self.lines[self.index]
            cstr(f'{cstr.color.YELLOW}TextBatch{cstr.color.END} Index: {self.index}').msg.print()
            return (line, self.lines)

        def store_index(self):
            self.WDB.insert('TextBatch Counters', 'TextBatch', self.index)
```