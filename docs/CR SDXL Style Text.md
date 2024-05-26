# Documentation
- Class name: CR_SDXLStyleText
- Category: Comfyroll/SDXL
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SDXLStyleText 节点旨在处理和管理与风格相关的文本输入，特别适用于图像处理工作流中的风格转换操作。它巧妙地处理正面和负面的风格描述，使用户能够定义他们希望在输出中增强或抑制的风格属性。该节点在引导图像转换的风格方向中发挥关键作用，确保实现所需的审美结果。

# Input types
## Required
- positive_style
    - positive_style 参数对于定义用户希望在最终图像中突出的风格特征至关重要。它允许详细描述，这可以显著影响风格转换过程的创意方向。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_style
    - negative_style 参数用于指定用户希望在图像输出中避免或最小化的风格元素。这个输入对于微调风格以满足用户的期望以及省略不需要的特征至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive_prompt_text_l
    - positive_prompt_text_l 输出包含已处理的正面风格文本，将用于指导图像处理朝着期望的风格增强方向发展。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_l
    - negative_prompt_text_l 输出保存了已处理的负面风格文本，这对于引导图像处理远离不需要的风格特征至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help 输出提供了一个文档的URL链接，以便在使用节点时获得进一步的帮助和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SDXLStyleText:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive_style': ('STRING', {'default': 'POS_STYLE', 'multiline': True}), 'negative_style': ('STRING', {'default': 'NEG_STYLE', 'multiline': True})}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('positive_prompt_text_l', 'negative_prompt_text_l', 'show_help')
    FUNCTION = 'get_value'
    CATEGORY = icons.get('Comfyroll/SDXL')

    def get_value(self, positive_style, negative_style):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/SDXL-Nodes#cr-sdxl-style-text'
        return (positive_style, negative_style, show_help)
```