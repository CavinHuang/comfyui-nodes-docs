# Documentation
- Class name: WAS_Image_Paste_Face_Crop
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Paste_Face_Crop 节点旨在将裁剪过的人脸图像整合到更大的图像中，增强最终输出的视觉吸引力和一致性。它采用先进的融合技术，确保图像之间的无缝融合，并能够调整融合和锐化参数以获得最佳效果。

# Input types
## Required
- image
    - 要将人脸图像粘贴进去的主图像。此参数至关重要，因为它定义了操作的画布并影响最终的构图。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- crop_image
    - 将被粘贴到主图像上的人脸图像。此图像的质量和分辨率直接影响最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- crop_data
    - 定义人脸图像裁剪区域的数据，包括大小和位置。此参数对于确定人脸图像在主图像内的位置至关重要。
    - Comfy dtype: CROP_DATA
    - Python dtype: Tuple[int, Tuple[int, int, int, int]]
- crop_blending
    - 将人脸图像粘贴到主图像时的混合因子。它控制图像之间的过渡，以获得更自然的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop_sharpening
    - 在粘贴之前要应用于人脸图像的图像锐化级别。数值越高，人脸图像越清晰、定义越明确。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 最终图像，将人脸图像粘贴到主图像上，展示了混合和锐化过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK_IMAGE
    - 表示透明度和受混合过程影响区域的遮罩图像，适用于进一步的图像操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Paste_Face_Crop:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'crop_image': ('IMAGE',), 'crop_data': ('CROP_DATA',), 'crop_blending': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'crop_sharpening': ('INT', {'default': 0, 'min': 0, 'max': 3, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    RETURN_NAMES = ('IMAGE', 'MASK_IMAGE')
    FUNCTION = 'image_paste_face'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_paste_face(self, image, crop_image, crop_data=None, crop_blending=0.25, crop_sharpening=0):
        if crop_data == False:
            cstr('No valid crop data found!').error.print()
            return (image, pil2tensor(Image.new('RGB', tensor2pil(image).size, (0, 0, 0))))
        (result_image, result_mask) = self.paste_image(tensor2pil(image), tensor2pil(crop_image), crop_data, crop_blending, crop_sharpening)
        return (result_image, result_mask)

    def paste_image(self, image, crop_image, crop_data, blend_amount=0.25, sharpen_amount=1):

        def lingrad(size, direction, white_ratio):
            image = Image.new('RGB', size)
            draw = ImageDraw.Draw(image)
            if direction == 'vertical':
                black_end = int(size[1] * (1 - white_ratio))
                range_start = 0
                range_end = size[1]
                range_step = 1
                for y in range(range_start, range_end, range_step):
                    color_ratio = y / size[1]
                    if y <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int((y - black_end) / (size[1] - black_end) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(0, y), (size[0], y)], fill=color)
            elif direction == 'horizontal':
                black_end = int(size[0] * (1 - white_ratio))
                range_start = 0
                range_end = size[0]
                range_step = 1
                for x in range(range_start, range_end, range_step):
                    color_ratio = x / size[0]
                    if x <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int((x - black_end) / (size[0] - black_end) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(x, 0), (x, size[1])], fill=color)
            return image.convert('L')
        (crop_size, (top, left, right, bottom)) = crop_data
        crop_image = crop_image.resize(crop_size)
        if sharpen_amount > 0:
            for _ in range(int(sharpen_amount)):
                crop_image = crop_image.filter(ImageFilter.SHARPEN)
        blended_image = Image.new('RGBA', image.size, (0, 0, 0, 255))
        blended_mask = Image.new('L', image.size, 0)
        crop_padded = Image.new('RGBA', image.size, (0, 0, 0, 0))
        blended_image.paste(image, (0, 0))
        crop_padded.paste(crop_image, (top, left))
        crop_mask = Image.new('L', crop_image.size, 0)
        if top > 0:
            gradient_image = ImageOps.flip(lingrad(crop_image.size, 'vertical', blend_amount))
            crop_mask = ImageChops.screen(crop_mask, gradient_image)
        if left > 0:
            gradient_image = ImageOps.mirror(lingrad(crop_image.size, 'horizontal', blend_amount))
            crop_mask = ImageChops.screen(crop_mask, gradient_image)
        if right < image.width:
            gradient_image = lingrad(crop_image.size, 'horizontal', blend_amount)
            crop_mask = ImageChops.screen(crop_mask, gradient_image)
        if bottom < image.height:
            gradient_image = lingrad(crop_image.size, 'vertical', blend_amount)
            crop_mask = ImageChops.screen(crop_mask, gradient_image)
        crop_mask = ImageOps.invert(crop_mask)
        blended_mask.paste(crop_mask, (top, left))
        blended_mask = blended_mask.convert('L')
        blended_image.paste(crop_padded, (0, 0), blended_mask)
        return (pil2tensor(blended_image.convert('RGB')), pil2tensor(blended_mask.convert('RGB')))
```