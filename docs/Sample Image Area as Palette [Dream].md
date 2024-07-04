
# Documentation
- Class name: Sample Image Area as Palette [Dream]
- Category: ✨ Dream/🌄 image/🎨 color
- Output node: False

这个节点从图像的特定区域采样颜色来创建一个调色板。通过聚焦于图像的特定区域，它可以进行有针对性的调色板生成，从而增强了生成调色板的主题一致性和相关性。

# Input types
## Required
- image
    - 用于采样颜色以创建调色板的图像。这个参数对于定义颜色提取的来源至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[DreamImage]
- samples
    - 指定从图像指定区域提取的颜色样本数量，直接影响生成调色板的多样性和丰富度。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 随机数生成器的种子，通过控制颜色采样中的随机性来确保调色板的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- area
    - 定义从图像中采样颜色的特定区域，允许基于预定义的图像区域进行有针对性的调色板创建。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- palette
    - 生成的颜色调色板，包含从图像指定区域采样的颜色。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: Tuple[RGBPalette]


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
