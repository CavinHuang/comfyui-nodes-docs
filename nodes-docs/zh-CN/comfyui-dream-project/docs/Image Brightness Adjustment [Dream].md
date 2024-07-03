
# Documentation
- Class name: Image Brightness Adjustment [Dream]
- Category: ✨ Dream/🌄 image/🎨 color
- Output node: False

该节点根据指定的因子调整图像的亮度，增强或减弱图像的整体亮度。

# Input types
## Required
- image
    - 需要进行亮度调整的输入图像。这是主要的输入，亮度调整将在此图像上执行。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage
- factor
    - 用于调整亮度的乘数。大于1.0的值会增加亮度，小于1.0的值会降低亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用亮度调整后得到的结果图像。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageBrightness:
    NODE_NAME = "Image Brightness Adjustment"
    ICON = "☼"

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
            return (im.change_brightness(factor),)

        return proc.process(change)

```
