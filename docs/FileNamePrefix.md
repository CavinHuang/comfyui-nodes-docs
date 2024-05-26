# Documentation
- Class name: FileNamePrefix
- Category: Mikey/Meta
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

FileNamePrefix节点负责根据当前日期、自定义目录名称和自定义文本输入生成标准化的文件名前缀。它确保文件名是唯一的，并根据指定的标准进行组织，从而便于文件管理和检索。

# Input types
## Required
- date
    - 参数'date'决定是否在文件名前缀中包含当前日期。它在按时间顺序组织文件和确保每个文件都有基于日期的唯一标识符中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- date_directory
    - 参数'date_directory'指定是否根据当前日期创建目录。这对于维护一个按日期分类文件的层次化文件结构至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- custom_directory
    - 参数'custom_directory'允许在文件名前缀中包含用户定义的目录名称。它在根据特定项目或用户需求组织文件方面提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- custom_text
    - 参数'custom_text'允许在文件名前缀中添加用户定义的文本字符串。这可以用来添加与文件内容相关的特定标签或标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - 参数'prompt'用于通过附加元数据高级定制文件名前缀。当需要将动态元素纳入文件命名约定时，它特别有用。
    - Comfy dtype: PROMPT
    - Python dtype: dict
- extra_pnginfo
    - 参数'extra_pnginfo'提供补充信息，可用于进一步完善文件名前缀。它通常与'prompt'参数一起使用，以包含更详细的上下文数据。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: dict

# Output types
- filename_prefix
    - 'filename_prefix'输出是最终生成的前缀，它将所有输入参数组合成一个连贯且标准化的字符串。它是系统内使用的文件命名约定的基础。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class FileNamePrefix:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'date': (['true', 'false'], {'default': 'true'}), 'date_directory': (['true', 'false'], {'default': 'true'}), 'custom_directory': ('STRING', {'default': ''}), 'custom_text': ('STRING', {'default': ''})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('filename_prefix',)
    FUNCTION = 'get_filename_prefix'
    CATEGORY = 'Mikey/Meta'

    def get_filename_prefix(self, date, date_directory, custom_directory, custom_text, prompt=None, extra_pnginfo=None):
        filename_prefix = ''
        if custom_directory:
            custom_directory = search_and_replace(custom_directory, extra_pnginfo, prompt)
            filename_prefix += custom_directory + '/'
        if date_directory == 'true':
            ts_str = datetime.datetime.now().strftime('%y%m%d')
            filename_prefix += ts_str + '/'
        if date == 'true':
            ts_str = datetime.datetime.now().strftime('%y%m%d%H%M%S')
            filename_prefix += ts_str
        if custom_text != '':
            custom_text = search_and_replace(custom_text, extra_pnginfo, prompt)
            custom_text = re.sub('[<>:"/\\\\|?*]', '', custom_text)
            filename_prefix += '_' + custom_text
        return (filename_prefix,)
```