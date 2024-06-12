# Documentation
- Class name: BasicGuider
- Category: sampling/custom_sampling/guiders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

BasicGuider 节点负责生成一个辅助采样过程的引导器对象。它旨在与模型集成，并应用条件以引导采样朝向期望的结果发展。

# Input types
## Required
- model
    - 模型参数对于 BasicGuider 节点至关重要，因为它定义了引导器将操作的底层模型。正是通过这个模型，引导器影响采样过程。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- conditioning
    - 条件输入对于 BasicGuider 节点至关重要，因为它提供了将用于引导采样过程的条件。它根据提供的条件确定采样的方向和重点。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- guider
    - 输出的引导器是 BasicGuider 节点功能的关键组成部分。它代表了根据提供的模型和条件配置的引导器对象，将用于指导采样过程。
    - Comfy dtype: GUIDER
    - Python dtype: comfy.samplers.CFGGuider

# Usage tips
- Infra type: CPU

# Source code
```
class BasicGuider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'conditioning': ('CONDITIONING',)}}
    RETURN_TYPES = ('GUIDER',)
    FUNCTION = 'get_guider'
    CATEGORY = 'sampling/custom_sampling/guiders'

    def get_guider(self, model, conditioning):
        guider = Guider_Basic(model)
        guider.set_conds(conditioning)
        return (guider,)
```