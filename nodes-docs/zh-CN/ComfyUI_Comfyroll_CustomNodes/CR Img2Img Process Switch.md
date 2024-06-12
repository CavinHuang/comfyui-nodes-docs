# Documentation
- Class name: CR_Img2ImgProcessSwitch
- Category: Comfyroll/Utils/Process
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Img2ImgProcessSwitch 节点在 ComfyUI 工作流中充当决策组件。它旨在根据输入类型智能地路由图像数据的处理，无论是文本到图像的转换还是图像到图像的转换。此节点对于简化图像处理流程至关重要，确保将适当的处理方法应用于输入数据以获得最佳结果。

# Input types
## Required
- Input
    - ‘Input’ 参数至关重要，因为它决定了工作流中图像处理的路径。它指示节点将执行文本到图像的转换还是图像到图像的转换，从而影响整个处理序列。
    - Comfy dtype: COMBO['txt2img', 'img2img']
    - Python dtype: str
## Optional
- txt2img
    - 当‘Input’参数设置为‘txt2img’时，使用‘txt2img’参数。它表示文本到图像过程的潜在表示，这对于进行转换至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- img2img
    - 当‘Input’参数设置为‘img2img’时，‘img2img’参数变得相关。它保存了图像到图像转换过程所需的潜在数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Output types
- LATENT
    - ‘LATENT’输出包含处理后的潜在数据，这是基于输入选择的文本到图像或图像到图像转换的结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- show_help
    - ‘show_help’输出提供了一个 URL 到文档，以获取有关如何有效使用该节点的进一步帮助或指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Img2ImgProcessSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': (['txt2img', 'img2img'],)}, 'optional': {'txt2img': ('LATENT',), 'img2img': ('LATENT',)}}
    RETURN_TYPES = ('LATENT', 'STRING')
    RETURN_NAMES = ('LATENT', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Process')

    def switch(self, Input, txt2img=None, img2img=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Process-Nodes#cr-img2img-process-switch'
        if Input == 'txt2img':
            return (txt2img, show_help)
        else:
            return (img2img, show_help)
```