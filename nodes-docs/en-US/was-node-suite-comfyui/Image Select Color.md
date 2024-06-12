---
tags:
- Color
- ColorChannelManipulation
---

# Image Select Color
## Documentation
- Class name: `Image Select Color`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node is designed to filter and highlight pixels within a specified color range in an image. It allows users to select a color by specifying RGB values and a variance, then creates a new image highlighting only those pixels that fall within the defined color range. This functionality is useful for tasks such as color-based segmentation or identifying objects of a specific color within an image.
## Input types
### Required
- **`image`**
    - The input image to be processed. The node will highlight pixels within the specified color range of this image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`red`**
    - The red component of the target color. This value, along with the specified variance, defines the range of red values to be highlighted in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green component of the target color. This value, along with the specified variance, defines the range of green values to be highlighted in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue component of the target color. This value, along with the specified variance, defines the range of blue values to be highlighted in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`variance`**
    - The allowed variance from the specified RGB values. This defines the tolerance for what is considered a match to the target color, allowing for slight variations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image where only pixels within the specified color range are highlighted. Pixels outside this range are set to black, focusing attention on the selected color.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Select_Color:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "red": ("INT", {"default": 255.0, "min": 0.0, "max": 255.0, "step": 0.1}),
                "green": ("INT", {"default": 255.0, "min": 0.0, "max": 255.0, "step": 0.1}),
                "blue": ("INT", {"default": 255.0, "min": 0.0, "max": 255.0, "step": 0.1}),
                "variance": ("INT", {"default": 10, "min": 0, "max": 255, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "select_color"

    CATEGORY = "WAS Suite/Image/Process"

    def select_color(self, image, red=255, green=255, blue=255, variance=10):

        image = self.color_pick(tensor2pil(image), red, green, blue, variance)

        return (pil2tensor(image), )

    def color_pick(self, image, red=255, green=255, blue=255, variance=10):
        # Convert image to RGB mode
        image = image.convert('RGB')

        # Create a new black image of the same size as the input image
        selected_color = Image.new('RGB', image.size, (0, 0, 0))

        # Get the width and height of the image
        width, height = image.size

        # Loop through every pixel in the image
        for x in range(width):
            for y in range(height):
                # Get the color of the pixel
                pixel = image.getpixel((x, y))
                r, g, b = pixel

                # Check if the pixel is within the specified color range
                if ((r >= red-variance) and (r <= red+variance) and
                    (g >= green-variance) and (g <= green+variance) and
                        (b >= blue-variance) and (b <= blue+variance)):
                    # Set the pixel in the selected_color image to the RGB value of the pixel
                    selected_color.putpixel((x, y), (r, g, b))

        # Return the selected color image
        return selected_color

```
