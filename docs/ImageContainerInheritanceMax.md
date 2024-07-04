
# Documentation
- Class name: ImageContainerInheritanceMax
- Category: image/container
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageContainerInheritanceMax节点专门用于处理多个图像数据，通过在多个图像之间应用"最大值"操作来管理图像。该节点抽象了处理图像尺寸和像素值的复杂性，便于创建复合图像，其中考虑了所有图像中每个像素的最大值。

# Input types
## Required
- images_a
    - 'images_a'输入类型接受一组待处理的图像，作为操作的一组图像集。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- images_b
    - 'images_b'输入类型接受第二组图像，与'images_a'配合使用，共同确定操作的范围。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- red
    - 指定操作背景或效果的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 指定操作背景或效果的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 指定操作背景或效果的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 定义操作背景或效果的alpha（透明度）级别。
    - Comfy dtype: FLOAT
    - Python dtype: float
- method
    - 决定了在图像之间应用"最大值"操作的方法。'single'选项将操作应用于创建单个复合图像，'for_each_pair'为每对输入图像生成一个新图像，'for_each_matrix'为'images_a'和'images_b'中的每种可能的图像组合创建一个复合图像，这显著影响了节点的执行和结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是一个单一的图像，代表了在所有输入图像上应用"最大值"操作的复合结果。它封装了输入集中每个像素位置的最高像素值。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageContainerInheritanceMax:
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
                "method": (["single", "for_each_pair", "for_each_matrix"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, images_a, images_b, red, green, blue, alpha, method):
        img_a_height, img_a_width = images_a[0, :, :, 0].shape
        img_b_height, img_b_width = images_b[0, :, :, 0].shape

        width = max(img_a_width, img_b_width)
        height = max(img_a_height, img_b_height)

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
