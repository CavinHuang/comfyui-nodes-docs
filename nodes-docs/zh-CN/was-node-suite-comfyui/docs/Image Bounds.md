# Documentation
- Class name: WAS_Image_Bounds
- Category: WAS Suite/Image/Bound
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Bounds 节点的 `image_bounds` 方法旨在计算图像的边界，提供用于各种图像处理任务的基本空间信息。它确保在确定图像边界之前正确格式化图像，从而可以准确执行后续操作。

# Input types
## Required
- image
    - 'image' 参数对于节点的操作至关重要，因为它是节点将处理以确定边界的数据源。它是节点功能构建的基础，没有它，节点无法执行其预定任务。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, PIL.Image.Image]

# Output types
- image_bounds
    - 'image_bounds' 输出提供了定义输入图像边界的空间坐标。这些信息对于需要空间感知的任务至关重要，例如裁剪、调整大小或在图像内定位元素。
    - Comfy dtype: COMBO[Tuple[int, int, int, int]]
    - Python dtype: List[Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Bounds:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE_BOUNDS',)
    FUNCTION = 'image_bounds'
    CATEGORY = 'WAS Suite/Image/Bound'

    def image_bounds(self, image):
        image = image.unsqueeze(0) if image.dim() == 3 else image
        return ([(0, img.shape[0] - 1, 0, img.shape[1] - 1) for img in image],)
```