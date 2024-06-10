# Documentation
- Class name: JoinImageBatch
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点能够将多个图像合并成一个大图像，可以通过垂直或水平堆叠图像来实现。它旨在简化创建图像拼贴或结合视觉数据进行比较和分析的过程。

# Input types
## Required
- images
    - images参数是提供要合并的图像批次的关键输入。它是一个包含图像批次的numpy数组，其中每个图像都是像素值的多维数组。
    - Comfy dtype: COMBO[numpy.ndarray]
    - Python dtype: numpy.ndarray
## Optional
- mode
    - mode参数决定了合并图像的方向，可以是'horizontal'或'vertical'。它影响了图像在最终合并图像中的排列方式。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- image
    - 输出图像是输入图像批次合并的结果。它代表了一个单一的大图像，包含了所有水平或垂直排列的输入图像。
    - Comfy dtype: numpy.ndarray
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class JoinImageBatch:
    """Turns an image batch into one big image."""

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'mode': (('horizontal', 'vertical'), {'default': 'horizontal'})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'join'
    CATEGORY = 'EasyUse/Image'

    def join(self, images, mode):
        (n, h, w, c) = images.shape
        image = None
        if mode == 'vertical':
            image = images.reshape(1, n * h, w, c)
        elif mode == 'horizontal':
            image = torch.transpose(torch.transpose(images, 1, 2).reshape(1, n * w, h, c), 1, 2)
        return (image,)
```