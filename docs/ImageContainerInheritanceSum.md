
# Documentation
- Class name: ImageContainerInheritanceSum
- Category: image/container
- Output node: False

该节点设计用于处理容器内图像尺寸的求和,便于将多个图像合并为单个复合图像的操作。它抽象了图像尺寸计算和调整的复杂性,使得以统一的方式处理图像集合变得更加容易。

# Input types
## Required
- images_a
    - 要处理的图像集合之一,在确定最终复合图像的整体尺寸中起关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- images_b
    - 要处理的另一个图像集合,对最终复合图像的整体尺寸有所贡献。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- red
    - 图像处理中使用的红色分量值,影响视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 图像处理中使用的绿色分量值,影响视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 图像处理中使用的蓝色分量值,影响视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 图像处理中使用的透明度值,影响视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- container_size_type
    - 指定计算容器大小的方法,影响最终复合图像的尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- method
    - 指定要应用的图像处理方法,影响图像的组合或操作方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 处理后得到的复合图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageContainerInheritanceSum:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "red": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "green": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "blue": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "alpha": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "container_size_type": (["sum", "sum_width", "sum_height"],),
                "method": (["single", "for_each_pair", "for_each_matrix"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, images_a, images_b, red, green, blue, alpha, container_size_type, method):
        img_a_height, img_a_width = images_a[0, :, :, 0].shape
        img_b_height, img_b_width = images_b[0, :, :, 0].shape

        if container_size_type == "sum":
            width = img_a_width + img_b_width
            height = img_a_height + img_b_height
        elif container_size_type == "sum_width":
            if img_a_height != img_b_height:
                raise ValueError()

            width = img_a_width + img_b_width
            height = img_a_height
        elif container_size_type == "sum_height":
            if img_a_width != img_b_width:
                raise ValueError()

            width = img_a_width
            height = img_a_height + img_b_height
        else:
            raise ValueError()

        image = create_rgba_image(width, height, (red, green, blue, int(alpha * 255))).image_to_tensor()

        if method == "single":
            return (image.unsqueeze(0),)
        elif method == "for_each_pair":
            length = len(images_a)
            images = torch.zeros(length, height, width, 4)
        else:
            length = len(images_a) * len(images_b)
            images = torch.zeros(length, height, width, 4)

        images[:, :, :] = image
        return (images,)

```
