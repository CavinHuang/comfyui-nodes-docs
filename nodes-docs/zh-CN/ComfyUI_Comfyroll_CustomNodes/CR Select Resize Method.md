# Documentation
- Class name: CR_SelectResizeMethod
- Category: Comfyroll/Utils/Other
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SelectResizeMethod 节点旨在为不同的图像缩放方法提供选择机制，例如'Fit'和'Crop'。它在图像理工作流中充当决策点，允许用户根据其对图像操作的具体需求选择方法。

# Input types
## Required
- method
    - ‘method’参数对于确定用于调整图像大小的方法至关重要。它决定了图像是会被调整大小以适应给定的尺寸，还是会被裁剪以完全匹配这些尺寸。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- method
    - 输出‘method’代表用户选择的图像缩放方法。它是图像处理流程后续步骤的关键决定因素。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - ‘show_help’输出提供了一个文档的URL链接，用于进一步的帮助。对于需要更多关于缩放方法或节点功能信息的用户来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SelectResizeMethod:

    @classmethod
    def INPUT_TYPES(cls):
        methods = ['Fit', 'Crop']
        return {'required': {'method': (methods,)}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('method', 'show_help')
    FUNCTION = 'set_switch'
    CATEGORY = icons.get('Comfyroll/Utils/Other')

    def set_switch(self, method):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-select-resize-method'
        return (method, show_help)
```