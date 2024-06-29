---
tags:
- Image
- ImageComposite
---

# Image Paste Crop
## Documentation
- Class name: `Image Paste Crop`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node specializes in blending a cropped image onto another image, applying optional sharpening and gradient blending based on specified parameters. It allows for precise control over the cropping, blending, and sharpening processes to achieve a seamlessly integrated final image.
## Input types
### Required
- **`image`**
    - The base image onto which the cropped image will be pasted. It serves as the background for the operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`crop_image`**
    - The image to be cropped and pasted onto the base image. This image is manipulated according to the crop data and other parameters before being integrated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`crop_data`**
    - Specifies the dimensions and coordinates for cropping the 'crop_image'. It includes the crop size and the bounding box coordinates.
    - Comfy dtype: `CROP_DATA`
    - Python dtype: `Tuple[Tuple[int, int], Tuple[int, int, int, int]]`
- **`crop_blending`**
    - Determines the intensity of the gradient blending at the edges of the cropped image, affecting how seamlessly it integrates with the base image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop_sharpening`**
    - Specifies the level of sharpening to apply to the cropped image, enhancing its details before pasting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the cropped image has been pasted and blended onto the base image.
    - Python dtype: `PIL.Image.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Paste_Crop:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                "required": {
                    "image": ("IMAGE",),
                    "crop_image": ("IMAGE",),
                    "crop_data": ("CROP_DATA",),
                    "crop_blending": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "crop_sharpening": ("INT", {"default": 0, "min": 0, "max": 3, "step": 1}),
                }
            }

    RETURN_TYPES = ("IMAGE", "IMAGE")
    FUNCTION = "image_paste_crop"

    CATEGORY = "WAS Suite/Image/Process"

    def image_paste_crop(self, image, crop_image, crop_data=None, crop_blending=0.25, crop_sharpening=0):

        if crop_data == False:
            cstr("No valid crop data found!").error.print()
            return (image, pil2tensor(Image.new("RGB", tensor2pil(image).size, (0,0,0))))

        result_image, result_mask = self.paste_image(tensor2pil(image), tensor2pil(crop_image), crop_data, crop_blending, crop_sharpening)

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
