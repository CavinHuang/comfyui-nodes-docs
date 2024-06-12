---
tags:
- Text
---

# Text Load Line From File
## Documentation
- Class name: `Text Load Line From File`
- Category: `WAS Suite/Text`
- Output node: `False`

This node is designed to load a specific line or the next line from a text file based on the provided mode. It supports automatic sequential reading, reading by index, and handling multiline text inputs. The node integrates with a database for tracking read positions and file paths, facilitating efficient text batch processing.
## Input types
### Required
- **`file_path`**
    - Specifies the path to the text file from which a line will be loaded. It's essential for locating and accessing the file's content. The path influences which file is accessed for reading, directly affecting the text that is loaded and processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`dictionary_name`**
    - Defines the name of the dictionary key under which the loaded lines will be stored. This can be customized or set to the default, which is the filename. The choice of dictionary name impacts how the loaded text is referenced and utilized in subsequent operations, allowing for organized storage and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`label`**
    - A label used for tracking the reading position in the file across multiple invocations, enabling sequential reading in 'automatic' mode. This label is crucial for maintaining continuity in text processing, ensuring that each invocation reads from the correct position in the file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mode`**
    - Determines the method of line selection: 'automatic' for sequential reading, 'index' for specific line access, or handling 'multiline_text' directly. The mode selection dictates how the text is accessed and loaded, influencing the node's behavior and the outcome of the text loading process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`index`**
    - When mode is set to 'index', this specifies the exact line number to be read from the file. This parameter is key in pinpointing a specific line for retrieval, directly determining which line of text is loaded when the 'index' mode is chosen.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`multiline_text`**
    - Allows direct input of text content, bypassing file reading, and supports line selection based on the mode and index. This input provides an alternative way to supply text, offering flexibility in handling text data without relying on file access. It affects the node's execution by enabling direct manipulation of text content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`line_text`**
    - Comfy dtype: `STRING`
    - The specific line of text loaded from the file or the multiline text input, based on the selection mode.
    - Python dtype: `str`
- **`dictionary`**
    - Comfy dtype: `DICT`
    - A dictionary containing the loaded lines under a specified key, useful for further processing or analysis.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Load_Line_From_File:
    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_path": ("STRING", {"default": '', "multiline": False}),
                "dictionary_name": ("STRING", {"default": '[filename]', "multiline": False}),
                "label": ("STRING", {"default": 'TextBatch', "multiline": False}),
                "mode": (["automatic", "index"],),
                "index": ("INT", {"default": 0, "min": 0, "step": 1}),
            },
            "optional": {
                "multiline_text": (TEXT_TYPE, {"forceInput": True}),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        if kwargs['mode'] != 'index':
            return float("NaN")
        else:
            m = hashlib.sha256()
            if os.path.exists(kwargs['file_path']):
                with open(kwargs['file_path'], 'rb') as f:
                    m.update(f.read())
                return m.digest().hex()
            else:
                return False

    RETURN_TYPES = (TEXT_TYPE, "DICT")
    RETURN_NAMES = ("line_text", "dictionary")
    FUNCTION = "load_file"

    CATEGORY = "WAS Suite/Text"

    def load_file(self, file_path='', dictionary_name='[filename]', label='TextBatch',
                  mode='automatic', index=0, multiline_text=None):
        if multiline_text is not None:
            lines = multiline_text.strip().split('\n')
            if mode == 'index':
                if index < 0 or index >= len(lines):
                    cstr(f"Invalid line index `{index}`").error.print()
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
            cstr("No file path specified.").error.print()
            return ('', {dictionary_name: []})

        if not os.path.exists(file_path):
            cstr(f"The path `{file_path}` specified cannot be found.").error.print()
            return ('', {dictionary_name: []})

        file_list = self.TextFileLoader(file_path, label)
        line, lines = None, []
        if mode == 'automatic':
            line, lines = file_list.get_next_line()
        elif mode == 'index':
            if index >= len(file_list.lines):
                index = index % len(file_list.lines)
            line, lines = file_list.get_line_by_index(index)
        if line is None:
            cstr("No valid line was found. The file may be empty or all lines have been read.").error.print()
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
            with open(file_path, 'r', encoding="utf-8", newline='\n') as file:
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
            return line, self.lines

        def get_line_by_index(self, index):
            if index < 0 or index >= len(self.lines):
                cstr(f"Invalid line index `{index}`").error.print()
                return None, []
            self.index = index
            line = self.lines[self.index]
            cstr(f'{cstr.color.YELLOW}TextBatch{cstr.color.END} Index: {self.index}').msg.print()
            return line, self.lines

        def store_index(self):
            self.WDB.insert('TextBatch Counters', 'TextBatch', self.index)

```
