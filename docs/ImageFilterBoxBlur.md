
# Documentation
- Class name: ImageFilterBoxBlur
- Category: image/filter
- Output node: False

ImageFilterBoxBlur节点用于对图像应用方框模糊效果。它通过指定x和y维度的模糊大小，实现均匀的平滑效果。这种模糊技术可以有效地柔化图像细节，创造出柔和和朦胧的视觉效果。

# Input types
## Required
- images
    - 需要处理的图像。这个参数至关重要，它定义了将要应用方框模糊效果的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size_x
    - 指定模糊效果的水平尺寸。它决定了方框模糊操作中使用的核的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- size_y
    - 指定模糊效果的垂直尺寸。它决定了方框模糊操作中使用的核的高度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是经过方框模糊处理后的图像，呈现出均匀平滑的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterBoxBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size_x": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size_x, size_y):
        return (cv2_layer(images, lambda x: cv2.boxFilter(x, -1, (size_x, size_y))),)

```
