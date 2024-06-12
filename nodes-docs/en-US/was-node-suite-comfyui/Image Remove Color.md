---
tags:
- Color
- ColorChannelManipulation
---

# Image Remove Color
## Documentation
- Class name: `Image Remove Color`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

The node is designed to selectively remove a specific color from an image, replacing it with another color. It operates by comparing each pixel's color to the target color within a defined threshold, effectively filtering out the target color and substituting it with a predefined replacement color. This functionality is useful for tasks such as background removal or color correction in images.
## Input types
### Required
- **`image`**
    - The input image from which a specific color is to be removed. It serves as the primary data for the node's operation, determining the visual content that will undergo color removal and replacement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`target_red`**
    - Specifies the red component of the target color to be removed from the image. It determines the red value of the color that the node will seek to filter out.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_green`**
    - Specifies the green component of the target color to be removed from the image. It determines the green value of the color that the node will seek to filter out.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_blue`**
    - Specifies the blue component of the target color to be removed from the image. It determines the blue value of the color that the node will seek to filter out.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`replace_red`**
    - Specifies the red component of the replacement color. This color will fill the areas where the target color has been removed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`replace_green`**
    - Specifies the green component of the replacement color. This color will fill the areas where the target color has been removed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`replace_blue`**
    - Specifies the blue component of the replacement color. This color will fill the areas where the target color has been removed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`clip_threshold`**
    - Defines the sensitivity of the color comparison, determining how closely a pixel's color must match the target color to be replaced. A lower threshold means a stricter match is required, while a higher threshold allows for more variation in the colors that are considered a match.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after the specified color has been removed and replaced with the replacement color. This image reflects the changes made during the color removal process, showcasing the effect of the target color's substitution.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Remove_Color:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "target_red": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "target_green": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "target_blue": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "replace_red": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "replace_green": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "replace_blue": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "clip_threshold": ("INT", {"default": 10, "min": 0, "max": 255, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_remove_color"

    CATEGORY = "WAS Suite/Image/Process"

    def image_remove_color(self, image, clip_threshold=10, target_red=255, target_green=255, target_blue=255, replace_red=255, replace_green=255, replace_blue=255):
        return (pil2tensor(self.apply_remove_color(tensor2pil(image), clip_threshold, (target_red, target_green, target_blue), (replace_red, replace_green, replace_blue))), )

    def apply_remove_color(self, image, threshold=10, color=(255, 255, 255), rep_color=(0, 0, 0)):
        # Create a color image with the same size as the input image
        color_image = Image.new('RGB', image.size, color)

        # Calculate the difference between the input image and the color image
        diff_image = ImageChops.difference(image, color_image)

        # Convert the difference image to grayscale
        gray_image = diff_image.convert('L')

        # Apply a threshold to the grayscale difference image
        mask_image = gray_image.point(lambda x: 255 if x > threshold else 0)

        # Invert the mask image
        mask_image = ImageOps.invert(mask_image)

        # Apply the mask to the original image
        result_image = Image.composite(
            Image.new('RGB', image.size, rep_color), image, mask_image)

        return result_image

```
