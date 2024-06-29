---
tags:
- Color
- ColorChannelManipulation
---

# Image Apply Channel
## Documentation
- Class name: `ImageApplyChannel`
- Category: `Art Venture/Utils`
- Output node: `False`

The ImageApplyChannel node is designed to modify specific color channels (Red, Green, Blue, Alpha) of a collection of images by applying given channel data to them. This functionality allows for precise control over the color composition and transparency of images, enabling customized image processing and manipulation.
## Input types
### Required
- **`images`**
    - The collection of images to be modified. This parameter is crucial as it determines the base images that will undergo channel modification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`channel_data`**
    - The data to be applied to the specified channel of each image. This parameter directly influences the outcome by altering the specified channel's values across all images.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`channel`**
    - Specifies which color channel (Red, Green, Blue, Alpha) to modify in the images. This choice dictates the aspect of the images that will be altered.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified images with the specified channel data applied. This output reflects the changes made to the original images' specified channels.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageApplyChannel:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "channel_data": ("MASK",),
                "channel": (["R", "G", "B", "A"],),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_apply_channel"

    def image_apply_channel(self, images: torch.Tensor, channel_data: torch.Tensor, channel):
        merged_images = []

        for image in images:
            image = image.cpu().clone()

            if channel == "A":
                if image.shape[2] < 4:
                    image = torch.cat([image, torch.ones((image.shape[0], image.shape[1], 1))], dim=2)

                image[:, :, 3] = channel_data
            elif channel == "R":
                image[:, :, 0] = channel_data
            elif channel == "G":
                image[:, :, 1] = channel_data
            else:
                image[:, :, 2] = channel_data

            merged_images.append(image)

        return (torch.stack(merged_images),)

```
