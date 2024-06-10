# Documentation
- Class name: CR_ImagePanel
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImagePanel节点用于将多个图像按照指定的布局方向组合成一个图像面板。它支持为图像添加边框和轮廓，增强视觉效果，并允许自定义颜色。适用于创建图像网格或将多个预览图像组织成单一图像条带，广泛应用于图像展示和布局设计。

# Input types
## Required
- image_1
    - 第一个要组合的图像，它是构建图像面板的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- border_thickness
    - 边框的厚度，用于定义图像边框的宽度，增强图像边缘的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- border_color
    - 边框的颜色，允许用户自定义边框颜色，以适应不同的设计需求。
    - Comfy dtype: COLOR
    - Python dtype: str
- outline_thickness
    - 轮廓的厚度，定义了图像轮廓的宽度，用于增强图像的可视边界。
    - Comfy dtype: INT
    - Python dtype: int
- outline_color
    - 轮廓的颜色，用户可以自定义轮廓颜色以匹配设计主题。
    - Comfy dtype: COLOR
    - Python dtype: str
- layout_direction
    - 布局方向，决定了图像是水平还是垂直组合，影响最终图像面板的布局结构。
    - Comfy dtype: COMBO[horizontal, vertical]
    - Python dtype: str
## Optional
- image_2
    - 第二个可选图像，用于在图像面板中与第一个图像一起展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_3
    - 第三个可选图像，用于在图像面板中与前两个图像一起展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_4
    - 第四个可选图像，用于在图像面板中与前三个图像一起展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- border_color_hex
    - 边框颜色的十六进制值，提供另一种方式来精确指定边框颜色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 组合后的图像面板，包含了所有输入图像按照指定的布局方向和样式组合而成的最终图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 提供帮助文档的链接，用户可以通过此链接获取关于如何使用该节点的更多信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImagePanel:

    @classmethod
    def INPUT_TYPES(s):
        directions = ['horizontal', 'vertical']
        return {'required': {'image_1': ('IMAGE',), 'border_thickness': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'border_color': (COLORS,), 'outline_thickness': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'outline_color': (COLORS[1:],), 'layout_direction': (directions,)}, 'optional': {'image_2': ('IMAGE',), 'image_3': ('IMAGE',), 'image_4': ('IMAGE',), 'border_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_panel'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def make_panel(self, image_1, border_thickness, border_color, outline_thickness, outline_color, layout_direction, image_2=None, image_3=None, image_4=None, border_color_hex='#000000'):
        border_color = get_color_values(border_color, border_color_hex, color_mapping)
        images = []
        images.append(tensor2pil(image_1))
        if image_2 is not None:
            images.append(tensor2pil(image_2))
        if image_3 is not None:
            images.append(tensor2pil(image_3))
        if image_4 is not None:
            images.append(tensor2pil(image_4))
        images = apply_outline_and_border(images, outline_thickness, outline_color, border_thickness, border_color)
        combined_image = combine_images(images, layout_direction)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-image-panel'
        return (pil2tensor(combined_image), show_help)
```