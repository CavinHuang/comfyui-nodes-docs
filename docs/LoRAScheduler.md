# Documentation
- Class name: LoRAScheduler
- Category: promptcontrol/old
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

该节点在推理过程中根据预定义的提示调度动态修改模型的行为，提高了模型的适应性和可控性，而不改变模型的基本结构。

# Input types
## Required
- model
    - 模型参数至关重要，它定义了节点操作的核心。它是将要按照提示调度修改行为的机器学习模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- text
    - 文本参数包含提示调度，它规定了要应用于模型的修改。这对于指导节点执行所需的转换至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 输出模型是输入模型的修改版本，现在应用了提示调度，允许在推理过程中进行更细致的控制和行为。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class LoRAScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'text': ('STRING', {'multiline': True})}}
    RETURN_TYPES = ('MODEL',)
    CATEGORY = 'promptcontrol/old'
    FUNCTION = 'apply'

    def apply(self, model, text):
        schedules = parse_prompt_schedules(text)
        return (schedule_lora_common(model, schedules),)
```