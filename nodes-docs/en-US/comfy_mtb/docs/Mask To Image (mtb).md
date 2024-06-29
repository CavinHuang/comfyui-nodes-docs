---
tags:
- ImageMask
- ImageMaskConversion
- Mask
- MaskGeneration
---

# Mask To Image (mtb)
## Documentation
- Class name: `Mask To Image (mtb)`
- Category: `mtb/generate`
- Output node: `False`

This node transforms a mask into an RGB image, expanding the mask's single channel into a three-channel RGB format, effectively converting binary or grayscale mask data into a visual, color image representation.
## Input types
### Required
- **`mask`**
    - The mask input represents the binary or grayscale mask data that will be converted into an RGB image. This transformation allows for the visualization of the mask as a color image, enhancing interpretability.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`color`**
    - The color input specifies the color to be applied to the non-transparent parts of the mask, contributing to the visual representation of the output image.
    - Comfy dtype: `COLOR`
    - Python dtype: `str`
- **`background`**
    - The background input defines the color used for the background of the output image, allowing for customization of the image's backdrop.
    - Comfy dtype: `COLOR`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an RGB image generated from the input mask, where the mask's data is expanded across three channels to form a visual representation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_MaskToImage:
    """Converts a mask (alpha) to an RGB image with a color and background"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "color": ("COLOR",),
                "background": ("COLOR", {"default": "#000000"}),
            }
        }

    CATEGORY = "mtb/generate"

    RETURN_TYPES = ("IMAGE",)

    FUNCTION = "render_mask"

    def render_mask(self, mask, color, background):
        masks = tensor2np(mask)[0]
        images = []
        for m in masks:
            _mask = Image.fromarray(m).convert("L")

            log.debug(
                f"Converted mask to PIL Image format, size: {_mask.size}"
            )

            image = Image.new("RGBA", _mask.size, color=color)
            # apply the mask
            image = Image.composite(
                image, Image.new("RGBA", _mask.size, color=background), _mask
            )

            # image = ImageChops.multiply(image, mask)
            # apply over background
            # image = Image.alpha_composite(Image.new("RGBA", image.size, color=background), image)

            images.append(image.convert("RGB"))

        return (pil2tensor(images),)

```
