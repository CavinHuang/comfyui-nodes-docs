# Documentation
- Class name: CR_ImageBorder
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageBorder 节点旨在为图像添加装饰性边框，以增强其在各种布局中的视觉效果。它允许自定义边框的厚度和颜色，还可以选择添加轮廓以进行额外强调。在需要专业和精致外观的图像展示图形设计工作流程中，这个节点发挥着关键作用。

# Input types
## Required
- image
    - 图像参数是必需的，因为它定义了将应用边框的基础视觉内容。输入图像的质量和分辨率直接影响最终输出，使其成为节点执行中的基本元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- top_thickness
    - top_thickness 参数指定应用于图像顶部边缘的边框厚度。它允许微调边框的外观以满足设计要求，有助于整体图像的美观。
    - Comfy dtype: INT
    - Python dtype: int
- bottom_thickness
    - bottom_thickness 参数决定图像底部边缘的边框厚度。调整此参数可以帮助实现平衡对称的边框设计，增强图像的视觉和谐。
    - Comfy dtype: INT
    - Python dtype: int
- left_thickness
    - left_thickness 参数控制图像左侧边框的厚度。在设计边框时，这是一个重要方面，以确保图像在所有边缘上都具有统一和一致的外观。
    - Comfy dtype: INT
    - Python dtype: int
- right_thickness
    - right_thickness 参数设置图像右侧边框的厚度。它在整体边框设计中发挥作用，确保图像的边缘在视觉上与布局的其余部分保持一致。
    - Comfy dtype: INT
    - Python dtype: int
- border_color
    - border_color 参数用于定义边框的颜色。它是设置图像边框的色调和风格的关键元素，影响最终图像的整体氛围和呈现。
    - Comfy dtype: COLOR
    - Python dtype: str
- outline_thickness
    - outline_thickness 参数指定要在图像周围添加的轮廓线厚度。这可以为图像添加深度和重点，使其在组合中更加突出。
    - Comfy dtype: INT
    - Python dtype: int
- outline_color
    - outline_color 参数决定围绕图像的轮廓线颜色。对于希望与 border_color 和图像本身创建对比或和谐感的设计师来说，这是一个重要选择。
    - Comfy dtype: COLOR
    - Python dtype: str
- border_color_hex
    - border_color_hex 参数允许使用自定义的十六进制颜色值来设置边框颜色，为设计师提供了更大的灵活性和对所需确切颜色阴影的控制。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - CR_ImageBorder 节点的图像输出是应用了边框和可选轮廓的处理后的图像。它代表了节点操作的最终视觉结果，可供进一步使用或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个到文档页面的 URL 链接，以获取有关使用 CR_ImageBorder 节点的进一步帮助或指导。对于寻求更多信息的用户来说，这是一个有用的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageBorder:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'top_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'bottom_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'left_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'right_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'border_color': (COLORS,), 'outline_thickness': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'outline_color': (COLORS[1:],)}, 'optional': {'border_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_panel'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def make_panel(self, image, top_thickness, bottom_thickness, left_thickness, right_thickness, border_color, outline_thickness, outline_color, border_color_hex='#000000'):
        images = []
        border_color = get_color_values(border_color, border_color_hex, color_mapping)
        for img in image:
            img = tensor2pil(img)
            if outline_thickness > 0:
                img = ImageOps.expand(img, outline_thickness, fill=outline_color)
            if left_thickness > 0 or right_thickness > 0 or top_thickness > 0 or (bottom_thickness > 0):
                img = ImageOps.expand(img, (left_thickness, top_thickness, right_thickness, bottom_thickness), fill=border_color)
            images.append(pil2tensor(img))
        images = torch.cat(images, dim=0)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-image-border'
        return (images, show_help)
```