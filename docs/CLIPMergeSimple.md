# Documentation
- Class name: CLIPMergeSimple
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPMergeSimple节点旨在将两个独立的CLIP模型无缝地集成到一个统一的表示中。它通过将一个模型的关键补丁合并到另一个模型中来实现这一点，基于指定的比率，该比率决定了每个模型对最终合并输出的影响。这个节点特别适用于高级应用，其中需要结合两个模型的洞察力，而无需从头开始训练一个新模型。

# Input types
## Required
- clip1
    - 将用作合并基础的第一个CLIP模型。它作为主要结构，第二个模型的补丁将被整合其中。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model object
- clip2
    - 其关键补丁将被合并到基础模型中的第二个CLIP模型。补丁的选择有助于合并模型的最终结果。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model object
- ratio
    - 比例参数控制第二个模型的补丁对合并模型的影响。较高的比例增加了第二个模型的影响，而较低的比例则有利于第一个模型的属性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_clip
    - CLIPMergeSimple节点的输出是一个合并后的CLIP模型，它包含了两个输入模型的组合特征，为下游任务提供了更精细的表示。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model object

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPMergeSimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip1': ('CLIP',), 'clip2': ('CLIP',), 'ratio': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('CLIP',)
    FUNCTION = 'merge'
    CATEGORY = 'advanced/model_merging'

    def merge(self, clip1, clip2, ratio):
        m = clip1.clone()
        kp = clip2.get_key_patches()
        for k in kp:
            if k.endswith('.position_ids') or k.endswith('.logit_scale'):
                continue
            m.add_patches({k: kp[k]}, 1.0 - ratio, ratio)
        return (m,)
```