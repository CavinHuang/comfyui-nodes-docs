# Documentation
- Class name: ImageResizeWithBBox
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

该节点旨在在调整图像大小的同时保持边界框的宽高比和位置，确保图像内的关键元素适当缩放并保持用于进一步处理。

# Input types
## Required
- bbox
    - 边界框参数对于定义图像内的兴趣区域至关重要。它决定了图像的裁剪方式，并确保在调整大小过程中重要特征居中并得到维护。
    - Comfy dtype: BBOX
    - Python dtype: torch.Tensor
- image
    - 图像参数是这个节点的主要输入，它将根据指定的调整大小要求进行处理。它对于提供将要被转换和分析的视觉数据至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- resized_image
    - 该节点的输出是调整大小后的图像，其已调整为满足期望的尺寸，同时保持边界框的位置和宽高比不变，以便进行进一步的分析或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageResizeWithBBox:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'bbox': ('BBOX', {}), 'image': ('IMAGE', {})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, bbox: Tensor, image: Tensor):
        bbox_int = bbox.int()
        l = bbox_int[0]
        t = bbox_int[1]
        r = bbox_int[2]
        b = bbox_int[3]
        resized_image = functional.resize(image.permute(0, 3, 1, 2), [b - t, r - l]).permute(0, 2, 3, 1)
        return (resized_image,)
```