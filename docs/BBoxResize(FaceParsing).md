# Documentation
- Class name: BBoxResize
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

BBoxResize节点旨在将边界框（BBOX）的尺寸调整为适应新的图像尺寸。它执行一个缩放操作，确保边界框坐标按比例调整大小，同时不改变它们在图像中的相对位置。此节点对于在不同图像分辨率下保持对象检测的完整性至关重要。

# Input types
## Required
- bbox
    - 参数'bbox'代表需要调整大小的边界框坐标。它对节点的操作至关重要，因为它决定了对象在图像中的初始位置和大小。
    - Comfy dtype: BBOX
    - Python dtype: torch.Tensor
- width_old
    - 参数'width_old'指定了相对于边界框坐标的原始图像宽度。它对于计算新尺寸的正确缩放因子是必要的。
    - Comfy dtype: INT
    - Python dtype: int
- height_old
    - 参数'height_old'定义了图像的原始高度。它在调整大小的过程中起着关键作用，确保边界框的垂直比例得以保持。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 参数'width'表示调整大小后图像的新宽度。它是节点计算调整后的边界框坐标的关键输入。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 参数'height'表示图像调整大小后的新高度。它对于在调整大小过程中保持边界框的纵横比至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- BBOX
    - 输出'BBOX'是调整大小后的边界框坐标，已调整以适应新的图像尺寸。它很重要，因为它提供了调整大小后的图像中对象的更新位置和大小。
    - Comfy dtype: BBOX
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class BBoxResize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'bbox': ('BBOX', {}), 'width_old': ('INT', {}), 'height_old': ('INT', {}), 'width': ('INT', {}), 'height': ('INT', {})}}
    RETURN_TYPES = ('BBOX',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, bbox: Tensor, width_old: int, height_old: int, width: int, height: int):
        newBbox = bbox.clone()
        bbox_values = newBbox.float()
        l = bbox_values[0] / width_old * width
        t = bbox_values[1] / height_old * height
        r = bbox_values[2] / width_old * width
        b = bbox_values[3] / height_old * height
        newBbox[0] = l
        newBbox[1] = t
        newBbox[2] = r
        newBbox[3] = b
        return (newBbox,)
```