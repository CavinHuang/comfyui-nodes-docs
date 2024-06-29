# Documentation
- Class name: WAS_Mask_Paste_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Paste_Region 节点旨在通过将裁剪区域粘贴到基础遮罩上来操作图像遮罩。它处理混合和锐化，以确保将粘贴区域无缝集成到原始遮罩中。该节点特别适用于需要精确控制遮罩修改的应用，例如在图像编辑或图形设计中。

# Input types
## Required
- mask
    - 遮罩参数是节点的关键输入，代表将裁剪区域粘贴到的基础遮罩。它对于确定输出遮罩的最终外观至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- crop_mask
    - crop_mask 参数定义了要粘贴到基础遮罩上的区域。它在整体操作中扮演着重要角色，因为它直接影响结果遮罩的内容和结构。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- crop_data
    - crop_data 参数提供了要裁剪和粘贴的区域的尺寸和位置信息。它是可选的，但使用时会影响粘贴区域与基础遮罩的对齐方式。
    - Comfy dtype: CROP_DATA
    - Python dtype: Tuple[int, Tuple[int, int, int, int]]
- crop_blending
    - crop_blending 参数控制将裁剪区域粘贴到基础遮罩时的混合强度。它允许微调粘贴区域与周围遮罩之间的过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop_sharpening
    - crop_sharpening 参数确定在粘贴之前要应用于裁剪区域的锐化级别。它可以增强粘贴区域的细节，以获得更好的视觉清晰度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result_mask
    - result_mask 输出参数代表粘贴操作后的最终遮罩。它是一个关键的输出，因为它反映了节点对原始遮罩与裁剪区域的操纵。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- result_crop_mask
    - result_crop_mask 输出参数提供了所有处理步骤之后粘贴区域的遮罩。对于需要单独操作粘贴区域遮罩的应用来说，它是重要的。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Paste_Region:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',), 'crop_mask': ('MASK',), 'crop_data': ('CROP_DATA',), 'crop_blending': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'crop_sharpening': ('INT', {'default': 0, 'min': 0, 'max': 3, 'step': 1})}}
    RETURN_TYPES = ('MASK', 'MASK')
    FUNCTION = 'mask_paste_region'
    CATEGORY = 'WAS Suite/Image/Masking'

    def mask_paste_region(self, mask, crop_mask, crop_data=None, crop_blending=0.25, crop_sharpening=0):
        if crop_data == False:
            cstr('No valid crop data found!').error.print()
            return (pil2mask(Image.new('L', (512, 512), 0)).unsqueeze(0).unsqueeze(1), pil2mask(Image.new('L', (512, 512), 0)).unsqueeze(0).unsqueeze(1))
        mask_pil = Image.fromarray(np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        mask_crop_pil = Image.fromarray(np.clip(255.0 * crop_mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        (result_mask, result_crop_mask) = self.paste_image(mask_pil, mask_crop_pil, crop_data, crop_blending, crop_sharpening)
        return (pil2mask(result_mask).unsqueeze(0).unsqueeze(1), pil2mask(result_crop_mask).unsqueeze(0).unsqueeze(1))

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
        (crop_size, (left, top, right, bottom)) = crop_data
        crop_image = crop_image.resize(crop_size)
        if sharpen_amount > 0:
            for _ in range(int(sharpen_amount)):
                crop_image = crop_image.filter(ImageFilter.SHARPEN)
        blended_image = Image.new('RGBA', image.size, (0, 0, 0, 255))
        blended_mask = Image.new('L', image.size, 0)
        crop_padded = Image.new('RGBA', image.size, (0, 0, 0, 0))
        blended_image.paste(image, (0, 0))
        crop_padded.paste(crop_image, (left, top))
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
        blended_mask.paste(crop_mask, (left, top))
        blended_mask = blended_mask.convert('L')
        blended_image.paste(crop_padded, (0, 0), blended_mask)
        return (ImageOps.invert(blended_image.convert('RGB')).convert('L'), ImageOps.invert(blended_mask.convert('RGB')).convert('L'))
```