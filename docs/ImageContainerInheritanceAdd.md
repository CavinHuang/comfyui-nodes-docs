
# Documentation
- Class name: ImageContainerInheritanceAdd
- Category: image/container
- Output node: False

ImageContainerInheritanceAdd 节点设计用于对一组图像执行加法运算，根据指定的参数调整其尺寸并应用颜色转换。它封装了批量缩放和修改图像的功能，利用继承来扩展或定制图像处理工作流程。

# Input types
## Required
- images
    - 要处理的图像集合。它作为节点的主要输入，决定了后续操作的基础内容。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- add_width
    - 要添加到图像的额外宽度，影响整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- add_height
    - 要添加到图像的额外高度，影响整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 要添加到每个图像的红色分量，影响最终的色彩平衡。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 要添加到每个图像的绿色分量，影响最终的色彩平衡。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 要添加到每个图像的蓝色分量，影响最终的色彩平衡。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 要应用于每个图像的 alpha（透明度）值，影响其不透明度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- method
    - 指定用于加法运算的方法，可能会改变颜色和尺寸的调整方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是根据指定参数处理过的单张或多张图像，包括尺寸调整和颜色转换。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageContainerInheritanceAdd:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "add_width": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "add_height": ("INT", {
                    "default": 0,
                    "step": 1
                }),
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
                "method": (["single", "for_each"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, images, add_width, add_height, red, green, blue, alpha, method):
        width, height = images[0, :, :, 0].shape

        width = width + add_width
        height = height + add_height

        image = create_rgba_image(width, height, (red, green, blue, int(alpha * 255))).image_to_tensor()

        if method == "single":
            return (image.unsqueeze(0),)
        else:
            length = len(images)

            images = torch.zeros(length, height, width, 4)
            images[:, :, :] = image
            return (images,)

```
