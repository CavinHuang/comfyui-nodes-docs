---
tags:
- Image
- ImageComposite
---

# Mask Paste Region
## Documentation
- Class name: `Mask Paste Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The node is designed to paste a specified region within an image mask, allowing for precise manipulation and modification of mask areas. It focuses on enhancing or altering the mask's characteristics by integrating selected regions, thereby facilitating targeted adjustments in image processing tasks.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the primary image mask to be processed. It is essential for identifying the area within which the pasting operation will be executed, directly influencing the node's execution and the resulting modified mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`crop_mask`**
    - The 'crop_mask' parameter specifies the mask of the region to be pasted into the primary mask. It defines the shape and area of the region being integrated into the 'mask' parameter.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`crop_data`**
    - Optional parameter providing additional data related to the crop, such as its position or size. It can influence how the 'crop_mask' is integrated into the 'mask'.
    - Comfy dtype: `CROP_DATA`
    - Python dtype: `Optional[torch.Tensor]`
- **`crop_blending`**
    - Specifies the blending level between the 'mask' and 'crop_mask' during the pasting operation. A higher value results in smoother blending.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop_sharpening`**
    - Determines the level of sharpening applied to the 'crop_mask' before it is pasted onto the 'mask'. This can enhance the clarity of the pasted region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - This output represents the modified image mask after the pasting operation has been applied. It encapsulates the alterations made to the original mask, showcasing the region that has been pasted as per the specified parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Paste_Region:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "crop_mask": ("MASK",),
                "crop_data": ("CROP_DATA",),
                "crop_blending": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01}),
                "crop_sharpening": ("INT", {"default": 0, "min": 0, "max": 3, "step": 1}),
            }
        }

    RETURN_TYPES = ("MASK", "MASK")
    FUNCTION = "mask_paste_region"

    CATEGORY = "WAS Suite/Image/Masking"

    def mask_paste_region(self, mask, crop_mask, crop_data=None, crop_blending=0.25, crop_sharpening=0):

        if crop_data == False:
            cstr("No valid crop data found!").error.print()
            return( pil2mask(Image.new("L", (512, 512), 0)).unsqueeze(0).unsqueeze(1),
                    pil2mask(Image.new("L", (512, 512), 0)).unsqueeze(0).unsqueeze(1) )

        mask_pil = Image.fromarray(np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        mask_crop_pil = Image.fromarray(np.clip(255. * crop_mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))

        result_mask, result_crop_mask = self.paste_image(mask_pil, mask_crop_pil, crop_data, crop_blending, crop_sharpening)

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
                        color_value = int(((y - black_end) / (size[1] - black_end)) * 255)
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
        blended_mask = Image.new('L', image.size, 0)  # Update to 'L' mode for MASK image
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

        return (ImageOps.invert(blended_image.convert("RGB")).convert("L"), ImageOps.invert(blended_mask.convert("RGB")).convert("L"))

```
