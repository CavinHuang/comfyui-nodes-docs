
# Documentation
- Class name: Image Color Shift [Dream]
- Category: ✨ Dream/🌄 image/🎨 color
- Output node: False

该节点旨在通过对红、绿、蓝三个颜色通道应用乘数来调整图像的色彩平衡，从而实现精细的色彩校正或创意性的色彩调整。

# Input types
## Required
- image
    - 需要进行色彩偏移的输入图像。它作为应用色彩调整的基础。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage
- red_multiplier
    - 红色通道的乘数，用于调整图像中红色的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- green_multiplier
    - 绿色通道的乘数，用于调整图像中绿色的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blue_multiplier
    - 蓝色通道的乘数，用于调整图像中蓝色的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过色彩偏移处理后的输出图像，反映了对颜色通道所做的调整。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageColorShift:
    NODE_NAME = "Image Color Shift"
    ICON = "🖼"
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"image": ("IMAGE",),
                         "red_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         "green_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         "blue_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         },

        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, image, red_multiplier, green_multiplier, blue_multiplier):
        proc = DreamImageProcessor(inputs=image)

        def recolor(im: DreamImage, *a, **args):
            return (im.adjust_colors(red_multiplier, green_multiplier, blue_multiplier),)

        return proc.process(recolor)

```
