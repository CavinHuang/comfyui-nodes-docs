# Documentation
- Class name: CR_HalfDropPanel
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_HalfDropPanel 是一个用于根据指定模式操作和转换图像的节点，创建可以自定义百分比值的下落效果。它通过应用半下落、四分之一下落或自定义下落模式增强图像的视觉呈现，为用户提供了一种灵活的方式来调整他们的图像布局和美学，以满足各种设计目的。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点处理的基础输入。它决定了下落面板效果的源材料，对节点的执行至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- pattern
    - 模式参数决定了要应用于图像的下落效果类型。它对于定义节点将执行的特定视觉转换至关重要。
    - Comfy dtype: COMBO['none', 'half drop', 'quarter drop', 'custom drop %']
    - Python dtype: str
## Optional
- drop_percentage
    - drop_percentage 参数是可选的，但在选择自定义下落模式时非常重要。它允许用户控制下落效果的范围，为图像转换提供一定程度的定制化。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 转换后的图像输出是节点操作的主要结果。它代表了应用了下落模式的图像，作为进一步使用或展示的视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个链接到文档的链接，以供进一步帮助。对于寻求如何使用节点或解决故障的用户来说，这是一个有用的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_HalfDropPanel:

    @classmethod
    def INPUT_TYPES(s):
        patterns = ['none', 'half drop', 'quarter drop', 'custom drop %']
        return {'required': {'image': ('IMAGE',), 'pattern': (patterns,)}, 'optional': {'drop_percentage': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_panel'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def make_panel(self, image, pattern, drop_percentage=0.5):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-half-drop-panel'
        if pattern == 'none':
            return (image, show_help)
        pil_img = tensor2pil(image)
        pil_img = pil_img.convert('RGBA')
        (x, y) = pil_img.size
        aspect_ratio = x / y
        d = int(drop_percentage * 100)
        panel_image = Image.new('RGBA', (x * 2, y * 2))
        if pattern == 'half drop':
            panel_image.paste(pil_img, (0, 0))
            panel_image.paste(pil_img, (0, y))
            panel_image.paste(pil_img, (x, -y // 2))
            panel_image.paste(pil_img, (x, y // 2))
            panel_image.paste(pil_img, (x, 3 * y // 2))
        elif pattern == 'quarter drop':
            panel_image.paste(pil_img, (0, 0))
            panel_image.paste(pil_img, (0, y))
            panel_image.paste(pil_img, (x, -3 * y // 4))
            panel_image.paste(pil_img, (x, y // 4))
            panel_image.paste(pil_img, (x, 5 * y // 4))
        elif pattern == 'custom drop %':
            panel_image.paste(pil_img, (0, 0))
            panel_image.paste(pil_img, (0, y))
            panel_image.paste(pil_img, (x, (d - 100) * y // 100))
            panel_image.paste(pil_img, (x, d * y // 100))
            panel_image.paste(pil_img, (x, y + d * y // 100))
        image_out = pil2tensor(panel_image.convert('RGB'))
        return (image_out, show_help)
```