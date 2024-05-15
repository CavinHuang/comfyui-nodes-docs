# Documentation
- Class name: FlipSigmas
- Category: sampling/custom_sampling/sigmas
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FlipSigmas节点旨在操作采样过程中使用的sigma值。它能够反转sigmas的顺序，确保采样过程遵循特定的序列。在自定义采样策略中，该节点对于结果有重要影响，其中sigmas的顺序对结果至关重要。

# Input types
## Required
- sigmas
    - ‘sigmas’参数是一个张量，包含采样过程中使用的sigma值。它对于定义采样期间噪声减少的顺序和尺度至关重要。节点对这一参数的操作直接影响生成样本的质量和特性。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- SIGMAS
    - 输出‘SIGMAS’是一个张量，表示翻转后的sigma值。这一输出非常重要，因为它决定了后续采样步骤的修改序列，可能导致生成样本的不同结果。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class FlipSigmas:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sigmas': ('SIGMAS',)}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/sigmas'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, sigmas):
        if len(sigmas) == 0:
            return (sigmas,)
        sigmas = sigmas.flip(0)
        if sigmas[0] == 0:
            sigmas[0] = 0.0001
        return (sigmas,)
```