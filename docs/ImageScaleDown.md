
# Documentation
- Class name: ImageScaleDown
- Category: Art Venture/Utils
- Output node: False

ImageScaleDown节点旨在将一张或一批图像缩小到较小尺寸，同时保持宽高比，并可选择性地进行中心裁剪以适应指定的尺寸。这一操作对于优化图像处理工作流程、减少计算负载以及为进一步处理或显示准备图像至关重要。

# Input types
## Required
- images
    - 需要缩小的输入图像。这个参数至关重要，因为它直接影响输出，决定哪些图像将经历缩放处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- width
    - 缩小后图像的目标宽度。这个参数定义了输出图像的水平尺寸，影响缩放比例。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 缩小后图像的目标高度。这个参数定义了输出图像的垂直尺寸，影响缩放比例。
    - Comfy dtype: INT
    - Python dtype: int
- crop
    - 指定图像在缩放后是否以及如何裁剪以确保适应目标尺寸的模式。这会影响缩放图像的最终外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 缩小后的图像，可能经过裁剪以适应指定的尺寸。这个输出是对输入图像应用缩放操作的直接结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageScaleDown:
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "width": (
                    "INT",
                    {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1},
                ),
                "height": (
                    "INT",
                    {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1},
                ),
                "crop": (s.crop_methods,),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_scale_down"

    def image_scale_down(self, images, width, height, crop):
        if crop == "center":
            old_width = images.shape[2]
            old_height = images.shape[1]
            old_aspect = old_width / old_height
            new_aspect = width / height
            x = 0
            y = 0
            if old_aspect > new_aspect:
                x = round((old_width - old_width * (new_aspect / old_aspect)) / 2)
            elif old_aspect < new_aspect:
                y = round((old_height - old_height * (old_aspect / new_aspect)) / 2)
            s = images[:, y : old_height - y, x : old_width - x, :]
        else:
            s = images

        results = []
        for image in s:
            img = tensor2pil(image).convert("RGB")
            img = img.resize((width, height), Image.LANCZOS)
            results.append(pil2tensor(img))

        return (torch.cat(results, dim=0),)

```
