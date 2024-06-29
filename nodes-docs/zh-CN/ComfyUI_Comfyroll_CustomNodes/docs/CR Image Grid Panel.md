# Documentation
- Class name: CR_ImageGridPanel
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageGridPanel是一个设计用来高效创建和组织图像网格的节点。它接受一系列图像并将它们排列成结构化的网格布局，可以用于预览或组合显示等多种用途。该节点提供了边框和轮廓设置的定制选项，以增强网格的视觉吸引力。它特别适用于需要将图像批量处理成单一、连贯网格的工作流程。

# Input types
## Required
- images
    - ‘images’参数是一系列图像张量，这些图像将被排列成一个网格。此输入至关重要，因为它定义了最终网格的内容。这些图像被处理并组合以形成网格布局。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- border_thickness
    - ‘border_thickness’参数指定应用于网格中每张图像周围的边框厚度。它允许定制网格的外观，并可以根据所需的美学进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- border_color
    - ‘border_color’参数确定围绕每张图像的边框颜色。它是节点定制的重要方面，允许用户将边框颜色与整体设计主题相匹配。
    - Comfy dtype: COLOR
    - Python dtype: str
- outline_thickness
    - ‘outline_thickness’参数设置每张图像周围轮廓的厚度。这是一个可选特性，可以用来使网格中的图像更加突出。
    - Comfy dtype: INT
    - Python dtype: int
- outline_color
    - ‘outline_color’参数定义每张图像周围轮廓的颜色。它补充了边框，并增强了网格中每张图像的视觉区分度。
    - Comfy dtype: COLOR
    - Python dtype: str
- max_columns
    - ‘max_columns’参数指示网格中的最大列数。它是一个关键参数，控制网格的布局并影响图像的分布。
    - Comfy dtype: INT
    - Python dtype: int
- border_color_hex
    - ‘border_color_hex’参数允许使用自定义的十六进制颜色值来设置边框颜色。它为用户提供了额外的灵活性，允许用户指定可能不在预定义颜色选项中的确切边框颜色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - ‘image’输出是由输入图像组成的结果网格面板，以结构化布局排列。它代表了节点操作的最终产品，可供进一步使用或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - ‘show_help’输出提供了一个URL链接到文档页面，以获取关于节点使用和功能的额外指导和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageGridPanel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'border_thickness': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'border_color': (COLORS,), 'outline_thickness': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'outline_color': (COLORS[1:],), 'max_columns': ('INT', {'default': 5, 'min': 0, 'max': 256})}, 'optional': {'border_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_panel'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def make_panel(self, images, border_thickness, border_color, outline_thickness, outline_color, max_columns, border_color_hex='#000000'):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-image-grid-panel'
        border_color = get_color_values(border_color, border_color_hex, color_mapping)
        images = [tensor2pil(image) for image in images]
        images = apply_outline_and_border(images, outline_thickness, outline_color, border_thickness, border_color)
        combined_image = make_grid_panel(images, max_columns)
        image_out = pil2tensor(combined_image)
        return (image_out, show_help)
```