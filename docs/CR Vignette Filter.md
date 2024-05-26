# Documentation
- Class name: CR_VignetteFilter
- Category: Comfyroll/Graphics/Filter
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_VignetteFilter是一个用于对图像应用称为晕影的视觉效果的节点。这种效果逐渐使图像的角落变暗，从而在中心区域到边缘之间创建一个柔和的焦点过渡。它增强了视觉深度并吸引了对图像中心的注意，通常用于摄影和电影中。

# Input types
## Required
- image
    - 要应用晕影效果的输入图像。这是节点将处理的主要数据，最终输出的质量很大程度上取决于此输入图像的特性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- vignette_shape
    - 确定要应用于图像的晕影的形状。形状的选择可以显著影响最终图像的美学吸引力和传达的情感反应。
    - Comfy dtype: COMBO['circle', 'oval', 'square', 'diamond']
    - Python dtype: str
- feather_amount
    - 控制晕影边缘的柔和度。较高的羽化量会使得从暗角到图像中心的过渡更加渐进，而较低的量则使得过渡更加突然。
    - Comfy dtype: INT
    - Python dtype: int
- x_offset
    - 允许水平调整晕影的中心。这可以改变图像中的焦点区域，创造出构图上的微妙变化。
    - Comfy dtype: INT
    - Python dtype: int
- y_offset
    - 允许垂直调整晕影的中心。与x_offset类似，它可以用来微调图像内的视觉焦点。
    - Comfy dtype: INT
    - Python dtype: int
- zoom
    - 此参数调整晕影效果的大小。较高的缩放值会增加晕影的大小，使其更加突出，而较低的值则会减少其大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- reverse
    - 如果设置为'yes'，则反转晕影效果。不是使边缘变暗，而是使图像中心变暗，创造出对比鲜明的视觉风格。
    - Comfy dtype: COMBO['no', 'yes']
    - Python dtype: str

# Output types
- IMAGE
    - 应用了晕影效果的结果图像。这是主要的输出，反映了通过节点参数所做的创造性调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - 表示晕影透明度的alpha遮罩。它可以用于进一步的图像处理或作为后期制作中的选择工具。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 提供文档链接，以获取有关使用节点的进一步指导。对于寻求有关节点功能和选项的更多信息的用户来说，这非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_VignetteFilter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'vignette_shape': (['circle', 'oval', 'square', 'diamond'],), 'feather_amount': ('INT', {'default': 100, 'min': 0, 'max': 1024}), 'x_offset': ('INT', {'default': 0, 'min': -2048, 'max': 2048}), 'y_offset': ('INT', {'default': 0, 'min': -2048, 'max': 2048}), 'zoom': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.1}), 'reverse': (['no', 'yes'],)}}
    RETURN_TYPES = ('IMAGE', 'MASK', 'STRING')
    RETURN_NAMES = ('IMAGE', 'MASK', 'show_help')
    FUNCTION = 'make_vignette'
    CATEGORY = icons.get('Comfyroll/Graphics/Filter')

    def make_vignette(self, image, feather_amount, reverse, vignette_shape='circle', x_offset=0, y_offset=0, zoom=1.0):
        images = []
        masks = []
        vignette_color = 'black'
        for img in image:
            im = tensor2pil(img)
            RADIUS = feather_amount
            alpha_mask = Image.new('L', im.size, 255)
            draw = ImageDraw.Draw(alpha_mask)
            center_x = im.size[0] // 2 + x_offset
            center_y = im.size[1] // 2 + y_offset
            radius = min(center_x, center_y) * zoom
            size_x = (im.size[0] - RADIUS) * zoom
            size_y = (im.size[1] - RADIUS) * zoom
            if vignette_shape == 'circle':
                if reverse == 'no':
                    draw.ellipse([(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)], fill=0)
                elif reverse == 'yes':
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.ellipse([(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)], fill=255)
                else:
                    raise ValueError("Invalid value for reverse. Use 'yes' or 'no'.")
            elif vignette_shape == 'oval':
                if reverse == 'no':
                    draw.ellipse([(center_x - size_x / 2, center_y - size_y / 2), (center_x + size_x / 2, center_y + size_y / 2)], fill=0)
                elif reverse == 'yes':
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.ellipse([(center_x - size_x / 2, center_y - size_y / 2), (center_x + size_x / 2, center_y + size_y / 2)], fill=255)
            elif vignette_shape == 'diamond':
                if reverse == 'no':
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.polygon([(center_x, center_y - size / 2), (center_x + size / 2, center_y), (center_x, center_y + size / 2), (center_x - size / 2, center_y)], fill=0)
                elif reverse == 'yes':
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.polygon([(center_x, center_y - size / 2), (center_x + size / 2, center_y), (center_x, center_y + size / 2), (center_x - size / 2, center_y)], fill=255)
            elif vignette_shape == 'square':
                if reverse == 'no':
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.rectangle([(center_x - size / 2, center_y - size / 2), (center_x + size / 2, center_y + size / 2)], fill=0)
                elif reverse == 'yes':
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.rectangle([(center_x - size / 2, center_y - size / 2), (center_x + size / 2, center_y + size / 2)], fill=255)
                else:
                    raise ValueError("Invalid value for reverse. Use 'yes' or 'no'.")
            else:
                raise ValueError("Invalid vignette_shape. Use 'circle', 'oval', or 'square'.")
            alpha_mask = alpha_mask.filter(ImageFilter.GaussianBlur(RADIUS))
            masks.append(pil2tensor(alpha_mask).unsqueeze(0))
            vignette_img = Image.new('RGBA', im.size, vignette_color)
            vignette_img.putalpha(alpha_mask)
            result_img = Image.alpha_composite(im.convert('RGBA'), vignette_img)
            images.append(pil2tensor(result_img.convert('RGB')))
        images = torch.cat(images, dim=0)
        masks = torch.cat(masks, dim=0)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-vignette-filter'
        return (images, masks, show_help)
```