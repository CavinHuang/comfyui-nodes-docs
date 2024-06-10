---
tags:
- AlphaChannel
- Image
---

# AlphaChanelAddByMask
## Documentation
- Class name: `AlphaChanelAddByMask`
- Category: `image/alpha`
- Output node: `False`

This node is designed to add an alpha channel to a batch of images based on a specified mask and method. It enables the manipulation of image transparency by integrating a mask into the image data, allowing for dynamic adjustments of image opacity.
## Input types
### Required
- **`images`**
    - The batch of images to which the alpha channel will be added. This parameter is crucial for defining the base images that will undergo transparency manipulation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The mask that dictates the transparency levels to be applied to the images. It plays a key role in determining the areas of the image that will be transparent or opaque.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`method`**
    - Specifies the method of applying the mask to the images, such as default or invert, affecting how the transparency is applied across the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified batch of images with the alpha channel added according to the specified mask and method. This output allows for the visualization of the transparency effects applied to the original images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlphaChanelAddByMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "mask": ("MASK",),
                "method": (["default", "invert"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/alpha"

    def node(self, images, mask, method):
        img_count, img_height, img_width = images[:, :, :, 0].shape
        mask_count, mask_height, mask_width = mask.shape

        if mask_width == 64 and mask_height == 64:
            mask = torch.zeros((img_count, img_height, img_width))
        else:
            if img_height != mask_height or img_width != mask_width:
                raise ValueError(
                    "[AlphaChanelByMask]: Size of images not equals size of mask. " +
                    "Images: [" + str(img_width) + ", " + str(img_height) + "] - " +
                    "Mask: [" + str(mask_width) + ", " + str(mask_height) + "]."
                )

        if img_count != mask_count:
            mask = mask.expand((img_count, -1, -1))

        if method == "default":
            return (torch.stack([
                torch.stack((
                    images[i, :, :, 0],
                    images[i, :, :, 1],
                    images[i, :, :, 2],
                    1. - mask[i]
                ), dim=-1) for i in range(len(images))
            ]),)
        else:
            return (torch.stack([
                torch.stack((
                    images[i, :, :, 0],
                    images[i, :, :, 1],
                    images[i, :, :, 2],
                    mask[i]
                ), dim=-1) for i in range(len(images))
            ]),)

```
