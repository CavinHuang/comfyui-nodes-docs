---
tags:
- Color
- ColorChannelManipulation
---

# Image Extract Channel
## Documentation
- Class name: `ImageExtractChannel`
- Category: `Art Venture/Utils`
- Output node: `False`

This node is designed to extract a specific channel (Red, Green, Blue, or Alpha) from a given set of images. It allows for the manipulation and analysis of individual color channels, which can be crucial for various image processing tasks, such as creating masks or isolating color components.
## Input types
### Required
- **`images`**
    - The images from which a specific channel will be extracted. This input is crucial for determining the source images to be processed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`channel`**
    - Specifies the color channel (Red, Green, Blue, or Alpha) to be extracted from the images. This choice directly affects the output by isolating the desired channel.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`channel_data`**
    - Comfy dtype: `MASK`
    - The extracted channel data from the input images, provided as a mask. This output is useful for further image processing or analysis tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageExtractChannel:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "channel": (["R", "G", "B", "A"],),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("channel_data",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_extract_alpha"

    def image_extract_alpha(self, images: torch.Tensor, channel):
        # images in shape (N, H, W, C)

        if len(images.shape) < 4:
            images = images.unsqueeze(3).repeat(1, 1, 1, 3)

        if channel == "A" and images.shape[3] < 4:
            raise Exception("Image does not have an alpha channel")

        channel_index = ["R", "G", "B", "A"].index(channel)
        mask = images[:, :, :, channel_index].cpu().clone()

        return (mask,)

```
