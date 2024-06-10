---
tags:
- Text
---

# Text File History Loader
## Documentation
- Class name: `Text File History Loader`
- Category: `WAS Suite/History`
- Output node: `False`

The Text File History Loader node is designed to read and process text files, filtering out comments and empty lines, and maintaining a history of processed files. It aims to provide a streamlined way to load and manipulate text data for further processing or analysis.
## Input types
### Required
- **`file`**
    - Specifies the path to the text file to be processed. It plays a crucial role in determining the source of the text data for the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`dictionary_name`**
    - Defines the key under which the processed lines will be stored in the output dictionary. This allows for customizable naming based on either the filename or a user-defined string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Returns the processed text as a single string with lines joined by newline characters, excluding comments and empty lines.
    - Python dtype: `str`
- **`dict`**
    - Comfy dtype: `DICT`
    - Provides a dictionary where the key is defined by `dictionary_name` and the value is a list of processed lines from the text file.
    - Python dtype: `Dict[str, List[str]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_File_History:
    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)
        self.conf = getSuiteConfig()

    @classmethod
    def INPUT_TYPES(cls):
        HDB = WASDatabase(WAS_HISTORY_DATABASE)
        conf = getSuiteConfig()
        paths = ['No History',]
        if HDB.catExists("History") and HDB.keyExists("History", "TextFiles"):
            history_paths = HDB.get("History", "TextFiles")
            if conf.__contains__('history_display_limit'):
                history_paths = history_paths[-conf['history_display_limit']:]
                paths = []
            for path_ in history_paths:
                paths.append(os.path.join('...'+os.sep+os.path.basename(os.path.dirname(path_)), os.path.basename(path_)))

        return {
            "required": {
                "file": (paths,),
                "dictionary_name": ("STRING", {"default": '[filename]', "multiline": True}),
            },
        }

    RETURN_TYPES = (TEXT_TYPE,"DICT")
    FUNCTION = "text_file_history"

    CATEGORY = "WAS Suite/History"

    def text_file_history(self, file=None, dictionary_name='[filename]]'):
        file_path = file.strip()
        filename = ( os.path.basename(file_path).split('.', 1)[0]
            if '.' in os.path.basename(file_path) else os.path.basename(file_path) )
        if dictionary_name != '[filename]' or dictionary_name not in [' ', '']:
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
                if not line.strip().startswith("\n"):
                    line = line.replace("\n", '')
                lines.append(line.replace("\n",''))
        dictionary = {filename: lines}

        return ("\n".join(lines), dictionary)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
