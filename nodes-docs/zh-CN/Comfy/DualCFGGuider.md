# Documentation
- Class name: DualCFGGuider
- Category: sampling/custom_sampling/guiders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DualCFGGuider节点旨在通过使用两组条件来指导生成模型的采样过程。它专注于通过可配置参数调整正面、负面和中间条件的影响，从而增强对生成结果的控制，允许对输出进行微调控制。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了节点将用于采样过程的生成模型。它定义了应用条件和配置以生成所需输出的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- cond1
    - 第一个条件输入对于提供采样过程的初始上下文或指导至关重要。它有助于根据手头任务的具体要求塑造生成内容的方向。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- cond2
    - 第二个条件输入通过提供额外的上下文层来进一步完善采样过程。它与第一个条件输入协同工作，以实现更微妙和详细的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - 负面条件输入在引导采样过程远离不希望的结果方面起着关键作用。它有助于定义生成内容中应避免的内容，确保结果更具针对性和专注性。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
## Optional
- cfg_conds
    - cfg_conds参数允许调整配置条件，影响采样过程中正面和负面影响的平衡。这是实现对生成控制所需水平的重要调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_cond2_negative
    - cfg_cond2_negative参数用于微调第二个条件输入的影响，特别是在其作为负面条件的角色中。它提供了一种机制来调整采样期间应用的负面指导的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- guider
    - 输出的guider是DualCFGGuider类的配置实例，准备在采样过程中使用。它封装了用户设置的条件和配置，确保采样符合所需的规格。
    - Comfy dtype: GUIDER
    - Python dtype: comfy.samplers.CFGGuider

# Usage tips
- Infra type: CPU

# Source code
```
class DualCFGGuider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'cond1': ('CONDITIONING',), 'cond2': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'cfg_conds': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'cfg_cond2_negative': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01})}}
    RETURN_TYPES = ('GUIDER',)
    FUNCTION = 'get_guider'
    CATEGORY = 'sampling/custom_sampling/guiders'

    def get_guider(self, model, cond1, cond2, negative, cfg_conds, cfg_cond2_negative):
        guider = Guider_DualCFG(model)
        guider.set_conds(cond1, cond2, negative)
        guider.set_cfg(cfg_conds, cfg_cond2_negative)
        return (guider,)
```