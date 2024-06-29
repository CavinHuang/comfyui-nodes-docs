# Documentation
- Class name: WAS_Bounded_Image_Crop
- Category: WAS Suite/Image/Bound
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

函数 `bounded_image_crop` 旨在根据指定的边界智能裁剪图像，确保裁剪区域在图像的有效尺寸内。它在图像预处理中扮演着关键角色，通过专注于兴趣区域而不扭曲整个图像结构。

# Input types
## Required
- image
    - 参数 'image' 是节点的核心输入，代表将要被裁剪的图像数据。它对节点的执行至关重要，因为它决定了将要处理的内容。图像的尺寸和质量直接影响裁剪操作的结果。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, PIL.Image.Image]
- image_bounds
    - 参数 'image_bounds' 定义了图像中将要被裁剪的区域。它对于指定裁剪操作的确切坐标至关重要。这些边界的正确性非常关键，因为它们决定了裁剪后图像的最终外观。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: List[Tuple[int, int, int, int]]

# Output types
- cropped_image
    - 输出参数 'cropped_image' 代表裁剪操作的结果。它很重要，因为它是节点功能的直接输出，包含了输入图像裁剪区域的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Bounded_Image_Crop:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'image': ('IMAGE',), 'image_bounds': ('IMAGE_BOUNDS',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'bounded_image_crop'
    CATEGORY = 'WAS Suite/Image/Bound'

    def bounded_image_crop(self, image, image_bounds):
        image = image.unsqueeze(0) if image.dim() == 3 else image
        bounds_len = 1 if len(image_bounds) != len(image) else len(image)
        cropped_images = []
        for idx in range(len(image)):
            if bounds_len == 1 and idx == 0 or bounds_len > 1:
                (rmin, rmax, cmin, cmax) = image_bounds[idx]
                if rmin > rmax or cmin > cmax:
                    raise ValueError('Invalid bounds provided. Please make sure the bounds are within the image dimensions.')
            cropped_images.append(image[idx][rmin:rmax + 1, cmin:cmax + 1, :])
        return (torch.stack(cropped_images, dim=0),)
```