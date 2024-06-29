# Documentation
- Class name: FileNamePrefixDateDirFirst
- Category: Mikey/Meta
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

FileNamePrefixDateDirFirst节点旨在根据当前日期和时间生成文件名前缀，并提供包含自定义目录和文本的选项。它提供了一种系统化的方法来命名文件，可以根据特定要求进行定制。

# Input types
## Required
- date
    - 日期参数决定是否在文件名前缀中包含当前日期。它在确保生成的前缀反映所需的时间上下文方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- date_directory
    - date_directory参数控制是否应该在文件名前缀中加入以当前日期命名的目录。这对于将文件组织在基于日期的层级结构中至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- custom_directory
    - 自定义目录参数允许在文件名前缀中包含用户定义的目录。它通过启用目录定制来增强节点的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- custom_text
    - 自定义文本参数允许向文件名前缀中添加特定文本。它提供了一种将唯一标识符或描述性文本纳入前缀的方法。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- filename_prefix
    - 文件名前缀输出提供了可以作为文件名一部分的生成前缀。它包含了输入参数指定的日期、目录和自定义文本元素。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class FileNamePrefixDateDirFirst:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'date': (['true', 'false'], {'default': 'true'}), 'date_directory': (['true', 'false'], {'default': 'true'}), 'custom_directory': ('STRING', {'default': ''}), 'custom_text': ('STRING', {'default': ''})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('filename_prefix',)
    FUNCTION = 'get_filename_prefix'
    CATEGORY = 'Mikey/Meta'

    def get_filename_prefix(self, date, date_directory, custom_directory, custom_text, prompt=None, extra_pnginfo=None):
        filename_prefix = ''
        if date_directory == 'true':
            ts_str = datetime.datetime.now().strftime('%y%m%d')
            filename_prefix += ts_str + '/'
        if custom_directory:
            custom_directory = search_and_replace(custom_directory, extra_pnginfo, prompt)
            filename_prefix += custom_directory + '/'
        if date == 'true':
            ts_str = datetime.datetime.now().strftime('%y%m%d%H%M%S')
            filename_prefix += ts_str
        if custom_text != '':
            custom_text = search_and_replace(custom_text, extra_pnginfo, prompt)
            custom_text = re.sub('[<>:"/\\\\|?*]', '', custom_text)
            filename_prefix += '_' + custom_text
        return (filename_prefix,)
```