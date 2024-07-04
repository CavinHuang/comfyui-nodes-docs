
# Documentation
- Class name: Sample Image as Palette [Dream]
- Category: ✨ Dream/🌄 image/🎨 color
- Output node: False

本节点通过对输入图像进行采样来创建一个调色板，使用指定数量的样本和一个用于随机化的种子。它旨在从图像中提取多样化的颜色调色板，这可以用于各种应用，如图像编辑、可视化，或作为生成新图像的基础。

# Input types
## Required
- image
    - 用于采样颜色的源图像，作为创建调色板的基础。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage
- samples
    - 从图像中提取的颜色样本数量，决定了调色板的丰富度和多样性。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 用于随机化的种子值，确保调色板采样过程的可重现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- palette
    - 由输入图像采样得到的颜色组成的调色板。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette


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
