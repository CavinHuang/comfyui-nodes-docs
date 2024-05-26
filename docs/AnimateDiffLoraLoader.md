# Documentation
- Class name: AnimateDiffLoraLoader
- Category: Animate Diff
- Output node: False
- Repo Ref: https://github.com/ArtVentureX/comfyui-animatediff.git

该节点旨在通过加载和处理Lora文件，将动画差异集成到模型中，为模型的外观或行为添加动态元素。它专注于无缝集成运动和变换数据，提高整体动画质量，同时不损害模型的结构完整性。

# Input types
## Required
- lora_name
    - lora_name参数至关重要，因为它指定了要加载的Lora文件的唯一标识符，其中包含动画过程所需的运动和变换数据。正确使用此参数确保准确选择和应用所需的动画差异。
    - Comfy dtype: STRING
    - Python dtype: str
- alpha
    - alpha参数控制应用于模型的动画效果的强度。它对于调整最终输出中动画差异的显著性至关重要，允许微调视觉影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- lora_stack
    - lora_stack参数是一个可选列表，用于累积Lora数据及其对应alpha值的元组。它在管理多个动画差异层方面发挥作用，提供了一种有结构的方式来处理和组织动画序列。
    - Comfy dtype: LIST[tuple]
    - Python dtype: List[Tuple[str, float]]

# Output types
- lora_stack
    - 输出的lora_stack是一个包含处理过的Lora数据及其相应alpha值的元组列表。这个列表对于进一步处理和集成到模型中至关重要，作为动画差异的主要输出。
    - Comfy dtype: LIST[tuple]
    - Python dtype: List[Tuple[str, float]]

# Usage tips
- Infra type: CPU

# Source code
```
class AnimateDiffLoraLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'lora_name': (get_available_loras(),), 'alpha': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'lora_stack': ('MOTION_LORA_STACK',)}}
    RETURN_TYPES = ('MOTION_LORA_STACK',)
    CATEGORY = 'Animate Diff'
    FUNCTION = 'load_lora'

    def load_lora(self, lora_name: str, alpha: float, lora_stack: List=None):
        if not lora_stack:
            lora_stack = []
        lora = load_lora(lora_name)
        lora_stack.append((lora, alpha))
        return (lora_stack,)
```