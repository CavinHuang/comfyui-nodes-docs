# Documentation
- Class name: EmptyLatentRatioSelector
- Category: Mikey/Latent
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

EmptyLatentRatioSelector 节点旨在为一组给定的比率尺寸生成潜在表示。它在潜在空间操作的初始阶段扮演着关键角色，为进一步处理提供了一个结构化的起点。该节点确保潜在空间得到适当的初始化，为后续操作奠定了基础。

# Input types
## Required
- ratio_selected
    - ‘ratio_selected’参数对于确定用于潜在生成的特定比率尺寸至关重要。它决定了潜在空间的维度，是节点操作的一个基本方面，直接影响输出的结构。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- batch_size
    - ‘batch_size’参数允许指定在单个操作中生成的潜在样本的数量。它是一个可选参数，可以根据计算资源和手头任务的具体要求进行调整。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - ‘samples’输出参数代表生成的潜在表示。它是一个张量，包含了潜在空间的信息，这对于系统中的后续处理和分析至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class EmptyLatentRatioSelector:

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_sizes, s.ratio_dict) = read_ratios()
        return {'required': {'ratio_selected': (s.ratio_sizes,), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Latent'

    def generate(self, ratio_selected, batch_size=1):
        width = self.ratio_dict[ratio_selected]['width']
        height = self.ratio_dict[ratio_selected]['height']
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return ({'samples': latent},)
```