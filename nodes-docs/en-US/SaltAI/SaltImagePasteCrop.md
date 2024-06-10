---
tags:
- Image
- ImageComposite
---

# Crop Batch Image Paste
## Documentation
- Class name: `SaltImagePasteCrop`
- Category: `SALT/Image/Process`
- Output node: `False`

This node specializes in blending and sharpening operations for image processing, specifically focusing on pasting cropped images onto target images with adjustable blending and sharpening parameters. It enables the creation of composite images by seamlessly integrating cropped sections into original images, enhancing visual coherence through blending and sharpening techniques.
## Input types
### Required
- **`images`**
    - The original images onto which the cropped images will be pasted. They serve as the base layer for the pasting operation, allowing for the creation of composite images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[PIL.Image]`
- **`crop_images`**
    - The cropped images to be pasted onto the original images. These images are positioned and blended according to specified parameters, enabling the integration into the original images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[PIL.Image]`
- **`crop_data_batch`**
    - A batch of data specifying the location, size, and additional parameters for each crop area in the original images. This data is essential for correctly aligning and integrating the cropped images during the pasting process.
    - Comfy dtype: `CROP_DATA_BATCH`
    - Python dtype: `List[tuple]`
- **`crop_blending`**
    - Determines the intensity of blending between the original and cropped images, affecting the smoothness of the transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop_sharpening`**
    - Specifies the level of sharpening to be applied to the cropped images, enhancing their clarity and detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The result of pasting the cropped images onto the original, after blending and sharpening adjustments.
    - Python dtype: `torch.Tensor`
- **`masks`**
    - Comfy dtype: `IMAGE`
    - Masks indicating the areas affected by the pasting operation, useful for further image processing steps.
    - Python dtype: `torch.Tensor`
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
