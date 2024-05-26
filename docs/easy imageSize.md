# Documentation
- Class name: imageSize
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在提取并提供图像的尺寸，重点关注宽度和高度作为关键属性。它在图像处理中作为一个基础工具，使得基于这些参数进行进一步的分析和操作成为可能。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点派生宽度和高度值的来源。没有这个输入，节点无法执行其主要功能。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Output types
- width_int
    - width_int 输出代表输入图像的水平维度，为进一步的图像相关操作提供了关键信息。
    - Comfy dtype: INT
    - Python dtype: int
- height_int
    - height_int 输出表示输入图像的垂直维度，这对于理解图像的结构和后续的图像处理任务至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class imageSize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width_int', 'height_int')
    OUTPUT_NODE = True
    FUNCTION = 'image_width_height'
    CATEGORY = 'EasyUse/Image'

    def image_width_height(self, image):
        (_, raw_H, raw_W, _) = image.shape
        width = raw_W
        height = raw_H
        if width is not None and height is not None:
            result = (width, height)
        else:
            result = (0, 0)
        return {'ui': {'text': 'Width: ' + str(width) + ' , Height: ' + str(height)}, 'result': result}
```