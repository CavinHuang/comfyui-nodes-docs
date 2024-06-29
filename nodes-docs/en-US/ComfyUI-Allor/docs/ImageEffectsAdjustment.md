---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# ImageEffectsAdjustment
## Documentation
- Class name: `ImageEffectsAdjustment`
- Category: `image/effects`
- Output node: `False`

This node applies a series of image adjustments including brightness, contrast, saturation, hue, gamma, and sharpness, along with RGB color scaling, to a batch of images. It allows for fine-tuning of visual aspects of images to achieve desired effects or corrections.
## Input types
### Required
- **`images`**
    - The batch of images to be adjusted. Each adjustment is applied to all images in the batch, allowing for consistent image processing across multiple inputs.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`brightness`**
    - Adjusts the brightness level of the images. A value greater than 1.0 increases brightness, while a value less than 1.0 decreases it.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`contrast`**
    - Modifies the contrast of the images. Values greater than 1.0 enhance contrast, whereas values less than 1.0 reduce it.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`saturation`**
    - Alters the saturation level of the images, enhancing or diminishing the intensity of colors.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hue`**
    - Changes the hue of the images, allowing for shifts in color spectrum.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`gamma`**
    - Applies gamma correction to the images, adjusting the luminance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sharpness`**
    - Adjusts the sharpness of the images, making them appear clearer or softer.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`red`**
    - Scales the red channel of the images, affecting the intensity of red hues.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`green`**
    - Scales the green channel of the images, affecting the intensity of green hues.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blue`**
    - Scales the blue channel of the images, affecting the intensity of blue hues.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The batch of images after applying the specified adjustments, potentially including changes in brightness, contrast, saturation, hue, gamma, sharpness, and RGB color scaling.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsAdjustment:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "brightness": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "contrast": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "saturation": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "hue": ("FLOAT", {
                    "default": 0.5,
                    "max": 1.0,
                    "step": 0.01
                }),
                "gamma": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "sharpness": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "red": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "green": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
                "blue": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects"

    def node(self, images, brightness, contrast, saturation, hue, gamma, sharpness, red, green, blue):
        # noinspection PyUnboundLocalVariable
        def apply(img):
            rgba = False

            if len(img[0, 0, :]) == 4:
                a = img[:, :, 3].unsqueeze(2)
                img = img[:, :, 0:3]
                rgba = True

            img = img.permute(2, 0, 1)

            if brightness != 1.0:
                img = F.adjust_brightness(img, brightness)

            if contrast != 1.0:
                img = F.adjust_contrast(img, contrast)

            if saturation != 1.0:
                img = F.adjust_saturation(img, saturation)

            if hue != 0.5:
                img = F.adjust_hue(img, hue - 0.5)

            if gamma != 1.0:
                img = F.adjust_gamma(img, gamma)

            if sharpness != 1.0:
                img = F.adjust_sharpness(img, sharpness)

            img = img.permute(1, 2, 0)

            r, g, b = torch.chunk(img, 3, dim=2)

            r = torch.clamp(r * red, 0, 1)
            g = torch.clamp(g * green, 0, 1)
            b = torch.clamp(b * blue, 0, 1)

            if rgba:
                return torch.cat([r, g, b, a], dim=2)
            else:
                return torch.cat([r, g, b], dim=2)

        return (torch.stack([
            apply(images[i]) for i in range(len(images))
        ]),)

```
