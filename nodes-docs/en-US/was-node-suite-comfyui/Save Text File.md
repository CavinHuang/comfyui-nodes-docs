---
tags:
- Text
---

# Save Text File
## Documentation
- Class name: `Save Text File`
- Category: `WAS Suite/IO`
- Output node: `True`

This node is designed to save a given text to a file, handling path and filename generation with customizable options. It ensures the creation of the specified path if it doesn't exist, validates the text content, and updates a history of saved text files.
## Input types
### Required
- **`text`**
    - The text content to be saved. It's crucial as it determines the content of the created text file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`path`**
    - The destination path where the text file will be saved. The node supports token parsing for dynamic path generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_prefix`**
    - An optional prefix for the filename, supporting token parsing for dynamic generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_delimiter`**
    - A delimiter used in the filename to separate different parts, such as the prefix from the generated number.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_number_padding`**
    - Determines the padding for the numerical part of the filename, ensuring a consistent filename format.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`ui`**
    - A UI representation of the saved text content, facilitating user interaction.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Save:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"forceInput": True}),
                "path": ("STRING", {"default": './ComfyUI/output/[time(%Y-%m-%d)]', "multiline": False}),
                "filename_prefix": ("STRING", {"default": "ComfyUI"}),
                "filename_delimiter": ("STRING", {"default":"_"}),
                "filename_number_padding": ("INT", {"default":4, "min":2, "max":9, "step":1}),

            }
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = "save_text_file"
    CATEGORY = "WAS Suite/IO"

    def save_text_file(self, text, path, filename_prefix='ComfyUI', filename_delimiter='_', filename_number_padding=4):

        tokens = TextTokens()
        path = tokens.parseTokens(path)
        filename_prefix = tokens.parseTokens(filename_prefix)

        if not os.path.exists(path):
            cstr(f"The path `{path}` doesn't exist! Creating it...").warning.print()
            try:
                os.makedirs(path, exist_ok=True)
            except OSError as e:
                cstr(f"The path `{path}` could not be created! Is there write access?\n{e}").error.print()

        if text.strip() == '':
            cstr(f"There is no text specified to save! Text is empty.").error.print()

        delimiter = filename_delimiter
        number_padding = int(filename_number_padding)
        file_extension = '.txt'
        filename = self.generate_filename(path, filename_prefix, delimiter, number_padding, file_extension)
        file_path = os.path.join(path, filename)

        self.writeTextFile(file_path, text)

        update_history_text_files(file_path)

        return (text, { "ui": { "string": text } } )

    def generate_filename(self, path, prefix, delimiter, number_padding, extension):
        pattern = f"{re.escape(prefix)}{re.escape(delimiter)}(\\d{{{number_padding}}})"
        existing_counters = [
            int(re.search(pattern, filename).group(1))
            for filename in os.listdir(path)
            if re.match(pattern, filename)
        ]
        existing_counters.sort(reverse=True)

        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1

        filename = f"{prefix}{delimiter}{counter:0{number_padding}}{extension}"
        while os.path.exists(os.path.join(path, filename)):
            counter += 1
            filename = f"{prefix}{delimiter}{counter:0{number_padding}}{extension}"

        return filename

    def writeTextFile(self, file, content):
        try:
            with open(file, 'w', encoding='utf-8', newline='\n') as f:
                f.write(content)
        except OSError:
            cstr(f"Unable to save file `{file}`").error.print()

```
