# Documentation
- Class name: SeargeVAELoader
- Category: Searge/_deprecated_/Files
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在方便地加载VAE（变分自编码器）模型，为在工作流中访问和使用这些机器学习模型提供简化的接口。它抽象了模型检索的复杂性，确保VAE模型可以无缝集成到系统中，而无需详细了解底层的存储和加载机制。

# Input types
## Required
- vae_name
    - ‘vae_name’参数对于指定要加载的VAE模型的唯一标识符至关重要。它作为从存储系统中定位和检索相应模型的键，其正确使用确保了预期VAE模型的准确和高效加载。
    - Comfy dtype: COMBO['VAE_NAME']
    - Python dtype: str

# Output types
- VAE
    - 输出VAE代表加载的变分自编码器模型，随后可以用于各种任务，如数据生成、特征提取等。它是模型加载过程成功的标志，对于工作流中进一步操作至关重要。
    - Comfy dtype: VAE
    - Python dtype: nodes.VAE

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeVAELoader:

    def __init__(self):
        self.vae_loader = nodes.VAELoader()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'vae_name': ('VAE_NAME',)}}
    RETURN_TYPES = ('VAE',)
    FUNCTION = 'load_vae'
    CATEGORY = 'Searge/_deprecated_/Files'

    def load_vae(self, vae_name):
        return self.vae_loader.load_vae(vae_name)
```