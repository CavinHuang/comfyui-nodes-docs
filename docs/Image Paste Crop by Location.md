# Documentation
- Class name: WAS_Image_Paste_Crop_Location
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Paste_Crop_Location 节点旨在通过在指定位置粘贴一张图片到另一张上，然后裁剪结果来操作和整合图片。它允许微调粘贴图片的混合度和锐度，从而在目标图片中提供无缝集成。

# Input types
## Required
- image
    - 主图像，crop_image将被粘贴到其上。它作为操作的画布。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- crop_image
    - 将被粘贴到主图像上的图片。它是粘贴和裁剪过程的主要对象。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- top
    - 粘贴的图片在主图像上放置的垂直位置。它对于确定粘贴图片的确切位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- left
    - 粘贴的图片在主图像上放置的水平位置。它与top参数一起工作，以设置粘贴位置。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 裁剪操作的右边界。它与left参数一起定义了裁剪区域的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 裁剪操作的下边界。它与top参数一起定义了裁剪区域的高度。
    - Comfy dtype: INT
    - Python dtype: int
- crop_blending
    - 粘贴图片的混合因子。它控制粘贴图片与主图片的混合程度，影响最终的视觉外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop_sharpening
    - 粘贴图片的锐化级别。增加此值将增强粘贴图片的锐度，使其更加突出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result_image
    - 粘贴和裁剪过程后的最终图像，包括集成了粘贴并裁剪图片的主图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- result_mask
    - 由混合过程产生的遮罩图像，可以用于进一步的图像操作或作为透明度遮罩。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Paste_Crop_Location:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'crop_image': ('IMAGE',), 'top': ('INT', {'default': 0, 'max': 10000000, 'min': 0, 'step': 1}), 'left': ('INT', {'default': 0, 'max': 10000000, 'min': 0, 'step': 1}), 'right': ('INT', {'default': 256, 'max': 10000000, 'min': 0, 'step': 1}), 'bottom': ('INT', {'default': 256, 'max': 10000000, 'min': 0, 'step': 1}), 'crop_blending': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'crop_sharpening': ('INT', {'default': 0, 'min': 0, 'max': 3, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    FUNCTION = 'image_paste_crop_location'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_paste_crop_location(self, image, crop_image, top=0, left=0, right=256, bottom=256, crop_blending=0.25, crop_sharpening=0):
        (result_image, result_mask) = self.paste_image(tensor2pil(image), tensor2pil(crop_image), top, left, right, bottom, crop_blending, crop_sharpening)
        return (result_image, result_mask)

    def paste_image(self, image, crop_image, top=0, left=0, right=256, bottom=256, blend_amount=0.25, sharpen_amount=1):
        image = image.convert('RGBA')
        crop_image = crop_image.convert('RGBA')

        def inset_border(image, border_width=20, border_color=0):
            (width, height) = image.size
            bordered_image = Image.new(image.mode, (width, height), border_color)
            bordered_image.paste(image, (0, 0))
            draw = ImageDraw.Draw(bordered_image)
            draw.rectangle((0, 0, width - 1, height - 1), outline=border_color, width=border_width)
            return bordered_image
        (img_width, img_height) = image.size
        top = min(max(top, 0), img_height)
        left = min(max(left, 0), img_width)
        bottom = min(max(bottom, 0), img_height)
        right = min(max(right, 0), img_width)
        crop_size = (right - left, bottom - top)
        crop_img = crop_image.resize(crop_size)
        crop_img = crop_img.convert('RGBA')
        if sharpen_amount > 0:
            for _ in range(sharpen_amount):
                crop_img = crop_img.filter(ImageFilter.SHARPEN)
        if blend_amount > 1.0:
            blend_amount = 1.0
        elif blend_amount < 0.0:
            blend_amount = 0.0
        blend_ratio = max(crop_size) / 2 * float(blend_amount)
        blend = image.copy()
        mask = Image.new('L', image.size, 0)
        mask_block = Image.new('L', crop_size, 255)
        mask_block = inset_border(mask_block, int(blend_ratio / 2), 0)
        Image.Image.paste(mask, mask_block, (left, top))
        blend.paste(crop_img, (left, top), crop_img)
        mask = mask.filter(ImageFilter.BoxBlur(radius=blend_ratio / 4))
        mask = mask.filter(ImageFilter.GaussianBlur(radius=blend_ratio / 4))
        blend.putalpha(mask)
        image = Image.alpha_composite(image, blend)
        return (pil2tensor(image), pil2tensor(mask.convert('RGB')))
```