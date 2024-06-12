# Documentation
- Class name: EmptyLatentRatioCustom
- Category: Mikey/Latent
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

EmptyLatentRatioCustom节点旨在为给定的一组维度和批量大小生成潜在表示。它根据预定义的比率或用户自定义的比率智能确定适当的潜在大小，确保输出的潜在空间最适合进一步处理或生成任务。

# Input types
## Required
- width
    - 宽度参数对于定义输入空间的水平维度至关重要。它直接影响潜在大小的计算，这对于节点的输出是必不可少的。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数指定输入空间的垂直维度。它与宽度参数一起工作，以确定潜在大小，这是节点功能的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- batch_size
    - 批量大小参数允许用户指定一次处理的样本数量。这是一个可选参数，可以影响节点执行的效率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - 样本输出提供生成的潜在表示。它很重要，因为它为工作流中的后续操作或分析奠定了基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class EmptyLatentRatioCustom:

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_sizes, s.ratio_dict) = read_ratios()
        return {'required': {'width': ('INT', {'default': 1024, 'min': 1, 'max': 8192, 'step': 1}), 'height': ('INT', {'default': 1024, 'min': 1, 'max': 8192, 'step': 1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Latent'

    def generate(self, width, height, batch_size=1):
        if width == 1 and height == 1 or width == height:
            (w, h) = (1024, 1024)
        if f'{width}:{height}' in self.ratio_dict:
            (w, h) = self.ratio_dict[f'{width}:{height}']
        else:
            (w, h) = find_latent_size(width, height)
        latent = torch.zeros([batch_size, 4, h // 8, w // 8])
        return ({'samples': latent},)
```