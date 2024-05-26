# Documentation
- Class name: KfDebug_Latent
- Category: debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfDebug_Latent 节点旨在提供对基于关键帧模型生成的潜在空间表示的洞察。它作为诊断工具，允许检查和分析潜在特征，这对于理解模型数据处理能力的潜在结构和质量至关重要。

# Input types
## Required
- input_data
    - input_data 参数是输入到节点的原始数据，预期是以 PyTorch 张量的形式。它至关重要，因为它构成了节点进行潜在空间分析的基础。input_data 的质量和结构直接影响节点生成有意义的潜在表示的能力。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- latent_representation
    - latent_representation 输出提供了节点分析得出的处理后的潜在空间数据。它很重要，因为它包含了从 input_data 中提取的信息，提供了潜在特征的浓缩视图。这个输出对于进一步研究或可视化模型的潜在空间非常有用。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Latent(KfDebug_Passthrough):
    RETURN_TYPES = ('LATENT',)
```