
# Documentation
- Class name: `Noise from Palette [Dream]`
- Category: `✨ Dream/🌄 image/⚡ generate`
- Output node: `False`

该节点基于给定的调色板生成噪声图案，用于创建具有特定色彩方案的纹理图像。它利用宽度、高度、模糊程度、密度和种子等参数来自定义噪声生成过程，从而产生独特而风格化的噪声图像。

# Input types
## Required
- palette
    - 调色板参数定义了用于噪声生成的色彩方案，影响生成图像的整体外观和颜色分布。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: Tuple[RGBPalette]
- width
    - 指定生成的噪声图像的宽度，决定其水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定生成的噪声图像的高度，决定其垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- blur_amount
    - 控制应用于噪声的模糊程度，影响颜色的平滑度和混合效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- density
    - 调整噪声图案的密度，影响噪声元素的紧密程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 用于随机数生成的种子值，确保噪声图案的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是基于输入调色板和其他参数生成的风格化噪声图像。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamNoiseFromPalette:
    NODE_NAME = "Noise from Palette"
    ICON = "🌫"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.palette | {
                "width": ("INT", {"default": 512, "min": 1, "max": 8192}),
                "height": ("INT", {"default": 512, "min": 1, "max": 8192}),
                "blur_amount": ("FLOAT", {"default": 0.3, "min": 0, "max": 1.0, "step": 0.05}),
                "density": ("FLOAT", {"default": 0.5, "min": 0.1, "max": 1.0, "step": 0.025}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})
            },
        }

    CATEGORY = NodeCategories.IMAGE_GENERATE
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, palette: Tuple[RGBPalette], width, height, seed, blur_amount, density):
        outputs = list()
        rng = random.Random()
        for p in palette:
            seed += 1
            color_iterator = p.random_iteration(seed)
            image = DreamImage(pil_image=Image.new("RGB", (width, height), color=next(color_iterator)))
            image = _generate_noise(image, lambda x, y: next(color_iterator), rng,
                                    (image.width >> 1, image.height >> 1), blur_amount, density)
            outputs.append(image)

        return (DreamImage.join_to_tensor_data(outputs),)

```
