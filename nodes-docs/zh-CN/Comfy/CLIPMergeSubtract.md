# Documentation
- Class name: CLIPSubtract
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPSubtract节点旨在对两个CLIP模型执行减法操作。它将一个CLIP模型的关键补丁合并到另一个模型中，通过调整特定补丁的影响力度，允许对模型特征进行微调。此节点在高级模型合并技术中至关重要，其目标是提炼或修改现有模型的行为。

# Input types
## Required
- clip1
    - 第一个CLIP模型，它将从第二个模型接收补丁。它至关重要，因为它定义了将整合修改的基础模型。
    - Comfy dtype: CLIP
    - Python dtype: An instance of a CLIP model class.
- clip2
    - 提供关键补丁的第二个CLIP模型，这些补丁将从第一个模型中减去。它在确定将改变模型的哪些方面中起着重要作用。
    - Comfy dtype: CLIP
    - Python dtype: An instance of a CLIP model class.
## Optional
- multiplier
    - 一个浮点值，用于调整从第二个CLIP模型合并到第一个模型中的补丁的强度。它对于控制补丁对结果模型的影响程度很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- resulting_clip
    - CLIPSubtract节点的输出是修改后的CLIP模型，现在它包括了从第二个模型减去的补丁，并根据指定的乘数进行了调整。
    - Comfy dtype: CLIP
    - Python dtype: An instance of a modified CLIP model class.

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPSubtract:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip1': ('CLIP',), 'clip2': ('CLIP',), 'multiplier': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CLIP',)
    FUNCTION = 'merge'
    CATEGORY = 'advanced/model_merging'

    def merge(self, clip1, clip2, multiplier):
        m = clip1.clone()
        kp = clip2.get_key_patches()
        for k in kp:
            if k.endswith('.position_ids') or k.endswith('.logit_scale'):
                continue
            m.add_patches({k: kp[k]}, -multiplier, multiplier)
        return (m,)
```