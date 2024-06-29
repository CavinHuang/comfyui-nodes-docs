---
tags:
- ImageMask
- ImageMaskConversion
- Mask
- MaskGeneration
---

# Convert Image to Mask
## Documentation
- Class name: `ImageToMask`
- Category: `mask`
- Output node: `False`

The ImageToMask node is designed to convert an image into a mask based on a specified color channel. It allows for the extraction of mask layers corresponding to the red, green, blue, or alpha channels of an image, facilitating operations that require channel-specific masking or processing.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image from which a mask will be generated based on the specified color channel. It plays a crucial role in determining the content and characteristics of the resulting mask.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`channel`**
    - The 'channel' parameter specifies which color channel (red, green, blue, or alpha) of the input image should be used to generate the mask. This choice directly influences the mask's appearance and which parts of the image are highlighted or masked out.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output 'mask' is a binary or grayscale representation of the specified color channel from the input image, useful for further image processing or masking operations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [MaskComposite](../../Comfy/Nodes/MaskComposite.md)
    - [GrowMask](../../Comfy/Nodes/GrowMask.md)
    - IPAdapterApplyFaceID



## Source code
```python
class ImageToMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "image": ("IMAGE",),
                    "channel": (["red", "green", "blue", "alpha"],),
                }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)
    FUNCTION = "image_to_mask"

    def image_to_mask(self, image, channel):
        channels = ["red", "green", "blue", "alpha"]
        mask = image[:, :, :, channels.index(channel)]
        return (mask,)

```
