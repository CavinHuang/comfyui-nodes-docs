---
tags:
- Color
---

# 🎨 Sample Image as Palette
## Documentation
- Class name: `Sample Image as Palette [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

This node samples colors from an image to create a palette, using a specified number of samples and a seed for randomization. It's designed to extract a diverse color palette from an image, which can then be used for various applications such as image editing, visualization, or as a basis for generating new images.
## Input types
### Required
- **`image`**
    - The image from which to sample colors, serving as the source for palette creation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `DreamImage`
- **`samples`**
    - The number of color samples to extract from the image, determining the palette's richness and diversity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for randomization, ensuring reproducibility of the palette sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`palette`**
    - Comfy dtype: `RGB_PALETTE`
    - The resulting color palette, composed of sampled colors from the input image.
    - Python dtype: `RGBPalette`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageSampler:
    NODE_NAME = "Sample Image as Palette"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "samples": ("INT", {"default": 1024, "min": 1, "max": 1024 * 4}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})
            },
        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = (RGBPalette.ID,)
    RETURN_NAMES = ("palette",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, image, samples, seed):
        result = list()
        r = random.Random()
        r.seed(seed)
        for data in image:
            di = DreamImage(tensor_image=data)
            pixels = list()
            for i in range(samples):
                x = r.randint(0, di.width - 1)
                y = r.randint(0, di.height - 1)
                pixels.append(di.get_pixel(x, y))
            result.append(RGBPalette(colors=pixels))

        return (tuple(result),)

```
