---
tags:
- Image
- ImagePadding
- ImageTransformation
---

# Image Padding
## Documentation
- Class name: `Image Padding`
- Category: `WAS Suite/Image/Transform`
- Output node: `False`

The Image Padding node is designed to modify the spatial dimensions of an image by adding padding around its edges. This process can include creating feathered edges for a smoother transition between the image and the padding, as well as applying additional transformations to ensure the padded image maintains its visual integrity. The node can handle various padding configurations and is capable of generating a mask to highlight the padded areas.
## Input types
### Required
- **`image`**
    - The original image to which padding will be applied. This is the primary input over which all padding and feathering operations are performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`feathering`**
    - Determines the radius of the feathering effect applied at the edges of the padding, creating a smooth transition between the image and the padding.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`feather_second_pass`**
    - A boolean flag indicating whether a second pass of padding adjustments should be applied, potentially refining the padding process for better visual results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`left_padding`**
    - Specifies the width of the padding to be added to the left side of the image. This parameter directly influences the horizontal dimension of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right_padding`**
    - Specifies the width of the padding to be added to the right side of the image. This parameter directly influences the horizontal dimension of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top_padding`**
    - Specifies the height of the padding to be added to the top of the image. This parameter directly influences the vertical dimension of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom_padding`**
    - Specifies the height of the padding to be added to the bottom of the image. This parameter directly influences the vertical dimension of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after padding has been applied, potentially including a feathered edge for smoother transitions.
    - Python dtype: `PIL.Image.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Padding:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "feathering": ("INT", {"default": 120, "min": 0, "max": 2048, "step": 1}),
                "feather_second_pass": (["true", "false"],),
                "left_padding": ("INT", {"default": 512, "min": 8, "max": 48000, "step": 1}),
                "right_padding": ("INT", {"default": 512, "min": 8, "max": 48000, "step": 1}),
                "top_padding": ("INT", {"default": 512, "min": 8, "max": 48000, "step": 1}),
                "bottom_padding": ("INT", {"default": 512, "min": 8, "max": 48000, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE", "IMAGE")
    FUNCTION = "image_padding"

    CATEGORY = "WAS Suite/Image/Transform"

    def image_padding(self, image, feathering, left_padding, right_padding, top_padding, bottom_padding, feather_second_pass=True):
        padding = self.apply_image_padding(tensor2pil(
            image), left_padding, right_padding, top_padding, bottom_padding, feathering, second_pass=True)
        return (pil2tensor(padding[0]), pil2tensor(padding[1]))

    def apply_image_padding(self, image, left_pad=100, right_pad=100, top_pad=100, bottom_pad=100, feather_radius=50, second_pass=True):
        # Create a mask for the feathered edge
        mask = Image.new('L', image.size, 255)
        draw = ImageDraw.Draw(mask)

        # Draw black rectangles at each edge of the image with the specified feather radius
        draw.rectangle((0, 0, feather_radius*2, image.height), fill=0)
        draw.rectangle((image.width-feather_radius*2, 0,
                       image.width, image.height), fill=0)
        draw.rectangle((0, 0, image.width, feather_radius*2), fill=0)
        draw.rectangle((0, image.height-feather_radius*2,
                       image.width, image.height), fill=0)

        # Blur the mask to create a smooth gradient between the black shapes and the white background
        mask = mask.filter(ImageFilter.GaussianBlur(radius=feather_radius))

        # Apply mask if second_pass is False, apply both masks if second_pass is True
        if second_pass:

            # Create a second mask for the additional feathering pass
            mask2 = Image.new('L', image.size, 255)
            draw2 = ImageDraw.Draw(mask2)

            # Draw black rectangles at each edge of the image with a smaller feather radius
            feather_radius2 = int(feather_radius / 4)
            draw2.rectangle((0, 0, feather_radius2*2, image.height), fill=0)
            draw2.rectangle((image.width-feather_radius2*2, 0,
                            image.width, image.height), fill=0)
            draw2.rectangle((0, 0, image.width, feather_radius2*2), fill=0)
            draw2.rectangle((0, image.height-feather_radius2*2,
                            image.width, image.height), fill=0)

            # Blur the mask to create a smooth gradient between the black shapes and the white background
            mask2 = mask2.filter(
                ImageFilter.GaussianBlur(radius=feather_radius2))

            feathered_im = Image.new('RGBA', image.size, (0, 0, 0, 0))
            feathered_im.paste(image, (0, 0), mask)
            feathered_im.paste(image, (0, 0), mask)

            # Apply the second mask to the feathered image
            feathered_im.paste(image, (0, 0), mask2)
            feathered_im.paste(image, (0, 0), mask2)

        else:

            # Apply the fist maskk
            feathered_im = Image.new('RGBA', image.size, (0, 0, 0, 0))
            feathered_im.paste(image, (0, 0), mask)

        # Calculate the new size of the image with padding added
        new_size = (feathered_im.width + left_pad + right_pad,
                    feathered_im.height + top_pad + bottom_pad)

        # Create a new transparent image with the new size
        new_im = Image.new('RGBA', new_size, (0, 0, 0, 0))

        # Paste the feathered image onto the new image with the padding
        new_im.paste(feathered_im, (left_pad, top_pad))

        # Create Padding Mask
        padding_mask = Image.new('L', new_size, 0)

        # Create a mask where the transparent pixels have a gradient
        gradient = [(int(255 * (1 - p[3] / 255)) if p[3] != 0 else 255)
                    for p in new_im.getdata()]
        padding_mask.putdata(gradient)

        # Save the new image with alpha channel as a PNG file
        return (new_im, padding_mask.convert('RGB'))

```
