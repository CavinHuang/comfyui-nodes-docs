---
tags:
- Text
---

# File Name Prefix (Mikey)
## Documentation
- Class name: `FileNamePrefix`
- Category: `Mikey/Meta`
- Output node: `False`

This node is designed to generate a prefix for filenames based on various conditions such as the current date, a custom directory, and custom text. It allows for dynamic filename customization by incorporating date formatting and custom text replacement, ensuring filenames are structured and organized according to user-defined parameters.
## Input types
### Required
- **`date`**
    - Indicates whether the current date should be included in the filename prefix. When set to 'true', the date is formatted and appended to the prefix, contributing to a time-stamped file organization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`date_directory`**
    - Determines if the current date should be used to create a directory structure within the filename prefix. If 'true', a date-based directory is prepended to the prefix, aiding in chronological sorting of files.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_directory`**
    - Specifies a custom directory path to be included in the filename prefix. This path is dynamically generated based on additional information provided, allowing for customized file organization within specific directories.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`custom_text`**
    - Custom text to be appended to the filename prefix. This text can be dynamically generated and is sanitized to remove invalid filename characters, enabling personalized file naming.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`filename_prefix`**
    - Comfy dtype: `STRING`
    - The generated filename prefix, constructed based on the input parameters and conditions. It is sanitized and structured to ensure valid and organized filenames.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FileNamePrefix:
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
        if custom_directory:
            custom_directory = search_and_replace(custom_directory, extra_pnginfo, prompt)
            filename_prefix += custom_directory + '/'
        if date_directory == 'true':
            ts_str = datetime.datetime.now().strftime("%y%m%d")
            filename_prefix += ts_str + '/'
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
