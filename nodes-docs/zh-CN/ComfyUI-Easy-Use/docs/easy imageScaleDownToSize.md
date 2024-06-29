# Documentation
- Class name: imageScaleDownToSize
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在将图像调整到指定大小，同时保持纵横比，并确保调整后的图像适应所需的尺寸。根据所选的最大或最小维度调整缩放因子，允许控制图像如何缩放。

# Input types
## Required
- images
    - 输入的图像是节点将要处理的主要数据。它们对节点的运行至关重要，因为整个功能都围绕着将这些图像调整到期望的尺寸。
    - Comfy dtype: COMBO[numpy.ndarray]
    - Python dtype: numpy.ndarray
- size
    - 尺寸参数决定了输入图像将被缩放到的目标尺寸。它是决定输出外观和尺寸的关键因素。
    - Comfy dtype: int
    - Python dtype: int
## Optional
- mode
    - 模式参数影响缩放是基于图像的最大或最小维度。这影响了最终的宽高比和缩放方向。
    - Comfy dtype: boolean
    - Python dtype: bool

# Output types
- output_image
    - 输出图像是节点处理的结果，其中输入图像已根据指定参数调整大小。它代表了节点功能的实际操作。
    - Comfy dtype: numpy.ndarray
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class imageScaleDownToSize(imageScaleDownBy):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'size': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'max', 'label_off': 'min'})}}
    RETURN_TYPES = ('IMAGE',)
    CATEGORY = 'EasyUse/Image'
    FUNCTION = 'image_scale_down_to_size'

    def image_scale_down_to_size(self, images, size, mode):
        width = images.shape[2]
        height = images.shape[1]
        if mode:
            scale_by = size / max(width, height)
        else:
            scale_by = size / min(width, height)
        scale_by = min(scale_by, 1.0)
        return self.image_scale_down_by(images, scale_by)
```