# Documentation
- Class name: ImageCompositeRelative
- Category: image/composite
- Output node: False

ImageCompositeRelative节点用于根据两张图像的相对尺寸和位置进行合成，允许基于指定坐标和大小进行动态图像叠加和操作。该节点通过计算输入图像的相对位置和大小来创建复合图像，以达到预期的布局和视觉效果。

# Input types
## Required
- images_a
    - 此参数代表要合成到容器上的第一组图像。它在叠加过程中起着关键作用，决定了复合图像中的视觉内容和层叠顺序。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_b
    - 与images_a类似，此参数代表要叠加到容器上的第二组图像。它允许引入额外的视觉元素，增强复合图像的复杂性和深度。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_a_x
    - 指定第一组图像的水平位置（相对于容器宽度的百分比），影响它们在复合图像中的放置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- images_a_y
    - 指定第一组图像的垂直位置（相对于容器高度的百分比），影响它们在复合图像中的对齐和层叠。
    - Comfy dtype: FLOAT
    - Python dtype: float
- images_b_x
    - 确定第二组图像的水平位置（相对于容器宽度的百分比），指导它们的放置以及与第一组图像的交互。
    - Comfy dtype: FLOAT
    - Python dtype: float
- images_b_y
    - 确定第二组图像的垂直位置（相对于容器高度的百分比），影响它们与第一组图像的层叠和视觉关系。
    - Comfy dtype: FLOAT
    - Python dtype: float
- background
    - background参数指定哪组图像（images_a或images_b）应被视为复合图像中的背景层。这个选择影响复合图像的视觉层次和层叠。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- container_size_type
    - 定义确定容器大小的策略，可以基于输入图像的最大尺寸或它们的总和，影响复合图像的整体尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- method
    - 定义用于合成图像的方法或算法。此参数影响应用的混合和叠加技术，从而影响复合图像的最终外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 结果复合图像，通过根据给定的位置、大小和方法混合和叠加指定的图像而创建。这个输出代表合成过程的最终视觉产品。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageCompositeRelative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "images_a_x": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "images_a_y": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "images_b_x": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "images_b_y": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "background": (["images_a", "images_b"],),
                "container_size_type": (["max", "sum", "sum_width", "sum_height"],),
                "method": (["pair", "matrix"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/composite"

    def node(
            self,
            images_a,
            images_b,
            images_a_x,
            images_a_y,
            images_b_x,
            images_b_y,
            background,
            container_size_type,
            method
    ):
        def offset_by_percent(container_size: int, image_size: int, percent: float):
            return int((container_size - image_size) * percent)

        img_a_height, img_a_width = images_a[0, :, :, 0].shape
        img_b_height, img_b_width = images_b[0, :, :, 0].shape

        if container_size_type == "max":
            container_width = max(img_a_width, img_b_width)
            container_height = max(img_a_height, img_b_height)
        elif container_size_type == "sum":
            container_width = img_a_width + img_b_width
            container_height = img_a_height + img_b_height
        elif container_size_type == "sum_width":
            container_width = img_a_width + img_b_width
            container_height = max(img_a_height, img_b_height)
        elif container_size_type == "sum_height":
            container_width = max(img_a_width, img_b_width)
            container_height = img_a_height + img_a_height
        else:
            raise ValueError()

        return ImageCompositeAbsolute().node(
            images_a,
            images_b,
            offset_by_percent(container_width, img_a_width, images_a_x),
            offset_by_percent(container_height, img_a_height, images_a_y),
            offset_by_percent(container_width, img_b_width, images_b_x),
            offset_by_percent(container_height, img_b_height, images_b_y),
            container_width,
            container_height,
            background,
            method
        )

```
