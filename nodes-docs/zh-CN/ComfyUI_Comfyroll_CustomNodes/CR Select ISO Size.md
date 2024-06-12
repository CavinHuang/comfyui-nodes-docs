# Documentation
- Class name: CR_SelectISOSize
- Category: Comfyroll/Utils/Other
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SelectISOSize 节点旨在为用户选择的 ISO 纸张大小提供相应的尺寸。它在需要标准纸张大小的应用程序中扮演着重要角色，确保输出符合国际标准。

# Input types
## Required
- iso_size
    - 参数 'iso_size' 对于确定特定的 ISO 纸张尺寸至关重要。它通过指定将返回的尺寸集来影响节点的执行。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- width
    - 输出 'width' 表示所选 ISO 纸张大小的宽度尺寸。对于需要精确纸张尺寸规格的应用程序来说，它非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 输出 'height' 提供了所选 ISO 纸张大小的高度尺寸。它对于确保纸张大小满足各种打印或设计任务所需的规格至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - 输出 'show_help' 提供了一个指向有关 ISO 纸张大小的更多信息的帮助页面的 URL 链接。对于寻求有关该主题的额外指导或澄清的用户来说，这是有用的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SelectISOSize:

    @classmethod
    def INPUT_TYPES(cls):
        sizes = list(iso_sizes.keys())
        return {'required': {'iso_size': (sizes,)}}
    RETURN_TYPES = ('INT', 'INT', 'STRING')
    RETURN_NAMES = ('width', 'height', 'show_help')
    FUNCTION = 'get_size'
    CATEGORY = icons.get('Comfyroll/Utils/Other')

    def get_size(self, iso_size):
        if iso_size in iso_sizes:
            (width, height) = iso_sizes[iso_size]
        else:
            print('Size not found.')
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-select-iso-size'
        return (width, height, show_help)
```