# Documentation
- Class name: SetLatentNoiseMask
- Category: latent/inpaint
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SetLatentNoiseMask节点旨在将噪声掩码应用于一组潜在样本。它在修复过程中发挥关键作用，通过允许对潜在空间表示进行选择性操作。该节点确保根据提供的掩码适当修改掩蔽区域，这对于生成连贯且准确的视觉输出至关重要。

# Input types
## Required
- samples
    - “samples”参数是将通过噪声掩码修改的潜在表示的集合。它对节点的操作至关重要，因为它决定了将经历掩蔽过程的数据。该参数直接影响节点的执行和最终的视觉效果。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- mask
    - “mask”参数定义了需要被掩蔽的潜在样本的区域。它对节点至关重要，因为它决定了潜在空间中将被更改的部分。掩码的形状必须与潜在样本兼容，以便节点能正确工作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- modified_samples
    - “modified_samples”输出由已应用噪声掩码的潜在样本组成。这个输出很重要，因为它代表了节点的主要结果，将用于后续的修复工作流程阶段。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class SetLatentNoiseMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'set_mask'
    CATEGORY = 'latent/inpaint'

    def set_mask(self, samples, mask):
        s = samples.copy()
        s['noise_mask'] = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1]))
        return (s,)
```