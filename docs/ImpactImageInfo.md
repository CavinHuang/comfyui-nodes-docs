# Documentation
- Class name: ImpactImageInfo
- Category: ImpactPack/Logic/_for_test
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactImageInfo节点的'doit'方法旨在提供关键的图像信息。它对于理解图像数据集的维度和结构至关重要，这对于下游处理和分析任务至关重要。该方法抽象地传达了节点提取并返回输入图像的批量大小、高度、宽度和通道数的能力。

# Input types
## Required
- value
    - ‘value’参数是节点处理的输入图像数据。它的作用是基础性的，因为它直接影响到关于图像尺寸的输出信息。这个参数对于节点的执行至关重要，因为它是确定批量大小、高度、宽度和通道数的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- batch
    - ‘batch’参数表示在单个批次中处理的图像数量。它很重要，因为它指示了一次处理的数据量，这对于优化计算资源和理解分析的范围非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数表示输入图像的垂直维度。它是决定空间分辨率的关键因素，对于图像的操纵和显示目的至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - ‘width’参数表示输入图像的水平维度。它在整体图像分辨率中扮演着关键角色，对于确保正确的宽高比和显示格式至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- channel
    - ‘channel’参数指的是图像中的颜色分量数量，对于RGB图像通常是三个。它是颜色深度的决定因素，对于颜色处理和图像增强任务至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactImageInfo:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('IMAGE',)}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('batch', 'height', 'width', 'channel')

    def doit(self, value):
        return (value.shape[0], value.shape[1], value.shape[2], value.shape[3])
```