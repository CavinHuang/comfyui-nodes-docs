
# Documentation
- Class name: ImageCompositeRelativeByContainer
- Category: image/composite
- Output node: False

ImageCompositeRelativeByContainer节点用于创建复合图像，通过相对于容器尺寸来定位和合并两组图像。它根据容器的大小和指定的相对位置动态计算图像的放置位置，确保在按照指定方法合并图像之前，图像被适当地缩放和定位。

# Input types
## Required
- container
    - 作为参考的容器图像，用于缩放和定位其他图像。它的尺寸决定了其他图像如何调整和放置。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_a
    - 要合成的第一组图像。这些图像会根据容器的尺寸进行调整和定位。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_b
    - 要合成的第二组图像。这些图像也会根据容器的尺寸进行调整和定位，与第一组图像类似。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_a_x
    - 第一组图像在容器内的相对水平位置（百分比）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- images_a_y
    - 第一组图像在容器内的相对垂直位置（百分比）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- images_b_x
    - 第二组图像在容器内的相对水平位置（百分比）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- images_b_y
    - 第二组图像在容器内的相对垂直位置（百分比）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- background
    - 指定哪组图像（'images_a'或'images_b'）应作为最终合成图像的背景。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- method
    - 用于合成图像的方法，可能会影响合并结果的外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 最终的合成图像，是根据容器尺寸合并和定位两组图像的结果。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageCompositeRelativeByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
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
                "method": (["pair", "matrix"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/composite"

    def node(
            self,
            container,
            images_a,
            images_b,
            images_a_x,
            images_a_y,
            images_b_x,
            images_b_y,
            background,
            method
    ):
        def offset_by_percent(container_size: int, image_size: int, percent: float):
            return int((container_size - image_size) * percent)

        img_a_height, img_a_width = images_a[0, :, :, 0].shape
        img_b_height, img_b_width = images_b[0, :, :, 0].shape

        container_width = container[0, :, :, 0].shape[1]
        container_height = container[0, :, :, 0].shape[0]

        if container_width < max(img_a_width, img_b_width) or container_height < max(img_a_height, img_b_height):
            raise ValueError("Container can't be smaller then max width or height of images.")

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
