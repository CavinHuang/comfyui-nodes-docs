# Documentation
- Class name: loraStackLoader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

loraStackLoader节点旨在简化加载和配置Lora堆栈的过程，这对于微调和提高神经网络模型的性能至关重要。它通过提供一种结构化的方式来指定多个Lora层的名称、强度和其他相关参数，简化了管理多个Lora层的复杂性。

# Input types
## Required
- toggle
    - toggle参数对于决定节点是否应该执行其加载过程至关重要。当设置为True时，节点将执行加载指定的Lora堆栈；否则，它将不执行任何操作就返回。
    - Comfy dtype: BOOL
    - Python dtype: bool
- mode
    - mode参数决定了Lora堆栈配置的复杂性级别。它允许用户选择简单或高级设置，影响后续参数的解释和应用方式。
    - Comfy dtype: STR
    - Python dtype: str
- num_loras
    - num_loras参数指定要加载的Lora层的数量。它通过确定将处理多少个Lora配置直接影响节点的操作。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- optional_lora_stack
    - optional_lora_stack参数提供了一种向节点提供现有Lora堆栈的方式。这对于扩展或修改已经配置的堆栈而无需从头开始非常有用。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]
- lora_{i}_name
    - lora_{i}_name参数允许用户指定位置{i}处的Lora层的名称。这对于识别和加载正确的Lora配置非常重要。
    - Comfy dtype: STR
    - Python dtype: str
- lora_{i}_strength
    - lora_{i}_strength参数设置位置{i}处的Lora层的强度。这是Lora层在模型中的影响权重的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_{i}_model_strength
    - lora_{i}_model_strength参数在高级模式下适用，为位置{i}处的Lora层设置特定于模型的强度。它用于微调Lora对模型输出的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_{i}_clip_strength
    - lora_{i}_clip_strength参数也在高级模式下使用，它决定了位置{i}处的Lora层与CLIP模型的交互强度。这对于控制基于文本的指导在模型处理中的整合至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- lora_stack
    - lora_stack输出是由节点处理的Lora配置的集合。它代表了准备应用于神经网络模型的最终Lora层堆栈。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Usage tips
- Infra type: CPU

# Source code
```
class loraStackLoader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        max_lora_num = 10
        inputs = {'required': {'toggle': ([True, False],), 'mode': (['simple', 'advanced'],), 'num_loras': ('INT', {'default': 1, 'min': 0, 'max': max_lora_num})}, 'optional': {'optional_lora_stack': ('LORA_STACK',)}}
        for i in range(1, max_lora_num + 1):
            inputs['optional'][f'lora_{i}_name'] = (['None'] + folder_paths.get_filename_list('loras'), {'default': 'None'})
            inputs['optional'][f'lora_{i}_strength'] = ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})
            inputs['optional'][f'lora_{i}_model_strength'] = ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})
            inputs['optional'][f'lora_{i}_clip_strength'] = ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})
        return inputs
    RETURN_TYPES = ('LORA_STACK',)
    RETURN_NAMES = ('lora_stack',)
    FUNCTION = 'stack'
    CATEGORY = 'EasyUse/Loaders'

    def stack(self, toggle, mode, num_loras, lora_stack=None, **kwargs):
        if toggle in [False, None, 'False'] or not kwargs:
            return (None,)
        loras = []
        if lora_stack is not None:
            loras.extend([l for l in lora_stack if l[0] != 'None'])
        for i in range(1, num_loras + 1):
            lora_name = kwargs.get(f'lora_{i}_name')
            if not lora_name or lora_name == 'None':
                continue
            if mode == 'simple':
                lora_strength = float(kwargs.get(f'lora_{i}_strength'))
                loras.append((lora_name, lora_strength, lora_strength))
            elif mode == 'advanced':
                model_strength = float(kwargs.get(f'lora_{i}_model_strength'))
                clip_strength = float(kwargs.get(f'lora_{i}_clip_strength'))
                loras.append((lora_name, model_strength, clip_strength))
        return (loras,)
```