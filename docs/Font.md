# Documentation
- Class name: FontInput
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点根据指定的字体名称检索字体文件，为在各种图形或文本处理任务中访问和使用字体提供了一种简化的方法。

# Input types
## Required
- font
    - ‘font’参数至关重要，因为它标识了系统中要使用的具体字体。它直接影响节点的操作和结果输出，确保将正确的字体应用到当前任务中。
    - Comfy dtype: list
    - Python dtype: list

# Output types
- font_file
    - 输出‘font_file’代表与输入字体参数相关的检索到的字体文件，这对于应用程序中进一步的图形或文本处理至关重要。
    - Comfy dtype: list
    - Python dtype: list

# Usage tips
- Infra type: CPU

# Source code
```
class FontInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'font': (list(font_files.keys()),)}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, font):
        return (font_files[font],)
```