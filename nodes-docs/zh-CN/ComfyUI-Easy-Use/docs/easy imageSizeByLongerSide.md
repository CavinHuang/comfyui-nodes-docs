# Documentation
- Class name: imageSizeByLongerSide
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点类根据较长的维度对图像进行分类，通过关注图像的较长边，为图像分析和处理提供了简化的方法。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是节点操作的主要输入。它通过决定节点输出的基础，影响整个处理过程。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Output types
- resolution
    - 分辨率输出提供图像较长边的长度，这对于后续的图像处理任务和分析至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class imageSizeByLongerSide:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('resolution',)
    OUTPUT_NODE = True
    FUNCTION = 'image_longer_side'
    CATEGORY = 'EasyUse/Image'

    def image_longer_side(self, image):
        (_, raw_H, raw_W, _) = image.shape
        width = raw_W
        height = raw_H
        if width is not None and height is not None:
            if width > height:
                result = (width,)
            else:
                result = (height,)
        else:
            result = (0,)
        return {'ui': {'text': str(result[0])}, 'result': result}
```