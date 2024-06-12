---
tags:
- Color
- ColorChannelManipulation
---

# Image Select Channel
## Documentation
- Class name: `Image Select Channel`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node is designed to isolate and extract a specific color channel (red, green, or blue) from an input image, converting the selected channel into a greyscale image that is then recombined into a three-channel image where all channels are the same, effectively filtering the image through the lens of the selected color channel.
## Input types
### Required
- **`image`**
    - The input image to be processed. It is the primary data on which the channel selection operation is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`channel`**
    - Specifies the color channel ('red', 'green', or 'blue') to isolate from the input image. This selection determines which channel of the image will be extracted and processed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image where the selected color channel has been isolated and converted into a greyscale image, then recombined into a three-channel image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Select_Channel:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "channel": (['red', 'green', 'blue'],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "select_channel"

    CATEGORY = "WAS Suite/Image/Process"

    def select_channel(self, image, channel='red'):

        image = self.convert_to_single_channel(tensor2pil(image), channel)

        return (pil2tensor(image), )

    def convert_to_single_channel(self, image, channel='red'):

        # Convert to RGB mode to access individual channels
        image = image.convert('RGB')

        # Extract the desired channel and convert to greyscale
        if channel == 'red':
            channel_img = image.split()[0].convert('L')
        elif channel == 'green':
            channel_img = image.split()[1].convert('L')
        elif channel == 'blue':
            channel_img = image.split()[2].convert('L')
        else:
            raise ValueError(
                "Invalid channel option. Please choose 'red', 'green', or 'blue'.")

        # Convert the greyscale channel back to RGB mode
        channel_img = Image.merge(
            'RGB', (channel_img, channel_img, channel_img))

        return channel_img

```
