# Documentation
- Class name: RemoveNoiseMask
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

该节点旨在通过从输入样本中移除不需要的噪声来处理和优化数据，确保后续的分析或处理步骤基于更干净、更可靠的信息。

# Input types
## Required
- samples
    - “samples”参数是节点的关键输入，因为它包含了将被处理的数据。节点的功能集中在从这些样本中识别并移除噪声，以提高数据的质量。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- res
    - “res”输出是节点操作的结果，包含去噪后的样本。它代表了可以用于进一步处理或分析的精炼数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class RemoveNoiseMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, samples):
        res = {key: value for (key, value) in samples.items() if key != 'noise_mask'}
        return (res,)
```