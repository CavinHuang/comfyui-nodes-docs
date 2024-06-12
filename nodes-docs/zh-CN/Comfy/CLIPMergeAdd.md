# Documentation
- Class name: CLIPAdd
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPAdd节点旨在将两个独立的CLIP模型无缝集成到一个统一的结构中。它通过将一个CLIP模型的关键补丁合并到另一个模型中来实现这一点，有效地结合了它们的功能。这个节点在高级模型合并技术中扮演着关键角色，允许通过利用两个组成模型的优势，创建更复杂和更有能力的新模型。

# Input types
## Required
- clip1
    - 第一个CLIP模型，它将作为合并过程的基础。它至关重要，因为它决定了第二个CLIP模型的补丁将被整合进的基础设施架构。
    - Comfy dtype: CLIP
    - Python dtype: An instance of a CLIP model class.
- clip2
    - 提供要合并到第一个CLIP模型中的关键补丁的第二个CLIP模型。选择此模型非常重要，因为它为合并后的模型贡献了额外的功能。
    - Comfy dtype: CLIP
    - Python dtype: An instance of a CLIP model class.

# Output types
- merged_clip
    - 输出是合并后的CLIP模型，现在它包含了两个输入CLIP模型的功能。这个新模型已经准备好用于各种任务的进一步使用或部署。
    - Comfy dtype: CLIP
    - Python dtype: An instance of a CLIP model class representing the merged model.

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPAdd:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip1': ('CLIP',), 'clip2': ('CLIP',)}}
    RETURN_TYPES = ('CLIP',)
    FUNCTION = 'merge'
    CATEGORY = 'advanced/model_merging'

    def merge(self, clip1, clip2):
        m = clip1.clone()
        kp = clip2.get_key_patches()
        for k in kp:
            if k.endswith('.position_ids') or k.endswith('.logit_scale'):
                continue
            m.add_patches({k: kp[k]}, 1.0, 1.0)
        return (m,)
```