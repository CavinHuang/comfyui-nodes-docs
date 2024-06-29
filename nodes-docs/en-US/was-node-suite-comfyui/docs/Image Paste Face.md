---
tags:
- Image
- ImageComposite
---

# Image Paste Face
## Documentation
- Class name: `Image Paste Face`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node specializes in seamlessly integrating a cropped image onto a target image, with options for blending and sharpening to ensure a natural and aesthetically pleasing result. It does not specifically focus on facial detection or adjustment but rather on the general process of pasting and adjusting an image segment within another image.
## Input types
### Required
- **`image`**
    - The base image onto which the cropped image will be pasted. It serves as the backdrop for the integration process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image.Image`
- **`crop_image`**
    - The cropped image that will be pasted onto the base image. This image is the focal point of the operation, being integrated into the base image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image.Image`
- **`crop_data`**
    - Data specifying how the cropped image should be adjusted and aligned on the base image. It includes positional adjustments and size modifications to ensure a proper fit.
    - Comfy dtype: `CROP_DATA`
    - Python dtype: `Dict[str, int]`
- **`crop_blending`**
    - Determines the degree of blending between the cropped image and the base image, affecting the smoothness of the integration.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop_sharpening`**
    - Controls the sharpness of the pasted image, enhancing the clarity and detail of the image features after integration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the cropped image has been pasted and integrated with the base image, potentially blended and sharpened for aesthetic enhancement.
    - Python dtype: `Image.Image`
- **`MASK_IMAGE`**
    - Comfy dtype: `IMAGE`
    - The mask image representing the area affected by the pasting operation, useful for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Paste_Face_Crop:
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
    RETURN_NAMES = ("IMAGE", "MASK_IMAGE")
    FUNCTION = "image_paste_face"

    CATEGORY = "WAS Suite/Image/Process"

    def image_paste_face(self, image, crop_image, crop_data=None, crop_blending=0.25, crop_sharpening=0):

        if crop_data == False:
            cstr("No valid crop data found!").error.print()
            return (image, pil2tensor(Image.new("RGB", tensor2pil(image).size, (0,0,0))))

        result_image, result_mask = self.paste_image(tensor2pil(image), tensor2pil(crop_image), crop_data, crop_blending, crop_sharpening)
        return(result_image, result_mask)

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

        crop_size, (top, left, right, bottom) = crop_data
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
        blended_mask = blended_mask.convert("L")
        blended_image.paste(crop_padded, (0, 0), blended_mask)

        return (pil2tensor(blended_image.convert("RGB")), pil2tensor(blended_mask.convert("RGB")))

```
