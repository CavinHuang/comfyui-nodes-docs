---
tags:
- Text
---

# File Name Prefix Date Dir First (Mikey)
## Documentation
- Class name: `FileNamePrefixDateDirFirst`
- Category: `Mikey/Meta`
- Output node: `False`

This node is designed to generate a filename prefix based on a combination of date, custom directory, and custom text inputs. It dynamically constructs the prefix by incorporating current date information, user-defined directory structures, and custom text, ensuring the generated prefix is unique and organized according to the specified parameters.
## Input types
### Required
- **`date`**
    - Indicates whether the current date should be included in the filename prefix. Including the date helps in organizing files chronologically and makes the prefix more informative.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`date_directory`**
    - Determines if the current date should be used as a directory in the file path. This is useful for organizing files into date-based directories for better file management.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_directory`**
    - Allows for the specification of a custom directory path to be included in the filename prefix. This enables users to organize their files within custom directory structures.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`custom_text`**
    - Specifies custom text to be appended to the filename prefix. This allows for further customization and identification of files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`filename_prefix`**
    - Comfy dtype: `STRING`
    - The generated filename prefix, which is a string that combines date information, custom directory paths, and custom text according to the specified inputs.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FileNamePrefixDateDirFirst:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {'date': (['true','false'], {'default':'true'}),
                             'date_directory': (['true','false'], {'default':'true'}),
                             'custom_directory': ('STRING', {'default': ''}),
                             'custom_text': ('STRING', {'default': ''})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}

    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('filename_prefix',)
    FUNCTION = 'get_filename_prefix'
    CATEGORY = 'Mikey/Meta'

    def get_filename_prefix(self, date, date_directory, custom_directory, custom_text,
                            prompt=None, extra_pnginfo=None):
        filename_prefix = ''
        if date_directory == 'true':
            ts_str = datetime.datetime.now().strftime("%y%m%d")
            filename_prefix += ts_str + '/'
        if custom_directory:
            custom_directory = search_and_replace(custom_directory, extra_pnginfo, prompt)
            filename_prefix += custom_directory + '/'
        if date == 'true':
            ts_str = datetime.datetime.now().strftime("%y%m%d%H%M%S")
            filename_prefix += ts_str
        if custom_text != '':
            custom_text = search_and_replace(custom_text, extra_pnginfo, prompt)
            # remove invalid characters from filename
            custom_text = re.sub(r'[<>:"/\\|?*]', '', custom_text)
            filename_prefix += '_' + custom_text
        return (filename_prefix,)

```
