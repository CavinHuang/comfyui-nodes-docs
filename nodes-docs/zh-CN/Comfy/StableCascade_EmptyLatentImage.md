# Documentation
- Class name: StableCascade_EmptyLatentImage
- Category: latent/stable_cascade
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

StableCascade_EmptyLatentImage节点旨在为级联模型的不同阶段生成图像的潜在表示。它通过创建零填充张量来操作，这些张量对应于输入参数指定的维度，在稳定级联过程中初始化潜在状态至关重要。

# Input types
## Required
- width
    - 宽度参数定义了潜在图像的宽度，对于确定生成张量的维度至关重要。它影响潜在空间的结构，因此影响级联模型输出的质量。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数指定了潜在图像的高度，是张量形状的关键因素。它在潜在表示的整体结构中起着重要作用，并影响级联模型的性能。
    - Comfy dtype: INT
    - Python dtype: int
- compression
    - 压缩参数控制应用于潜在图像维度的压缩级别。它对于管理模型复杂性与计算效率之间的平衡以及级联模型输出的保真度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- batch_size
    - batch_size参数表示一次迭代中要处理的样本数量。它对于优化节点的执行很重要，并且可以影响级联模型的吞吐量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- stage_c
    - stage_c输出提供了级联的粗略阶段的潜在表示，这是图像生成初始阶段的关键组成部分。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- stage_b
    - stage_b输出提供了级联的基础阶段的潜在表示，这对于图像细化的后续阶段至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class StableCascade_EmptyLatentImage:

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024, 'min': 256, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 1024, 'min': 256, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'compression': ('INT', {'default': 42, 'min': 4, 'max': 128, 'step': 1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('stage_c', 'stage_b')
    FUNCTION = 'generate'
    CATEGORY = 'latent/stable_cascade'

    def generate(self, width, height, compression, batch_size=1):
        c_latent = torch.zeros([batch_size, 16, height // compression, width // compression])
        b_latent = torch.zeros([batch_size, 4, height // 4, width // 4])
        return ({'samples': c_latent}, {'samples': b_latent})
```