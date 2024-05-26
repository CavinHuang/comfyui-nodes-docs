# Documentation
- Class name: BatchUncrop
- Category: KJNodes/masking
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

BatchUncrop节点旨在将裁剪后的图像恢复到其原始大小和形状。它通过调整大小和混合裁剪区域与原始图像来智能处理取消裁剪过程，同时考虑边框混合和缩放因子，以确保无缝集成。此节点在数据增强工作流程中扮演着关键角色，其中图像的原始上下文对于下游任务至关重要。

# Input types
## Required
- original_images
    - original_images参数至关重要，因为它保存了裁剪前的图像引用。这对于节点准确恢复裁剪后的图像到其原始状态至关重要。此输入直接影响取消裁剪过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image.Image]
- cropped_images
    - cropped_images输入代表已裁剪并需要恢复的图像。它是BatchUncrop节点的关键组成部分，因为它提供了取消裁剪操作的源材料。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image.Image]
- bboxes
    - bboxes参数定义了原始图像中被裁剪出的区域。它对于节点在取消裁剪过程中正确识别和恢复这些区域很重要。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
## Optional
- border_blending
    - border_blending参数控制取消裁剪过程中裁剪和原始图像边框的混合效果。它对于实现图像之间的平滑过渡非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop_rescale
    - crop_rescale参数调整将裁剪区域粘贴回原始图像之前的缩放比例。它影响取消裁剪区域的最终大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- border_top
    - border_top参数决定在取消裁剪过程中是否应在图像顶部添加边框。它有助于恢复图像的整体外观。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- border_bottom
    - border_bottom参数指定在取消裁剪时是否应在图像底部包括边框。它影响图像的最终视觉效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- border_left
    - border_left参数控制取消裁剪期间是否应在图像左侧添加边框。它是节点自定义图像边框功能的一部分。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- border_right
    - border_right参数指示在执行取消裁剪时是否应将边框添加到图像的右侧。这对于保持图像的美学完整性至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- uncropped_images
    - uncropped_images输出包含取消裁剪过程后的最终图像。它代表了恢复的图像，原始上下文保持不变，可供进一步使用或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class BatchUncrop:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'original_images': ('IMAGE',), 'cropped_images': ('IMAGE',), 'bboxes': ('BBOX',), 'border_blending': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'crop_rescale': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'border_top': ('BOOLEAN', {'default': True}), 'border_bottom': ('BOOLEAN', {'default': True}), 'border_left': ('BOOLEAN', {'default': True}), 'border_right': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'uncrop'
    CATEGORY = 'KJNodes/masking'

    def uncrop(self, original_images, cropped_images, bboxes, border_blending, crop_rescale, border_top, border_bottom, border_left, border_right):

        def inset_border(image, border_width, border_color, border_top, border_bottom, border_left, border_right):
            draw = ImageDraw.Draw(image)
            (width, height) = image.size
            if border_top:
                draw.rectangle((0, 0, width, border_width), fill=border_color)
            if border_bottom:
                draw.rectangle((0, height - border_width, width, height), fill=border_color)
            if border_left:
                draw.rectangle((0, 0, border_width, height), fill=border_color)
            if border_right:
                draw.rectangle((width - border_width, 0, width, height), fill=border_color)
            return image
        if len(original_images) != len(cropped_images):
            raise ValueError(f'The number of original_images ({len(original_images)}) and cropped_images ({len(cropped_images)}) should be the same')
        if len(bboxes) > len(original_images):
            print(f'Warning: Dropping excess bounding boxes. Expected {len(original_images)}, but got {len(bboxes)}')
            bboxes = bboxes[:len(original_images)]
        elif len(bboxes) < len(original_images):
            raise ValueError('There should be at least as many bboxes as there are original and cropped images')
        input_images = tensor2pil(original_images)
        crop_imgs = tensor2pil(cropped_images)
        out_images = []
        for i in range(len(input_images)):
            img = input_images[i]
            crop = crop_imgs[i]
            bbox = bboxes[i]
            (bb_x, bb_y, bb_width, bb_height) = bbox
            paste_region = bbox_to_region((bb_x, bb_y, bb_width, bb_height), img.size)
            scale_x = crop_rescale
            scale_y = crop_rescale
            paste_region = (round(paste_region[0] * scale_x), round(paste_region[1] * scale_y), round(paste_region[2] * scale_x), round(paste_region[3] * scale_y))
            crop = crop.resize((round(paste_region[2] - paste_region[0]), round(paste_region[3] - paste_region[1])))
            crop_img = crop.convert('RGB')
            if border_blending > 1.0:
                border_blending = 1.0
            elif border_blending < 0.0:
                border_blending = 0.0
            blend_ratio = max(crop_img.size) / 2 * float(border_blending)
            blend = img.convert('RGBA')
            mask = Image.new('L', img.size, 0)
            mask_block = Image.new('L', (paste_region[2] - paste_region[0], paste_region[3] - paste_region[1]), 255)
            mask_block = inset_border(mask_block, round(blend_ratio / 2), 0, border_top, border_bottom, border_left, border_right)
            mask.paste(mask_block, paste_region)
            blend.paste(crop_img, paste_region)
            mask = mask.filter(ImageFilter.BoxBlur(radius=blend_ratio / 4))
            mask = mask.filter(ImageFilter.GaussianBlur(radius=blend_ratio / 4))
            blend.putalpha(mask)
            img = Image.alpha_composite(img.convert('RGBA'), blend)
            out_images.append(img.convert('RGB'))
        return (pil2tensor(out_images),)
```