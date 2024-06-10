# Documentation
- Class name: WAS_Bounded_Image_Crop_With_Mask
- Category: WAS Suite/Image/Bound
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `bounded_image_crop_with_mask` 旨在根据对应的掩码定义的边界智能裁剪图像。它通过关注掩码所描绘的感兴趣区域来增强图像，同时应用填充以确保裁剪区域保持所需的纵横比或大小。

# Input types
## Required
- image
    - 将要按照掩码进行裁剪的输入图像。它是操作的主要对象，并决定了裁剪后将保留的内容。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, PIL.Image.Image]
- mask
    - 定义图像内感兴趣区域的掩码。它用于识别裁剪操作的边界，对于确定图像的哪些部分是重要的至关重要。
    - Comfy dtype: MASK
    - Python dtype: Union[torch.Tensor, PIL.Image.Image]
## Optional
- padding_left
    - 要添加到裁剪图像左侧的填充量。此参数是可选的，可以调整以控制裁剪区域的最终宽度。
    - Comfy dtype: INT
    - Python dtype: int
- padding_right
    - 要添加到裁剪图像右侧的填充量。它与左侧的填充一起工作，以确保裁剪后的图像满足特定的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- padding_top
    - 要添加到裁剪图像顶部的填充量。这种填充有助于保持裁剪部分的纵横比或实现所需的高度。
    - Comfy dtype: INT
    - Python dtype: int
- padding_bottom
    - 要添加到裁剪图像底部的填充量。它确保裁剪后的图像在掩码定义的感兴趣区域下方有足够的空间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cropped_image
    - 裁剪操作后的图像结果，包括由掩码定义的感兴趣区域和应用的填充。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_bounds
    - 定义原始图像中裁剪区域边界的坐标。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: List[Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Bounded_Image_Crop_With_Mask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'image': ('IMAGE',), 'mask': ('MASK',), 'padding_left': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615}), 'padding_right': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615}), 'padding_top': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615}), 'padding_bottom': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE_BOUNDS')
    FUNCTION = 'bounded_image_crop_with_mask'
    CATEGORY = 'WAS Suite/Image/Bound'

    def bounded_image_crop_with_mask(self, image, mask, padding_left, padding_right, padding_top, padding_bottom):
        image = image.unsqueeze(0) if image.dim() == 3 else image
        mask = mask.unsqueeze(0) if mask.dim() == 2 else mask
        mask_len = 1 if len(image) != len(mask) else len(image)
        cropped_images = []
        all_bounds = []
        for i in range(len(image)):
            if mask_len == 1 and i == 0 or mask_len > 0:
                rows = torch.any(mask[i], dim=1)
                cols = torch.any(mask[i], dim=0)
                (rmin, rmax) = torch.where(rows)[0][[0, -1]]
                (cmin, cmax) = torch.where(cols)[0][[0, -1]]
                rmin = max(rmin - padding_top, 0)
                rmax = min(rmax + padding_bottom, mask[i].shape[0] - 1)
                cmin = max(cmin - padding_left, 0)
                cmax = min(cmax + padding_right, mask[i].shape[1] - 1)
            all_bounds.append([rmin, rmax, cmin, cmax])
            cropped_images.append(image[i][rmin:rmax + 1, cmin:cmax + 1, :])
            return (torch.stack(cropped_images), all_bounds)
```