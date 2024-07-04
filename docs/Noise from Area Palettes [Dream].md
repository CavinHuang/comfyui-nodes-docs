
# Documentation
- Class name: Noise from Area Palettes [Dream]
- Category: ✨ Dream/🌄 image/⚡ generate
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点通过融合不同区域特定调色板的颜色来生成基于噪声的图像。它利用独特的区域锐度参数来影响指定区域的颜色随机性和分布，从而创建视觉上连贯的噪声图案。

# Input types
## Required
- area_sharpness
    - 控制不同区域调色板之间过渡的锐度，影响区域定义的清晰程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width
    - 生成图像的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 生成图像的高度。
    - Comfy dtype: INT
    - Python dtype: int
- blur_amount
    - 应用于噪声的模糊量，影响颜色过渡的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- density
    - 决定噪声图案的密度，影响图像的整体纹理和复杂度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 随机数生成的种子值，确保噪声图案的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- top_left_palette
    - 指定图像左上区域的调色板，影响该特定部分的配色方案。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- top_center_palette
    - 定义顶部中心区域的调色板，影响该特定区域的颜色分布和主题。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- top_right_palette
    - 确定右上区域的调色板，影响该区域的颜色选择和整体美感。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- center_left_palette
    - 设置中左区域的调色板，指导该部分的配色方案和视觉和谐性。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- center_palette
    - 指示图像中心区域的调色板，影响核心配色主题和分布。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- center_right_palette
    - 指定中右区域的调色板，影响该部分的色彩动态和视觉吸引力。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- bottom_left_palette
    - 确定左下区域的调色板，影响该部分的配色方案和美学一致性。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- bottom_center_palette
    - 设置底部中心区域的调色板，指导该区域的颜色选择和主题一致性。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- bottom_right_palette
    - 定义右下区域的调色板，影响该区域的颜色分布和视觉冲击力。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID

# Output types
- image
    - 由指定区域调色板派生的噪声图案组成的生成图像。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage


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
