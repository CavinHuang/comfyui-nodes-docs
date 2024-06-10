# Documentation
- Class name: CR_HiResFixProcessSwitch
- Category: Comfyroll/Utils/Process
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_HiResFixProcessSwitch节点作为一个决策单元，根据提供的输入选择两种放大处理过程之一。它旨在通过智能地将处理过程路由到潜在的或图像放大方法，从而提高图像处理任务的效率和灵活性。

# Input types
## Required
- Input
    - ‘Input’参数至关重要，因为它决定了放大处理的选择路径。它决定了节点将调用潜在的还是图像放大方法，从而影响后续的处理和输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- latent_upscale
    - 当‘Input’参数指定潜在放大过程时，使用‘latent_upscale’参数。它很重要，因为它携带了将被放大的潜在表示，影响最终输出的质量和分辨率。
    - Comfy dtype: LATENT
    - Python dtype: Any
- image_upscale
    - 当‘Input’参数指示图像放大过程时，使用‘image_upscale’参数。它至关重要，因为它包含将被处理以进行放大的图像数据，直接影响输出的视觉增强。
    - Comfy dtype: LATENT
    - Python dtype: Any

# Output types
- LATENT
    - ‘LATENT’输出代表了所选放大处理的结果，无论是来自潜在的还是图像放大。它包含了经过指定增强处理的数据，可供进一步使用或分析。
    - Comfy dtype: LATENT
    - Python dtype: Any
- STRING
    - ‘STRING’输出提供了指向节点帮助文档的URL链接。这对于寻求额外指导或了解节点功能和用法的用户来说特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_HiResFixProcessSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': (['latent_upscale', 'image_upscale'],)}, 'optional': {'latent_upscale': ('LATENT',), 'image_upscale': ('LATENT',)}}
    RETURN_TYPES = ('LATENT', 'STRING')
    RETURN_NAMES = ('LATENT', 'STRING')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Process')

    def switch(self, Input, latent_upscale=None, image_upscale=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Process-Nodes#cr-hires-fix-process-switch'
        if Input == 'latent_upscale':
            return (latent_upscale, show_help)
        else:
            return (image_upscale, show_help)
```