
# Documentation
- Class name: Image Contrast Adjustment [Dream]
- Category: ✨ Dream/🌄 image/🎨 color
- Output node: False

该节点根据指定的对比度调整因子来调整图像的对比度，增强或减少图像最亮和最暗部分之间的差异。

# Input types
## Required
- image
    - 需要调整对比度的图像。这是进行对比度调整操作的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage
- factor
    - 用于调整对比度的乘数。大于1.0的值会增加对比度，而小于1.0的值会降低对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用对比度调整后的结果图像。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageContrast:
    NODE_NAME = "Image Contrast Adjustment"
    ICON = "◐"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"image": ("IMAGE",),
                         "factor": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         },

        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, image, factor):
        proc = DreamImageProcessor(inputs=image)

        def change(im: DreamImage, *a, **args):
            return (im.change_contrast(factor),)

        return proc.process(change)

```
