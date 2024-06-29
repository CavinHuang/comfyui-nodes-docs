# Documentation
- Class name: ImpactLatentInfo
- Category: ImpactPack/Logic/_for_test
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactLatentInfo节点的'doit'方法旨在通过确定给定输入样本的维度来处理潜在信息。它抽象地操作潜在空间以派生空间维度，这在图像相关任务的进一步处理或可视化中至关重要。

# Input types
## Required
- value
    - 参数'value'至关重要，因为它包含节点操作所需的潜在样本。它直接影响节点计算输入数据的空间维度的能力。
    - Comfy dtype: Dict[str, torch.Tensor]
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- batch
    - 参数'batch'代表一批中的样本数量，这是机器学习应用中批量处理的一个基本方面。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 参数'height'表示处理后的图像的垂直维度，这是图像分辨率和空间分析的一个关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 参数'width'表示图像的水平维度，与高度一起决定了图像的整体空间范围。
    - Comfy dtype: INT
    - Python dtype: int
- channel
    - 参数'channel'表示图像中的颜色通道数，这对于理解图像数据的复杂性和组成至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactLatentInfo:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('LATENT',)}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('batch', 'height', 'width', 'channel')

    def doit(self, value):
        shape = value['samples'].shape
        return (shape[0], shape[2] * 8, shape[3] * 8, shape[1])
```