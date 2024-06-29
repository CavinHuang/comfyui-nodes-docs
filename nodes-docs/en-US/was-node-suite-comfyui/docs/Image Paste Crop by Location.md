---
tags:
- Image
- ImageComposite
---

# Image Paste Crop by Location
## Documentation
- Class name: `Image Paste Crop by Location`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node specializes in pasting a cropped image onto a specified location within another image, allowing for blending and sharpening adjustments. It provides the capability to seamlessly integrate a cropped image into a larger canvas, with options to fine-tune the integration through blending gradients and sharpening effects, enhancing the overall composition.
## Input types
### Required
- **`image`**
    - The base image onto which the cropped image will be pasted. It serves as the canvas for the operation, determining the final image's dimensions and serving as the background for the pasted crop.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`crop_image`**
    - The cropped image to be pasted onto the base image. This image is the focal point of the operation, and its placement and appearance adjustments (blending and sharpening) significantly influence the outcome.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`top`**
    - The top coordinate where the cropped image will be placed on the base image. It determines the vertical positioning of the crop.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`left`**
    - The left coordinate where the cropped image will be placed on the base image. It determines the horizontal positioning of the crop.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - The right boundary for the cropping operation, affecting how the image blends on the right side.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - The bottom boundary for the cropping operation, affecting how the image blends on the bottom side.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_blending`**
    - The degree to which the cropped image blends with the base image at the edges, creating a gradient transition. This parameter allows for a smoother integration of the crop into the base image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop_sharpening`**
    - The intensity of the sharpening effect applied to the cropped image. This parameter can enhance the details of the crop, making it stand out more or blend better with the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the cropped image has been pasted, blended, and optionally sharpened onto the base image. It represents the final composition, showcasing the integrated appearance of the crop within the larger canvas.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Paste_Crop_Location:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                "required": {
                    "image": ("IMAGE",),
                    "crop_image": ("IMAGE",),
                    "top": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                    "left": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                    "right": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
                    "bottom": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
                    "crop_blending": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "crop_sharpening": ("INT", {"default": 0, "min": 0, "max": 3, "step": 1}),
                }
            }

    RETURN_TYPES = ("IMAGE", "IMAGE")
    FUNCTION = "image_paste_crop_location"

    CATEGORY = "WAS Suite/Image/Process"

    def image_paste_crop_location(self, image, crop_image, top=0, left=0, right=256, bottom=256, crop_blending=0.25, crop_sharpening=0):
        result_image, result_mask = self.paste_image(tensor2pil(image), tensor2pil(crop_image), top, left, right, bottom, crop_blending, crop_sharpening)
        return (result_image, result_mask)

    def paste_image(self, image, crop_image, top=0, left=0, right=256, bottom=256, blend_amount=0.25, sharpen_amount=1):

        image = image.convert("RGBA")
        crop_image = crop_image.convert("RGBA")

        def inset_border(image, border_width=20, border_color=(0)):
            width, height = image.size
            bordered_image = Image.new(image.mode, (width, height), border_color)
            bordered_image.paste(image, (0, 0))
            draw = ImageDraw.Draw(bordered_image)
            draw.rectangle((0, 0, width-1, height-1), outline=border_color, width=border_width)
            return bordered_image

        img_width, img_height = image.size

        # Ensure that the coordinates are within the image bounds
        top = min(max(top, 0), img_height)
        left = min(max(left, 0), img_width)
        bottom = min(max(bottom, 0), img_height)
        right = min(max(right, 0), img_width)

        crop_size = (right - left, bottom - top)
        crop_img = crop_image.resize(crop_size)
        crop_img = crop_img.convert("RGBA")

        if sharpen_amount > 0:
            for _ in range(sharpen_amount):
                crop_img = crop_img.filter(ImageFilter.SHARPEN)

        if blend_amount > 1.0:
            blend_amount = 1.0
        elif blend_amount < 0.0:
            blend_amount = 0.0
        blend_ratio = (max(crop_size) / 2) * float(blend_amount)

        blend = image.copy()
        mask = Image.new("L", image.size, 0)

        mask_block = Image.new("L", crop_size, 255)
        mask_block = inset_border(mask_block, int(blend_ratio/2), (0))

        Image.Image.paste(mask, mask_block, (left, top))
        blend.paste(crop_img, (left, top), crop_img)

        mask = mask.filter(ImageFilter.BoxBlur(radius=blend_ratio/4))
        mask = mask.filter(ImageFilter.GaussianBlur(radius=blend_ratio/4))

        blend.putalpha(mask)
        image = Image.alpha_composite(image, blend)

        return (pil2tensor(image), pil2tensor(mask.convert('RGB')))

```
