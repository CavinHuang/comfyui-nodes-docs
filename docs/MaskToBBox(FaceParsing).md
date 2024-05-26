# Documentation
- Class name: MaskToBBox
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

该节点类封装了将面部遮罩数据转换为边界框坐标的功能，便于在图像中定位面部特征以进行进一步分析。

# Input types
## Required
- mask
    - 遮罩参数是一个张量，代表面部遮罩，对于识别图像中的兴趣区域至关重要。它直接影响生成的边界框的准确性和质量。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
## Optional
- pad
    - pad参数允许通过填充边缘来调整边界框坐标。这对于细化边界框，使其更好地适应整个图像中的面部特征非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- BBOX
    - 输出提供了一个元组列表，每个元组代表一个边界框的坐标。这些坐标对于定位面部特征非常重要，并且可以用于后续的处理步骤。
    - Comfy dtype: List[Tuple[INT, INT, INT, INT]]
    - Python dtype: List[Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class MaskToBBox:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',), 'pad': ('INT', {'default': 0, 'min': 0, 'step': 1})}}
    RETURN_TYPES = ('BBOX',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, mask: Tensor, pad: int):
        result = ops.masks_to_boxes(mask)
        if pad != 0:
            for item in result:
                item[0] = item[0] - pad
                item[1] = item[1] - pad
                item[2] = item[2] + pad
                item[3] = item[3] + pad
        return (result,)
```