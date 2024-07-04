
# Documentation
- Class name: DF_Image_scale_by_ratio
- Category: Derfuu_Nodes/Modded nodes/Image
- Output node: False

该节点旨在通过指定比例对图像进行放大，应用选定的放大方法，并可选择性地裁剪图像。它主要关注基于缩放因子调整图像尺寸，提高图像质量或使其适应所需大小，同时保持其宽高比。

# Input types
## Required
- image
    - 需要放大的图像。它是节点操作的核心，决定了缩放的基础和放大过程的对象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- upscale_by
    - 图像尺寸应该增加的倍数。这个值直接影响放大后图像的最终大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_method
    - 用于放大图像的方法。不同的方法会影响放大图像的质量和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- crop
    - 决定是否以及如何裁剪放大后的图像，影响输出的最终构图和宽高比。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输入图像的放大版本，可能根据指定的方法进行了裁剪。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageScale_Ratio:
    scale_methods = scale_methods
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": Field.image(),
                "upscale_by": Field.float(),
                "upscale_method": Field.combo(cls.scale_methods),
                "crop": Field.combo(cls.crop_methods)
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"

    CATEGORY = TREE_IMAGES

    def upscale(self, image, upscale_method, upscale_by, crop):
        size = get_image_size(image)

        width_B = int(size[0])
        height_B = int(size[1])

        samples = image.movedim(-1, 1)

        height = math.ceil(height_B * upscale_by)
        width = math.ceil(width_B * upscale_by)
        cls = common_upscale(samples, width, height, upscale_method, crop)
        cls = cls.movedim(1, -1)
        return (cls,)

```
