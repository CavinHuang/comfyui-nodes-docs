# Documentation
- Class name: imageSizeBySide
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点根据指定的边长标准对图像进行分类，并根据用户对图像较长或较短边的偏好，提供一个简化的分辨率值。

# Input types
## Required
- image
    - 图像参数是必要的，因为它是节点操作的主要输入。它通过决定将被评估和与指定边进行比较的尺寸，从而影响整个处理过程。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- side
    - 边参数决定了分辨率评估的标准，要么关注图像的最长边，要么关注最短边。它显著影响节点功能的结果。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- resolution
    - 分辨率输出提供一个单一的整数值，代表基于边参数选择的图像维度。它是节点操作的核心结果，根据用户的偏好总结了图像的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class imageSizeBySide:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'side': (['Longest', 'Shortest'],)}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('resolution',)
    OUTPUT_NODE = True
    FUNCTION = 'image_side'
    CATEGORY = 'EasyUse/Image'

    def image_side(self, image, side):
        (_, raw_H, raw_W, _) = image.shape
        width = raw_W
        height = raw_H
        if width is not None and height is not None:
            if side == 'Longest':
                result = (width,) if width > height else (height,)
            elif side == 'Shortest':
                result = (width,) if width < height else (height,)
        else:
            result = (0,)
        return {'ui': {'text': str(result[0])}, 'result': result}
```