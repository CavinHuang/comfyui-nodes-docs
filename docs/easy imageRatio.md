# Documentation
- Class name: imageRatio
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点类旨在处理图像并计算其尺寸的最大公约数（GCD），从而确定整数和浮点比例上的宽高比。它的目的是简化图像比例的分析，以便进一步处理或显示。

# Input types
## Required
- image
    - 图像参数对于节点至关重要，因为它是被分析尺寸以计算宽高比的主要输入。没有这个输入，节点无法执行其预期功能。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Output types
- result
    - 此输出提供输入图像的计算宽高比，包括整数和浮点格式。它很重要，因为它清晰地说明了图像尺寸之间的关系，这对于各种图像处理任务非常有用。
    - Comfy dtype: COMBO[INT, INT, FLOAT, FLOAT]
    - Python dtype: Tuple[int, int, float, float]
- ui
    - ‘ui’输出是一个包含文本信息的字典，提供了图像宽高比的人类可读摘要。此输出对于在用户界面中显示结果非常有用，通过以易于理解的格式呈现数据来增强用户体验。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class imageRatio:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'FLOAT')
    RETURN_NAMES = ('width_ratio_int', 'height_ratio_int', 'width_ratio_float', 'height_ratio_float')
    OUTPUT_NODE = True
    FUNCTION = 'image_ratio'
    CATEGORY = 'EasyUse/Image'

    def gcf(self, a, b):
        while b:
            (a, b) = (b, a % b)
        return a

    def image_ratio(self, image):
        (_, raw_H, raw_W, _) = image.shape
        width = raw_W
        height = raw_H
        ratio = self.gcf(width, height)
        if width is not None and height is not None:
            width_ratio = width // ratio
            height_ratio = height // ratio
            result = (width_ratio, height_ratio, width_ratio, height_ratio)
        else:
            width_ratio = 0
            height_ratio = 0
            result = (0, 0, 0.0, 0.0)
        text = f'Image Ratio is {str(width_ratio)}:{str(height_ratio)}'
        return {'ui': {'text': text}, 'result': result}
```