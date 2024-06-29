# Documentation
- Class name: BatchUncropAdvanced
- Category: KJNodes/masking
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

BatchUncropAdvanced 节点旨在通过使用边界框坐标和掩码将裁剪后的图像精确放回原始图像的上下文中，从而恢复其原始状态。它考虑了边框混合和缩放因子，以实现自然的外观，确保裁剪部分与原始图像的无缝集成。

# Input types
## Required
- original_images
    - 原始图像作为基础画布，裁剪后的图像将重新插入其中。它们对于保持最终输出的整体上下文和结构至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image.Image]
- cropped_images
    - 需要还原到原始图像中的裁剪图像。这些图像携带了将要重新整合到原始上下文中的修改或专注的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_masks
    - 与裁剪图像对应的掩码，定义了将重新整合回原始图像的兴趣区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- combined_crop_mask
    - 一个可选的组合掩码，可以用来代替单独的裁剪掩码，以实现裁剪区域的统一整合。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- bboxes
    - 边界框提供原始图像中裁剪区域的坐标，对于精确放置至关重要。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- border_blending
    - 一个浮点值，用于确定原始图像和裁剪图像之间的边框混合强度，以实现平滑过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop_rescale
    - 在裁剪图像调整大小并重新插入原始图像之前应用的缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- use_combined_mask
    - 一个布尔标志，指示在取消裁剪操作中是否使用组合掩码而不是单独的裁剪掩码。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- use_square_mask
    - 一个布尔标志，设置后在混合过程中使用正方形掩码而不是原始掩码形状。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- combined_bounding_box
    - 一个可选参数，它提供了组合掩码的预定义边界框，覆盖了各个边界框。
    - Comfy dtype: BBOX
    - Python dtype: Tuple[int, int, int, int]=None

# Output types
- output_images
    - BatchUncropAdvanced 节点的输出是原始图像，裁剪区域已还原到其原始位置，实现了图像的无缝恢复。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class BatchUncropAdvanced:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'original_images': ('IMAGE',), 'cropped_images': ('IMAGE',), 'cropped_masks': ('MASK',), 'combined_crop_mask': ('MASK',), 'bboxes': ('BBOX',), 'border_blending': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'crop_rescale': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'use_combined_mask': ('BOOLEAN', {'default': False}), 'use_square_mask': ('BOOLEAN', {'default': True})}, 'optional': {'combined_bounding_box': ('BBOX', {'default': None})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'uncrop'
    CATEGORY = 'KJNodes/masking'

    def uncrop(self, original_images, cropped_images, cropped_masks, combined_crop_mask, bboxes, border_blending, crop_rescale, use_combined_mask, use_square_mask, combined_bounding_box=None):

        def inset_border(image, border_width=20, border_color=0):
            (width, height) = image.size
            bordered_image = Image.new(image.mode, (width, height), border_color)
            bordered_image.paste(image, (0, 0))
            draw = ImageDraw.Draw(bordered_image)
            draw.rectangle((0, 0, width - 1, height - 1), outline=border_color, width=border_width)
            return bordered_image
        if len(original_images) != len(cropped_images):
            raise ValueError(f'The number of original_images ({len(original_images)}) and cropped_images ({len(cropped_images)}) should be the same')
        if len(bboxes) > len(original_images):
            print(f'Warning: Dropping excess bounding boxes. Expected {len(original_images)}, but got {len(bboxes)}')
            bboxes = bboxes[:len(original_images)]
        elif len(bboxes) < len(original_images):
            raise ValueError('There should be at least as many bboxes as there are original and cropped images')
        crop_imgs = tensor2pil(cropped_images)
        input_images = tensor2pil(original_images)
        out_images = []
        for i in range(len(input_images)):
            img = input_images[i]
            crop = crop_imgs[i]
            bbox = bboxes[i]
            if use_combined_mask:
                (bb_x, bb_y, bb_width, bb_height) = combined_bounding_box[0]
                paste_region = bbox_to_region((bb_x, bb_y, bb_width, bb_height), img.size)
                mask = combined_crop_mask[i]
            else:
                (bb_x, bb_y, bb_width, bb_height) = bbox
                paste_region = bbox_to_region((bb_x, bb_y, bb_width, bb_height), img.size)
                mask = cropped_masks[i]
            scale_x = scale_y = crop_rescale
            paste_region = (round(paste_region[0] * scale_x), round(paste_region[1] * scale_y), round(paste_region[2] * scale_x), round(paste_region[3] * scale_y))
            crop = crop.resize((round(paste_region[2] - paste_region[0]), round(paste_region[3] - paste_region[1])))
            crop_img = crop.convert('RGB')
            if border_blending > 1.0:
                border_blending = 1.0
            elif border_blending < 0.0:
                border_blending = 0.0
            blend_ratio = max(crop_img.size) / 2 * float(border_blending)
            blend = img.convert('RGBA')
            if use_square_mask:
                mask = Image.new('L', img.size, 0)
                mask_block = Image.new('L', (paste_region[2] - paste_region[0], paste_region[3] - paste_region[1]), 255)
                mask_block = inset_border(mask_block, round(blend_ratio / 2), 0)
                mask.paste(mask_block, paste_region)
            else:
                original_mask = tensor2pil(mask)[0]
                original_mask = original_mask.resize((paste_region[2] - paste_region[0], paste_region[3] - paste_region[1]))
                mask = Image.new('L', img.size, 0)
                mask.paste(original_mask, paste_region)
            mask = mask.filter(ImageFilter.BoxBlur(radius=blend_ratio / 4))
            mask = mask.filter(ImageFilter.GaussianBlur(radius=blend_ratio / 4))
            blend.paste(crop_img, paste_region)
            blend.putalpha(mask)
            img = Image.alpha_composite(img.convert('RGBA'), blend)
            out_images.append(img.convert('RGB'))
        return (pil2tensor(out_images),)
```