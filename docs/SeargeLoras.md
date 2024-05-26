# Documentation
- Class name: SeargeLoras
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在处理和管理lora信号，将其强度和配置整合成结构化数据格式。

# Input types
## Required
- lora_1
    - 第一个lora参数对于定义lora栈中的初始信号至关重要，它影响节点的整体结构和输出。
    - Comfy dtype: LORAS_WITH_NONE()
    - Python dtype: Union[str, None]
- lora_1_strength
    - 第一个lora信号的强度非常重要，因为它决定了信号在栈中的影响力，对最终输出有贡献。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_2
    - 第二个lora参数进一步完善了信号栈，为节点的操作增加了额外的复杂性和细微差别。
    - Comfy dtype: LORAS_WITH_NONE()
    - Python dtype: Union[str, None]
- lora_2_strength
    - 第二个lora信号的强度至关重要，因为它调整了信号的相对权重，影响了节点的最终处理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_3
    - 第三个lora参数有助于信号栈的多样性，增强了节点的适应性和多功能性。
    - Comfy dtype: LORAS_WITH_NONE()
    - Python dtype: Union[str, None]
- lora_3_strength
    - 第三个lora信号的强度很重要，因为它微调了信号对栈的贡献，细化了节点的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_4
    - 第四个lora参数为信号栈增加了深度，影响了节点的综合分析和合成能力。
    - Comfy dtype: LORAS_WITH_NONE()
    - Python dtype: Union[str, None]
- lora_4_strength
    - 第四个lora信号的强度至关重要，因为它调整了信号在栈中的突出性，塑造了节点的整体性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_5
    - 第五个lora参数对信号栈是不可或缺的，提供了丰富的信息，增强了节点的处理能力。
    - Comfy dtype: LORAS_WITH_NONE()
    - Python dtype: Union[str, None]
- lora_5_strength
    - 第五个lora信号的强度很重要，因为它有助于微调信号在栈中的作用，影响节点的综合输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- data
    - 输出数据流是节点处理的结果，封装了结构化的lora栈及其相关的强度。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeLoras:

    def __init__(self):
        self.expected_lora_stack_size = None

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'lora_1': (UI.LORAS_WITH_NONE(),), 'lora_1_strength': ('FLOAT', {'default': 0.0, 'min': -10.0, 'max': 10.0, 'step': 0.05}), 'lora_2': (UI.LORAS_WITH_NONE(),), 'lora_2_strength': ('FLOAT', {'default': 0.0, 'min': -10.0, 'max': 10.0, 'step': 0.05}), 'lora_3': (UI.LORAS_WITH_NONE(),), 'lora_3_strength': ('FLOAT', {'default': 0.0, 'min': -10.0, 'max': 10.0, 'step': 0.05}), 'lora_4': (UI.LORAS_WITH_NONE(),), 'lora_4_strength': ('FLOAT', {'default': 0.0, 'min': -10.0, 'max': 10.0, 'step': 0.05}), 'lora_5': (UI.LORAS_WITH_NONE(),), 'lora_5_strength': ('FLOAT', {'default': 0.0, 'min': -10.0, 'max': 10.0, 'step': 0.05})}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(loras, lora_1, lora_1_strength, lora_2, lora_2_strength, lora_3, lora_3_strength, lora_4, lora_4_strength, lora_5, lora_5_strength):
        loras += [{UI.F_LORA_NAME: lora_1, UI.F_LORA_STRENGTH: round(lora_1_strength, 3)}, {UI.F_LORA_NAME: lora_2, UI.F_LORA_STRENGTH: round(lora_2_strength, 3)}, {UI.F_LORA_NAME: lora_3, UI.F_LORA_STRENGTH: round(lora_3_strength, 3)}, {UI.F_LORA_NAME: lora_4, UI.F_LORA_STRENGTH: round(lora_4_strength, 3)}, {UI.F_LORA_NAME: lora_5, UI.F_LORA_STRENGTH: round(lora_5_strength, 3)}]
        return {UI.F_LORA_STACK: loras}

    def get(self, lora_1, lora_1_strength, lora_2, lora_2_strength, lora_3, lora_3_strength, lora_4, lora_4_strength, lora_5, lora_5_strength, data=None):
        if data is None:
            data = {}
        loras = retrieve_parameter(UI.F_LORA_STACK, retrieve_parameter(UI.S_LORAS, data), [])
        if self.expected_lora_stack_size is None:
            self.expected_lora_stack_size = len(loras)
        elif self.expected_lora_stack_size == 0:
            loras = []
        elif len(loras) > self.expected_lora_stack_size:
            loras = loras[:self.expected_lora_stack_size]
        data[UI.S_LORAS] = self.create_dict(loras, lora_1, lora_1_strength, lora_2, lora_2_strength, lora_3, lora_3_strength, lora_4, lora_4_strength, lora_5, lora_5_strength)
        return (data,)
```