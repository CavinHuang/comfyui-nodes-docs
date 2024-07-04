
# Documentation
- Class name: SaltImagePasteCrop
- Category: SALT/Image/Process
- Output node: False

本节点主要用于图像处理中的融合和锐化操作，尤其专注于将裁剪后的图像粘贴到目标图像上，并可调整融合和锐化参数。它能够通过无缝集成裁剪部分到原始图像中来创建合成图像，并通过融合和锐化技术增强视觉连贯性。

# Input types
## Required
- images
    - 作为粘贴操作的基础图层，这些原始图像将被用来粘贴裁剪后的图像。通过这一操作，可以创建合成图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image]
- crop_images
    - 这些裁剪后的图像将被粘贴到原始图像上。它们会根据指定的参数进行定位和融合，从而实现与原始图像的整合。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image]
- crop_data_batch
    - 一批数据，用于指定原始图像中每个裁剪区域的位置、大小和其他参数。这些数据对于在粘贴过程中正确对齐和整合裁剪图像至关重要。
    - Comfy dtype: CROP_DATA_BATCH
    - Python dtype: List[tuple]
- crop_blending
    - 决定原始图像和裁剪图像之间的融合强度，影响过渡的平滑程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop_sharpening
    - 指定要应用于裁剪图像的锐化级别，以增强其清晰度和细节。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- images
    - 经过融合和锐化调整后，将裁剪图像粘贴到原始图像上的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- masks
    - 指示受粘贴操作影响的区域的蒙版，对后续图像处理步骤有用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltImagePasteCrop:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                "required": {
                    "images": ("IMAGE",),
                    "crop_images": ("IMAGE",),
                    "crop_data_batch": ("CROP_DATA_BATCH",),
                    "crop_blending": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "crop_sharpening": ("INT", {"default": 0, "min": 0, "max": 3, "step": 1}),
                }
            }
            
    RETURN_TYPES = ("IMAGE", "IMAGE")
    RETURN_NAMES = ("images", "masks")

    FUNCTION = "image_paste_crop"
    CATEGORY = f"{NAME}/Image/Process"

    def image_paste_crop(self, images, crop_images, crop_data_batch=None, crop_blending=0.25, crop_sharpening=0):
        pasted_images = []
        pasted_masks = []

        for i, image in enumerate(images):
            image = tensor2pil(image)
            crop_image = tensor2pil(crop_images[i].unsqueeze(0))
            
            if crop_data_batch is not None:
                crop_data = crop_data_batch[i]
                pasted_image, pasted_mask = self.paste_image(image, crop_image, crop_data, crop_blending, crop_sharpening)
            else:
                print(f"No valid crop data found for Image {i}")
                pasted_image = pil2tensor(image)
                pasted_mask = pil2tensor(Image.new("RGB", image.size, (0,0,0)))
            
            pasted_images.append(pasted_image)
            pasted_masks.append(pasted_mask)

        pasted_images_batch = torch.cat(pasted_images, dim=0)
        pasted_masks_batch = torch.cat(pasted_masks, dim=0)

        return (pasted_images_batch, pasted_masks_batch)

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
                    if y <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int(((y - black_end) / (size[1] - black_end)) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(0, y), (size[0], y)], fill=color)
            elif direction == 'horizontal':
                black_end = int(size[0] * (1 - white_ratio))
                range_start = 0
                range_end = size[0]
                range_step = 1
                for x in range(range_start, range_end, range_step):
                    if x <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int(((x - black_end) / (size[0] - black_end)) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(x, 0), (x, size[1])], fill=color)
                    
            return image.convert("L")
    
        crop_size, (left, top, right, bottom) = crop_data
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
        blended_mask = blended_mask.convert("L")
        blended_image.paste(crop_padded, (0, 0), blended_mask)

        return (pil2tensor(blended_image.convert("RGB")), pil2tensor(blended_mask.convert("RGB")))

```
