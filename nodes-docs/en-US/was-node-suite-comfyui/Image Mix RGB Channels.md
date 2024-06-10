---
tags:
- Color
- ColorChannelManipulation
---

# Image Mix RGB Channels
## Documentation
- Class name: `Image Mix RGB Channels`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node is designed to merge individual red, green, and blue image channels into a single RGB image. It abstracts the complexity of channel manipulation and blending, providing a straightforward way to combine these color components into a cohesive visual representation.
## Input types
### Required
- **`red_channel`**
    - The red channel of the image, representing the intensity of the red color component across the image. It plays a crucial role in determining the overall hue and saturation of the merged RGB image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`green_channel`**
    - The green channel of the image, representing the intensity of the green color component. It significantly influences the final color balance and appearance of the merged RGB image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`blue_channel`**
    - The blue channel of the image, indicating the intensity of the blue color component. This channel is essential for achieving the desired depth and tone in the final RGB image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after merging the red, green, and blue channels. It is a full-color RGB image that combines the input channels into a single, visually cohesive output.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_RGB_Merge:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "red_channel": ("IMAGE",),
                "green_channel": ("IMAGE",),
                "blue_channel": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "merge_channels"

    CATEGORY = "WAS Suite/Image/Process"

    def merge_channels(self, red_channel, green_channel, blue_channel):

        # Apply mix rgb channels
        image = self.mix_rgb_channels(tensor2pil(red_channel).convert('L'), tensor2pil(
            green_channel).convert('L'), tensor2pil(blue_channel).convert('L'))

        return (pil2tensor(image), )

    def mix_rgb_channels(self, red, green, blue):
        # Create an empty image with the same size as the channels
        width, height = red.size
        merged_img = Image.new('RGB', (width, height))

        # Merge the channels into the new image
        merged_img = Image.merge('RGB', (red, green, blue))

        return merged_img

```
