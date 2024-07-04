
# Documentation
- Class name: ImageTransformPaddingRelative
- Category: image/transform
- Output node: False

ImageTransformPaddingRelative节点基于指定的宽度和高度缩放因子以及填充方法，对图像应用相对填充。它动态计算要添加到图像各个维度的填充量，从而实现灵活的图像变换，同时保持纵横比。

# Input types
## Required
- images
    - 需要应用填充的图像集合。该参数对于定义将要进行变换的输入数据至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- scale_width
    - 用于确定填充宽度相对于原始图像宽度的缩放因子。它影响填充后图像的最终尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_height
    - 用于确定填充高度相对于原始图像高度的缩放因子。它影响填充后图像的最终尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- method
    - 用于填充的方法（例如，反射、边缘、常量），影响填充区域的外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 添加了填充的变换后的图像，保持原始纵横比的同时调整了整体尺寸。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformPaddingRelative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "scale_width": ("FLOAT", {
                    "default": 0.25,
                    "step": 0.1,
                }),
                "scale_height": ("FLOAT", {
                    "default": 0.25,
                    "step": 0.1,
                }),
                "method": (["reflect", "edge", "constant"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, scale_width, scale_height, method):
        height, width = images[0, :, :, 0].shape

        add_width = int(width * scale_width)
        add_height = int(height * scale_height)

        return ImageTransformPaddingAbsolute().node(images, add_width, add_height, method)

```
