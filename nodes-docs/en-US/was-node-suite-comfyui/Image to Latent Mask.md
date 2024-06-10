---
tags:
- Mask
- MaskGeneration
---

# Image to Latent Mask
## Documentation
- Class name: `Image to Latent Mask`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to convert an image into a latent mask representation, facilitating the manipulation and analysis of images in a latent space. It abstracts the complexities of image processing and latent space conversion, providing a streamlined approach to working with image data in advanced computational contexts.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the input images to be converted into a latent mask. This conversion is crucial for enabling further operations in the latent space, such as blending or compositing with other latent representations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`channel`**
    - The 'channel' parameter specifies the color channel ('red', 'green', 'blue', 'alpha') of the input image to be used in the mask creation process. This selection can significantly influence the resulting latent mask by highlighting specific features or areas of interest.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a collection of masks derived from the specified image channels. These masks can be utilized in various image manipulation and analysis tasks within a latent space framework.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_To_Mask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                "required": {
                    "images": ("IMAGE",),
                    "channel": (["alpha", "red", "green", "blue"], ),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "image_to_mask"

    def image_to_mask(self, images, channel):
        mask_images = []
        for image in images:

            image = tensor2pil(image).convert("RGBA")
            r, g, b, a = image.split()
            if channel == "red":
                channel_image = r
            elif channel == "green":
                channel_image = g
            elif channel == "blue":
                channel_image = b
            elif channel == "alpha":
                channel_image = a

            mask = torch.from_numpy(np.array(channel_image.convert("L")).astype(np.float32) / 255.0)
            mask_images.append(mask)

        return (torch.cat(mask_images, dim=0), )

```
