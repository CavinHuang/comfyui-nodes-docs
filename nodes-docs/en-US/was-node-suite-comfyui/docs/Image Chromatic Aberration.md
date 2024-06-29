---
tags:
- LensEffects
- VisualEffects
---

# Image Chromatic Aberration
## Documentation
- Class name: `Image Chromatic Aberration`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node applies a chromatic aberration effect to an image by adjusting the RGB channels' offsets and intensity, simulating the way light disperses through a lens.
## Input types
### Required
- **`image`**
    - The input image to which the chromatic aberration effect will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`red_offset`**
    - The offset value for the red channel, affecting the dispersion effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green_offset`**
    - The offset value for the green channel, affecting the dispersion effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue_offset`**
    - The offset value for the blue channel, affecting the dispersion effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`intensity`**
    - The intensity of the chromatic aberration effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fade_radius`**
    - The radius over which the chromatic aberration effect fades off.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image with the applied chromatic aberration effect.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Chromatic_Aberration:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "red_offset": ("INT", {"default": 2, "min": -255, "max": 255, "step": 1}),
                "green_offset": ("INT", {"default": -1, "min": -255, "max": 255, "step": 1}),
                "blue_offset": ("INT", {"default": 1, "min": -255, "max": 255, "step": 1}),
                "intensity": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "fade_radius": ("INT", {"default": 12, "min": 0, "max": 1024, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_chromatic_aberration"

    CATEGORY = "WAS Suite/Image/Filter"

    def image_chromatic_aberration(self, image, red_offset=4, green_offset=2, blue_offset=0, intensity=1, fade_radius=12):
        return (pil2tensor(self.apply_chromatic_aberration(tensor2pil(image), red_offset, green_offset, blue_offset, intensity, fade_radius)), )

    def apply_chromatic_aberration(self, img, r_offset, g_offset, b_offset, intensity, fade_radius):

        def lingrad(size, direction, white_ratio):
            image = Image.new('RGB', size)
            draw = ImageDraw.Draw(image)
            if direction == 'vertical':
                black_end = size[1] - white_ratio
                range_start = 0
                range_end = size[1]
                range_step = 1
                for y in range(range_start, range_end, range_step):
                    color_ratio = y / size[1]
                    if y <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int(((y - black_end) / (size[1] - black_end)) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(0, y), (size[0], y)], fill=color)
            elif direction == 'horizontal':
                black_end = size[0] - white_ratio
                range_start = 0
                range_end = size[0]
                range_step = 1
                for x in range(range_start, range_end, range_step):
                    color_ratio = x / size[0]
                    if x <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int(((x - black_end) / (size[0] - black_end)) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(x, 0), (x, size[1])], fill=color)

            return image.convert("L")

        def create_fade_mask(size, fade_radius):
            mask = Image.new("L", size, 255)

            left = ImageOps.invert(lingrad(size, 'horizontal', int(fade_radius * 2)))
            right = left.copy().transpose(Image.FLIP_LEFT_RIGHT)
            top = ImageOps.invert(lingrad(size, 'vertical', int(fade_radius *2)))
            bottom = top.copy().transpose(Image.FLIP_TOP_BOTTOM)

            # Multiply masks with the original mask image
            mask = ImageChops.multiply(mask, left)
            mask = ImageChops.multiply(mask, right)
            mask = ImageChops.multiply(mask, top)
            mask = ImageChops.multiply(mask, bottom)
            mask = ImageChops.multiply(mask, mask)

            return mask

        # split the channels of the image
        r, g, b = img.split()

        # apply the offset to each channel
        r_offset_img = ImageChops.offset(r, r_offset, 0)
        g_offset_img = ImageChops.offset(g, 0, g_offset)
        b_offset_img = ImageChops.offset(b, 0, b_offset)

        # merge the channels with the offsets
        merged = Image.merge("RGB", (r_offset_img, g_offset_img, b_offset_img))

        # create fade masks for blending
        fade_mask = create_fade_mask(img.size, fade_radius)

        # merge the blended channels back into an RGB image
        result = Image.composite(merged, img, fade_mask).convert("RGB")

        return result

```
