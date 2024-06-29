---
tags:
- Image
- ImageLoad
---

# Load Image (as Mask) From URL
## Documentation
- Class name: `LoadImageAsMaskFromUrl`
- Category: `Art Venture/Image`
- Output node: `False`

This node is designed to load images from URLs and convert them into masks based on a specified color channel. It supports selecting from alpha, red, green, or blue channels to create the mask, facilitating various image processing and manipulation tasks where masks are required.
## Input types
### Required
- **`url`**
    - The URL(s) from which the image will be loaded. Supports loading multiple images if URLs are separated by new lines. This parameter is essential for fetching the image data to be processed into masks.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`channel`**
    - Specifies the color channel ('alpha', 'red', 'green', 'blue') to be used for creating the mask. This choice determines which part of the image data will be converted into the mask, affecting the outcome significantly.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`masks`**
    - Comfy dtype: `MASK`
    - The output masks generated from the images, based on the selected color channel. These masks are suitable for various image processing applications that require specific areas to be isolated or highlighted.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilLoadImageAsMaskFromUrl(UtilLoadImageFromUrl):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False}),
                "channel": (["alpha", "red", "green", "blue"],),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("masks",)

    def load_image(self, url: str, channel: str):
        urls = url.strip().split("\n")
        images, alphas = load_images_from_url([urls], False)

        masks = []

        for image, alpha in zip(images, alphas):
            if channel == "alpha":
                mask = alpha
            elif channel == "red":
                mask = image.getchannel("R")
            elif channel == "green":
                mask = image.getchannel("G")
            elif channel == "blue":
                mask = image.getchannel("B")

            mask = np.array(mask).astype(np.float32) / 255.0
            mask = 1.0 - torch.from_numpy(mask)

            masks.append(mask)

        return (torch.stack(masks, dim=0),)

```
