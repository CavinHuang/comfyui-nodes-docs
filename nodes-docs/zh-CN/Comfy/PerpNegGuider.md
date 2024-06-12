# Documentation
- Class name: PerpNegGuider
- Category: _for_testing
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PerpNegGuider 节点旨在通过提供影响模型输出的条件输入来指导生成过程。它通过设置正向和负向条件以及一个空条件来引导生成过程，以达到期望的结果。该节点还允许配置一个缩放因子和一个控制参数，增强了引导的灵活性和精确性。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了节点将与之交互的生成模型。它是节点功能的基础，使得根据指定的条件引导生成过程成为可能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - 正向调节参数对于定义生成过程中指导器应关注的正向方面至关重要。它有助于将输出塑造成期望的品质。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负向调节参数用于指定生成的输出中应避免哪些方面。它在提炼生成内容以排除不需要的元素中起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- empty_conditioning
    - 空条件参数用于为生成过程设置一个基线或中性状态。它对于建立一个参考点很重要，正向和负向条件可以从这个参考点有效地引导输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
## Optional
- cfg
    - cfg 参数作为一个控制因子，调整条件对生成过程的影响。它在微调指导和模型自然生成倾向之间的平衡中非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- neg_scale
    - neg_scale 参数调整负向调节的影响，允许微调在生成中不鼓励不希望出现的方面的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- guider
    - guider 输出是封装了节点提供的条件和设置的配置好的引导对象。它在引导生成模型产生与指定指导一致的输出方面起着重要作用。
    - Comfy dtype: GUIDER
    - Python dtype: comfy.samplers.CFGGuider

# Usage tips
- Infra type: CPU

# Source code
```
class PerpNegGuider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'empty_conditioning': ('CONDITIONING',), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'neg_scale': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01})}}
    RETURN_TYPES = ('GUIDER',)
    FUNCTION = 'get_guider'
    CATEGORY = '_for_testing'

    def get_guider(self, model, positive, negative, empty_conditioning, cfg, neg_scale):
        guider = Guider_PerpNeg(model)
        guider.set_conds(positive, negative, empty_conditioning)
        guider.set_cfg(cfg, neg_scale)
        return (guider,)
```