# Documentation
- Class name: ScheduleToCond
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

ScheduleToCond节点的'apply'方法旨在处理并应用提示计划给定的CLIP模型。它将提示计划与CLIP模型集成，以生成一组条件输入，这些输入可以用于进一步处理或作为模型输入的一部分。此方法在控制文本提示对CLIP模型输出的影响中起着关键作用。

# Input types
## Required
- clip
    - 'clip'参数至关重要，因为它代表了将应用提示计划的CLIP模型。它是决定后续条件处理过程和节点生成的输出的核心组件。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- prompt_schedule
    - 'prompt_schedule'参数定义了将提示应用于CLIP模型的时间表。它对于确定文本提示将如何调节模型在处理过程中的行为至关重要。
    - Comfy dtype: PROMPT_SCHEDULE
    - Python dtype: Dict[str, Any]

# Output types
- CONDITIONING
    - 输出'CONDITIONING'代表了从提示计划派生并应用于CLIP模型的条件集。它很重要，因为它构成了进一步操作或作为下游任务输入的基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ScheduleToCond:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'prompt_schedule': ('PROMPT_SCHEDULE',)}}
    RETURN_TYPES = ('CONDITIONING',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, clip, prompt_schedule):
        with Timer('ScheduleToCond'):
            r = (control_to_clip_common(clip, prompt_schedule),)
        return r
```