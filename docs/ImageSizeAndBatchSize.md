# Documentation
- Class name: ImageSizeAndBatchSize
- Category: Animate Diff/Utils
- Output node: False
- Repo Ref: https://github.com/ArtVentureX/comfyui-animatediff.git

此类节点旨在提取并返回关键的图像属性，如大小和批量维度，便于系统内进行进一步的处理和分析。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是节点执行功能的主输入。它通过确定输出的尺寸和批量大小来影响节点的操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- width
    - 宽度参数代表图像的水平维度，是图像分析和处理的一个基本方面。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数表示图像的垂直维度，在结构理解和操作图像数据中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 批量大小参数指示一批图像中图像的数量，这对于优化计算效率和在图像处理期间管理资源至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImageSizeAndBatchSize:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',)}}
    CATEGORY = 'Animate Diff/Utils'
    RETURN_TYPES = ('INT', 'INT', 'INT')
    RETURN_NAMES = ('width', 'height', 'batch_size')
    FUNCTION = 'batch_size'

    def batch_size(self, image: Tensor):
        (batch_size, height, width) = image.shape[0:3]
        return (width, height, batch_size)
```