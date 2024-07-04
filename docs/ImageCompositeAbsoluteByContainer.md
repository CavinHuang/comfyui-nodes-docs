# Documentation
- 类名: ImageCompositeAbsoluteByContainer
- 类别: image/composite
- 输出节点: False

该节点旨在将两个图像按照指定的绝对坐标合成到一个给定的容器中。它利用容器的尺寸来确保图像完美适配，提供了一种灵活的方式来管理预定义空间约束内的图像布局。

# Input types
## Required
- container
    - 用于合成其他图像的容器图像。它定义了合成的空间边界。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_a
    - 要合成到容器中的第一个图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_b
    - 要合成到容器中的第二个图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- images_a_x
    - 第一个图像在容器内左上角的x坐标。
    - Comfy dtype: INT
    - Python dtype: float
- images_a_y
    - 第一个图像在容器内左上角的y坐标。
    - Comfy dtype: INT
    - Python dtype: float
- images_b_x
    - 第二个图像在容器内左上角的x坐标。
    - Comfy dtype: INT
    - Python dtype: float
- images_b_y
    - 第二个图像在容器内左上角的y坐标。
    - Comfy dtype: INT
    - Python dtype: float
- background
    - 指定在合成过程中哪个图像（如果有的话）应该被视为背景。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- method
    - 用于合成图像的方法，可能影响最终的外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 合成过程的结果，是一个根据指定参数和方法组合输入图像的单一图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```python
class ImageCompositeAbsoluteByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "images_a_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_a_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_b_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_b_y": ("INT", {
                    "default": 0,
                    "step": 1
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
        return ImageCompositeAbsolute().node(
            images_a,
            images_b,
            images_a_x,
            images_a_y,
            images_b_x,
            images_b_y,
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            background,
            method
        )
```