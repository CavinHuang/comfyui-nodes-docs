# Documentation
- Class name: WAS_Latent_Noise
- Category: WAS Suite/Latent/Generate
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

“inject_noise”方法旨在向一组潜在样本中引入随机噪声，增强生成输出的多样性。此方法对于需要在潜在空间中引入随机变化以模拟现实世界数据分布的应用至关重要。

# Input types
## Required
- samples
    - “samples”参数是一个关键输入，代表将要注入噪声的潜在空间向量。它是节点执行的关键，因为它决定了将要应用随机变化的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- noise_std
    - “noise_std”参数决定了要添加到样本中的噪声的标准差。这是一个可选参数，允许用户控制引入潜在空间的随机性程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- samples
    - 输出的“samples”是注入了噪声的修改后的潜在空间向量。这个输出很重要，因为它构成了工作流中后续处理或生成步骤的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Latent_Noise:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'samples': ('LATENT',), 'noise_std': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'inject_noise'
    CATEGORY = 'WAS Suite/Latent/Generate'

    def inject_noise(self, samples, noise_std):
        s = samples.copy()
        noise = torch.randn_like(s['samples']) * noise_std
        s['samples'] = s['samples'] + noise
        return (s,)
```