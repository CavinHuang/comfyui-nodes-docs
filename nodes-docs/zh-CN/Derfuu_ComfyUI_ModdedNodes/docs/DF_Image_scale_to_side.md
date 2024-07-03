
# Documentation
- Class name: DF_Image_scale_to_side
- Category: Derfuu_Nodes/Modded nodes/Image
- Output node: False

该节点旨在将图像放大到指定的边长，同时保持纵横比。它允许用户选择要缩放的边（宽度、高度、最长边或最短边）、放大方法以及是否应用裁剪，为图像处理任务提供了灵活性。

# Input types
## Required
- image
    - 需要放大的输入图像。它作为放大过程的基础，决定了将被调整的初始尺寸和纵横比。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- side_length
    - 指定图像将被缩放到的目标边长（宽度或高度）。这个值直接影响放大后图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- side
    - 决定图像的哪一边（宽度、高度、最长边或最短边）将被缩放到指定的边长，影响放大的方向和最终的纵横比。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- upscale_method
    - 用于放大图像的方法，影响输出图像的质量和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- crop
    - 指示是否以及如何裁剪放大后的图像，影响最终的构图和尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 放大后的图像，已调整到指定的边长，同时保持原始纵横比。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - Reroute
    - [ImpactImageInfo](../../ComfyUI-Impact-Pack/Nodes/ImpactImageInfo.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class ImageScale_Side:
    scale_methods = scale_methods
    crop_methods = ["disabled", "center"]

    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": Field.image(),
                "side_length": Field.int(),
                "side": Field.combo(["Longest", "Shortest", "Width", "Height"]),
                "upscale_method": Field.combo(cls.scale_methods),
                "crop": Field.combo(cls.crop_methods)
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"

    CATEGORY = TREE_IMAGES

    def upscale(self, image, upscale_method, side_length: int, side: str, crop):
        samples = image.movedim(-1, 1)

        size = get_image_size(image)

        width_B = int(size[0])
        height_B = int(size[1])

        width = width_B
        height = height_B

        def determineSide(_side: str) -> tuple[int, int]:
            width, height = 0, 0
            if _side == "Width":
                heigh_ratio = height_B / width_B
                width = side_length
                height = heigh_ratio * width
            elif _side == "Height":
                width_ratio = width_B / height_B
                height = side_length
                width = width_ratio * height
            return width, height

        if side == "Longest":
            if width > height:
                width, height = determineSide("Width")
            else:
                width, height = determineSide("Height")
        elif side == "Shortest":
            if width < height:
                width, height = determineSide("Width")
            else:
                width, height = determineSide("Height")
        else:
            width, height = determineSide(side)

        width = math.ceil(width)
        height = math.ceil(height)

        cls = common_upscale(samples, width, height, upscale_method, crop)
        cls = cls.movedim(1, -1)
        return (cls,)

```
