---
tags:
- Color
---

# 🌫 Noise from Area Palettes
## Documentation
- Class name: `Noise from Area Palettes [Dream]`
- Category: `✨ Dream/🌄 image/⚡ generate`
- Output node: `False`

The 'Noise from Area Palettes' node generates a noise-based image by blending colors from different area-specific palettes. It utilizes a unique area sharpness parameter to influence the randomness and distribution of colors across specified areas, creating a visually cohesive noise pattern.
## Input types
### Required
- **`area_sharpness`**
    - Controls the sharpness of the transitions between different area palettes, influencing how distinctly the areas are defined.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width`**
    - The width of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blur_amount`**
    - The amount of blur applied to the noise, affecting the smoothness of the color transitions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`density`**
    - Determines the density of the noise pattern, influencing the overall texture and complexity of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the noise pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`top_left_palette`**
    - Specifies the palette for the top-left area of the image, influencing the color scheme in that specific section.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`top_center_palette`**
    - Defines the palette for the top-center area, affecting the color distribution and theme in this particular region.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`top_right_palette`**
    - Determines the palette for the top-right area, impacting the color choices and overall aesthetic in that zone.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`center_left_palette`**
    - Sets the palette for the center-left area, guiding the color scheme and visual harmony in this segment.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`center_palette`**
    - Indicates the palette for the central area of the image, influencing the core color theme and distribution.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`center_right_palette`**
    - Specifies the palette for the center-right area, affecting the color dynamics and visual appeal in this section.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`bottom_left_palette`**
    - Determines the palette for the bottom-left area, impacting the color scheme and aesthetic consistency in this part.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`bottom_center_palette`**
    - Sets the palette for the bottom-center area, guiding the color choices and thematic consistency in this region.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`bottom_right_palette`**
    - Defines the palette for the bottom-right area, affecting the color distribution and visual impact in this zone.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image, composed of noise patterns derived from the specified area palettes.
    - Python dtype: `DreamImage`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DreamNoiseFromAreaPalettes:
    NODE_NAME = "Noise from Area Palettes"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "optional": {
                "top_left_palette": (RGBPalette.ID,),
                "top_center_palette": (RGBPalette.ID,),
                "top_right_palette": (RGBPalette.ID,),
                "center_left_palette": (RGBPalette.ID,),
                "center_palette": (RGBPalette.ID,),
                "center_right_palette": (RGBPalette.ID,),
                "bottom_left_palette": (RGBPalette.ID,),
                "bottom_center_palette": (RGBPalette.ID,),
                "bottom_right_palette": (RGBPalette.ID,),
            },
            "required": {
                "area_sharpness": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.05}),
                "width": ("INT", {"default": 512, "min": 1, "max": 8192}),
                "height": ("INT", {"default": 512, "min": 1, "max": 8192}),
                "blur_amount": ("FLOAT", {"default": 0.3, "min": 0, "max": 1.0, "step": 0.05}),
                "density": ("FLOAT", {"default": 0.5, "min": 0.1, "max": 1.0, "step": 0.025}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
        }

    CATEGORY = NodeCategories.IMAGE_GENERATE
    ICON = "🌫"
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def _area_coordinates(self, width, height):
        dx = width / 6
        dy = height / 6
        return {
            "top_left_palette": (dx, dy),
            "top_center_palette": (dx * 3, dy),
            "top_right_palette": (dx * 5, dy),
            "center_left_palette": (dx, dy * 3),
            "center_palette": (dx * 3, dy * 3),
            "center_right_palette": (dx * 5, dy * 3),
            "bottom_left_palette": (dx * 1, dy * 5),
            "bottom_center_palette": (dx * 3, dy * 5),
            "bottom_right_palette": (dx * 5, dy * 5),
        }

    def _pick_random_area(self, active_coordinates, x, y, rng, area_sharpness):
        def _dst(x1, y1, x2, y2):
            a = x1 - x2
            b = y1 - y2
            return math.sqrt(a * a + b * b)

        distances = list(map(lambda item: (item[0], _dst(item[1][0], item[1][1], x, y)), active_coordinates))
        areas_by_weight = list(
            map(lambda item: (math.pow((1.0 / max(1, item[1])), 0.5 + 4.5 * area_sharpness), item[0]), distances))
        return pick_random_by_weight(areas_by_weight, rng)

    def _setup_initial_colors(self, image: DreamImage, color_func):
        w = image.width
        h = image.height
        wpart = round(w / 3)
        hpart = round(h / 3)
        for i in range(3):
            for j in range(3):
                image.color_area(wpart * i, hpart * j, w, h,
                                 color_func(wpart * i + w // 2, hpart * j + h // 2))

    def result(self, width, height, seed, blur_amount, density, area_sharpness, **palettes):
        outputs = list()
        rng = random.Random()
        coordinates = self._area_coordinates(width, height)
        active_palettes = list(filter(lambda pair: pair[1] is not None and len(pair[1]) > 0, palettes.items()))
        active_coordinates = list(map(lambda item: (item[0], coordinates[item[0]]), active_palettes))

        n = max(list(map(len, palettes.values())) + [0])
        for b in range(n):
            batch_palettes = dict(map(lambda item: (item[0], item[1][b].random_iteration(seed)), active_palettes))

            def _color_func(x, y):
                name = self._pick_random_area(active_coordinates, x, y, rng, area_sharpness)
                rgb = batch_palettes[name]
                return next(rgb)

            image = DreamImage(pil_image=Image.new("RGB", (width, height)))
            self._setup_initial_colors(image, _color_func)
            image = _generate_noise(image, _color_func, rng, (round(image.width / 3), round(image.height / 3)),
                                    blur_amount, density)
            outputs.append(image)

        if not outputs:
            outputs.append(DreamImage(pil_image=Image.new("RGB", (width, height))))

        return (DreamImage.join_to_tensor_data(outputs),)

```
