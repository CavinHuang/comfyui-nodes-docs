---
tags:
- Text
---

# Load Text File
## Documentation
- Class name: `Load Text File`
- Category: `WAS Suite/IO`
- Output node: `False`

This node is designed to load text from a specified file, processing the text to exclude lines starting with specific characters and handling file path validations. It supports loading the entire file content or specific lines based on the mode selected, and maintains a history of loaded files and their respective lines for efficient data retrieval and manipulation.
## Input types
### Required
- **`file_path`**
    - The path to the text file to be loaded. It is crucial for locating and accessing the file's content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`dictionary_name`**
    - An optional name for the dictionary key under which the loaded text lines will be stored. It defaults to the filename but can be customized.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output includes the processed text line(s).
    - Python dtype: `str`
- **`dict`**
    - Comfy dtype: `DICT`
    - A dictionary mapping the dictionary name to the list of processed lines.
    - Python dtype: `Dict[str, List[str]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Load_From_File:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_path": ("STRING", {"default": '', "multiline": False}),
                "dictionary_name": ("STRING", {"default": '[filename]', "multiline": False}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,"DICT")
    FUNCTION = "load_file"

    CATEGORY = "WAS Suite/IO"

    def load_file(self, file_path='', dictionary_name='[filename]]'):

        filename = ( os.path.basename(file_path).split('.', 1)[0]
            if '.' in os.path.basename(file_path) else os.path.basename(file_path) )
        if dictionary_name != '[filename]':
            filename = dictionary_name
        if not os.path.exists(file_path):
            cstr(f"The path `{file_path}` specified cannot be found.").error.print()
            return ('', {filename: []})
        with open(file_path, 'r', encoding="utf-8", newline='\n') as file:
            text = file.read()

        # Write to file history
        update_history_text_files(file_path)

        import io
        lines = []
        for line in io.StringIO(text):
            if not line.strip().startswith('#'):
                if ( not line.strip().startswith("\n")
                    or not line.strip().startswith("\r")
                    or not line.strip().startswith("\r\n") ):
                    line = line.replace("\n", '').replace("\r",'').replace("\r\n",'')
                lines.append(line.replace("\n",'').replace("\r",'').replace("\r\n",''))
        dictionary = {filename: lines}

        return ("\n".join(lines), dictionary)

```
