---
tags:
- Image
---

# Mask with Alpha (Transparency)
## Documentation
- Class name: `SaltRGBAFromMask`
- Category: `SALT/Image/Composite`
- Output node: `False`

This node is designed to convert masks into RGBA images, incorporating transparency into the resulting image. It focuses on processing image masks to generate images with an alpha channel, enabling the creation of images where certain regions are transparent, based on the input mask.
## Input types
### Required
- **`image`**
    - The source image that will be combined with the mask to produce an RGBA image. The image's non-masked areas will remain visible, while the masked areas can be made transparent or semi-transparent.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`mask`**
    - The input mask for which the RGBA image will be generated. This mask determines the regions that will be transparent or opaque in the resulting image.
    - Comfy dtype: `MASK`
    - Python dtype: `PIL.Image`
- **`threshold`**
    - A value used to determine the cutoff point for what is considered transparent in the mask. Pixels in the mask above this value will be more opaque.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`invert_mask`**
    - A boolean indicating whether the mask should be inverted before applying it to the image. Inverting the mask swaps which areas are considered transparent and which are opaque.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`rgba_image`**
    - Comfy dtype: `IMAGE`
    - The resulting RGBA image where the input mask has been applied to define transparent regions.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltRGBAFromMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "threshold": ("FLOAT", {"min": 0, "max": 1.0, "step": 0.01, "default": 0.5}),
                "invert_mask": ("BOOLEAN", {"default": False})
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("rgba_image",)

    FUNCTION = "composite"
    CATEGORY = "SALT/Image/Composite"

    def composite(self, image, mask, threshold, invert_mask):
        img = tensor2pil(image)
        msk = mask2pil(mask)

        msk = msk.convert("L")
        img = img.convert("RGBA")

        img_ratio = img.size[0] / img.size[1]
        msk_ratio = msk.size[0] / msk.size[1]

        if img_ratio > msk_ratio:
            scale_factor = img.size[1] / msk.size[1]
            new_size = (int(msk.size[0] * scale_factor), img.size[1])
        else:
            scale_factor = img.size[0] / msk.size[0]
            new_size = (img.size[0], int(msk.size[1] * scale_factor))

        msk = msk.resize(new_size, Image.Resampling.BILINEAR)

        pad_mask = Image.new("L", img.size, 0)

        x = (img.size[0] - msk.size[0]) // 2
        y = (img.size[1] - msk.size[1]) // 2
        pad_mask.paste(msk, (x, y))

        thresh = int(threshold * 255)
        pad_mask = pad_mask.point(lambda p: 255 if p > thresh else 0)

        if invert_mask:
            pad_mask = ImageOps.invert(pad_mask)

        rgba_image = Image.new("RGBA", img.size, (0, 0, 0, 0))
        rgba_image.paste(img, (0, 0), pad_mask)

        return (pil2tensor(rgba_image),)

```
