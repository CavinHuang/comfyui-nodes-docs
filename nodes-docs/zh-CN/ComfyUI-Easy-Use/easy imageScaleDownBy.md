# Documentation
- Class name: imageScaleDownBy
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在通过按比例缩小图像尺寸来调整图像大小，同时保持视觉内容的完整性，并减少文件大小，以便更高效地处理或存储。

# Input types
## Required
- images
    - 输入的图像是节点将要处理的主要数据。它们对节点的操作至关重要，因为它们决定了输出的视觉表示和质量。
    - Comfy dtype: COMBO[numpy.ndarray]
    - Python dtype: numpy.ndarray
- scale_by
    - 该参数定义了图像尺寸的缩放因子。它非常重要，因为它直接影响调整大小后的图像的最终尺寸和宽高比。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- images
    - 输出包括调整大小后的图像，这些图像现在尺寸更小，但保留了原始图像的重要视觉元素，准备进行进一步的处理或存储。
    - Comfy dtype: COMBO[numpy.ndarray]
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class imageScaleDownBy(imageScaleDown):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'scale_by': ('FLOAT', {'default': 0.5, 'min': 0.01, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    CATEGORY = 'EasyUse/Image'
    FUNCTION = 'image_scale_down_by'

    def image_scale_down_by(self, images, scale_by):
        width = images.shape[2]
        height = images.shape[1]
        new_width = int(width * scale_by)
        new_height = int(height * scale_by)
        return self.image_scale_down(images, new_width, new_height, 'center')
```