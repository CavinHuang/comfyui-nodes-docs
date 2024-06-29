---
tags:
- Color
---

# 🎨 Sample Image Area as Palette
## Documentation
- Class name: `Sample Image Area as Palette [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

This node samples colors from a specified area within an image to create a color palette. It allows for targeted palette generation by focusing on specific regions of an image, enhancing thematic consistency and relevance in the resulting palette.
## Input types
### Required
- **`image`**
    - The image from which colors are sampled to create the palette. This parameter is crucial for defining the source of the color extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[DreamImage]`
- **`samples`**
    - Specifies the number of color samples to extract from the designated area of the image, directly influencing the diversity and richness of the resulting palette.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed for the random number generator, ensuring reproducibility of the palette by controlling the randomness in color sampling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`area`**
    - Defines the specific area of the image from which to sample colors, allowing for targeted palette creation based on predefined image regions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`palette`**
    - Comfy dtype: `RGB_PALETTE`
    - The generated color palette, comprising colors sampled from the specified area of the image.
    - Python dtype: `Tuple[RGBPalette]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageAreaSampler:
    NODE_NAME = "Sample Image Area as Palette"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "samples": ("INT", {"default": 256, "min": 1, "max": 1024 * 4}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "area": (["top-left", "top-center", "top-right",
                          "center-left", "center", "center-right",
                          "bottom-left", "bottom-center", "bottom-right"],)
            },
        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = (RGBPalette.ID,)
    RETURN_NAMES = ("palette",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def _get_pixel_area(self, img: DreamImage, area):
        w = img.width
        h = img.height
        wpart = round(w / 3)
        hpart = round(h / 3)
        x0 = 0
        x1 = wpart - 1
        x2 = wpart
        x3 = wpart + wpart - 1
        x4 = wpart + wpart
        x5 = w - 1
        y0 = 0
        y1 = hpart - 1
        y2 = hpart
        y3 = hpart + hpart - 1
        y4 = hpart + hpart
        y5 = h - 1
        if area == "center":
            return (x2, y2, x3, y3)
        elif area == "top-center":
            return (x2, y0, x3, y1)
        elif area == "bottom-center":
            return (x2, y4, x3, y5)
        elif area == "center-left":
            return (x0, y2, x1, y3)
        elif area == "top-left":
            return (x0, y0, x1, y1)
        elif area == "bottom-left":
            return (x0, y4, x1, y5)
        elif area == "center-right":
            return (x4, y2, x5, y3)
        elif area == "top-right":
            return (x4, y0, x5, y1)
        elif area == "bottom-right":
            return (x4, y4, x5, y5)

    def result(self, image, samples, seed, area):
        result = list()
        r = random.Random()
        r.seed(seed)
        for data in image:
            di = DreamImage(tensor_image=data)
            area = self._get_pixel_area(di, area)

            pixels = list()
            for i in range(samples):
                x = r.randint(area[0], area[2])
                y = r.randint(area[1], area[3])
                pixels.append(di.get_pixel(x, y))
            result.append(RGBPalette(colors=pixels))

        return (tuple(result),)

```
