# Documentation
- Class name: ScheduleToModel
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

ScheduleToModel节点的'apply'方法旨在基于提供的时间表动态调整模型的架构。它允许在指定步骤中无缝集成不同的模型配置，增强模型生成与每个步骤上下文相匹配的响应的能力。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了将根据提示时间表进行修改的神经网络。它是节点操作的基础，其结构直接影响采样过程的结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- prompt_schedule
    - prompt_schedule参数定义了在采样过程的每个步骤中将发生的模型调整序列。它对于指导节点的操作和确定每个步骤要应用的具体修改至关重要。
    - Comfy dtype: PROMPT_SCHEDULE
    - Python dtype: Dict[str, Any]

# Output types
- model
    - 输出的'model'是经过提示时间表预定调整的修改后的神经网络。它封装了节点操作的结果，反映了在采样过程中应用的动态变化。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class ScheduleToModel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'prompt_schedule': ('PROMPT_SCHEDULE',)}}
    RETURN_TYPES = ('MODEL',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, model, prompt_schedule):
        return (schedule_lora_common(model, prompt_schedule),)
```