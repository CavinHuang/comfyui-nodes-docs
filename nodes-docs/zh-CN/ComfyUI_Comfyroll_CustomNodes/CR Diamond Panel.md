# Documentation
- Class name: CR_DiamondPanel
- Category: Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_DiamondPanel 是一个用于从图像创建视觉吸引人的菱形面板的节点。它通过提供图案设计增强了布局功能，可以无缝集成到各种图形应用中。这个节点专注于图像的美学展示，允许在面板排列和设计中自由创作。

# Input types
## Required
- image
    - 图像参数是 CR_DiamondPanel 节点的核心输入，用于生成菱形面板。它至关重要，因为它决定了输出面板的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- pattern
    - 图案参数决定了应用于面板的设计类型。它很重要，因为它允许用户选择标准或菱形图案，影响布局的最终外观。
    - Comfy dtype: COMBO['none', 'diamond']
    - Python dtype: str
## Optional
- drop_percentage
    - drop_percentage 参数调整菱形面板之间的间距。它在整体构图中起着至关重要的作用，通过控制布局中面板的密度和排列方式。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - CR_DiamondPanel 节点的图像输出代表了最终的菱形图案布局。它是输入图像和所选图案的结合，可供进一步使用或展示。
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
class CR_DiamondPanel:

    @classmethod
    def INPUT_TYPES(s):
        patterns = ['none', 'diamond']
        return {'required': {'image': ('IMAGE',), 'pattern': (patterns,)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_panel'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def make_panel(self, image, pattern, drop_percentage=0.5):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-diamond-panel'
        if pattern == 'none':
            return (image, show_help)
        pil_img = tensor2pil(image)
        pil_img = pil_img.convert('RGBA')
        (x, y) = pil_img.size
        aspect_ratio = x / y
        d = int(drop_percentage * 100)
        panel_image = Image.new('RGBA', (x * 2, y * 2))
        if pattern == 'diamond':
            diamond_size = min(x, y)
            diamond_width = min(x, y * aspect_ratio)
            diamond_height = min(y, x / aspect_ratio)
            diamond_mask = Image.new('L', (x, y), 0)
            draw = ImageDraw.Draw(diamond_mask)
            draw.polygon([(x // 2, 0), (x, y // 2), (x // 2, y), (0, y // 2)], fill=255)
            diamond_image = pil_img.copy()
            diamond_image.putalpha(diamond_mask)
            panel_image.paste(diamond_image, (-x // 2, (d - 100) * y // 100), diamond_image)
            panel_image.paste(diamond_image, (-x // 2, d * y // 100), diamond_image)
            panel_image.paste(diamond_image, (-x // 2, y + d * y // 100), diamond_image)
            panel_image.paste(diamond_image, (0, 0), diamond_image)
            panel_image.paste(diamond_image, (0, y), diamond_image)
            panel_image.paste(diamond_image, (x // 2, (d - 100) * y // 100), diamond_image)
            panel_image.paste(diamond_image, (x // 2, d * y // 100), diamond_image)
            panel_image.paste(diamond_image, (x // 2, y + d * y // 100), diamond_image)
            panel_image.paste(diamond_image, (x, 0), diamond_image)
            panel_image.paste(diamond_image, (x, y), diamond_image)
            panel_image.paste(diamond_image, (3 * x // 2, (d - 100) * y // 100), diamond_image)
            panel_image.paste(diamond_image, (3 * x // 2, d * y // 100), diamond_image)
            panel_image.paste(diamond_image, (3 * x // 2, y + d * y // 100), diamond_image)
        image_out = pil2tensor(panel_image.convert('RGB'))
        return (image_out, show_help)
```