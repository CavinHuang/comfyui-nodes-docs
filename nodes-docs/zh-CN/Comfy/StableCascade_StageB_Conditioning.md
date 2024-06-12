# Documentation
- Class name: StableCascade_StageB_Conditioning
- Category: conditioning/stable_cascade
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

方法 `set_prior` 旨在将先验信息整合到条件化过程中，增强级联阶段的稳定性和可预测性。此方法在塑造输出方面发挥关键作用，通过设置基于所提供的条件和阶段上下文的先验信息。

# Input types
## Required
- conditioning
    - 参数 'conditioning' 对节点的操作至关重要，因为它提供了设置先验所必需的上下文信息。它通过确定先验的特征直接影响节点的执行。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- stage_c
    - 参数 'stage_c' 对节点的功能至关重要，它代表用于调节先验的潜在阶段上下文。其值影响在节点操作中如何设置先验。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]

# Output types
- conditioning
    - 输出 'conditioning' 是输入的修改版本，反映了更新后的先验信息。它很重要，因为它将节点处理过的上下文传递给后续阶段。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class StableCascade_StageB_Conditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'stage_c': ('LATENT',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'set_prior'
    CATEGORY = 'conditioning/stable_cascade'

    def set_prior(self, conditioning, stage_c):
        c = []
        for t in conditioning:
            d = t[1].copy()
            d['stable_cascade_prior'] = stage_c['samples']
            n = [t[0], d]
            c.append(n)
        return (c,)
```