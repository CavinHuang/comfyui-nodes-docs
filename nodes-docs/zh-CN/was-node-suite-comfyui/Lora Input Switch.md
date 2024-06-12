# Documentation
- Class name: WAS_Lora_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点在WAS Suite中充当条件开关，根据布尔参数的状态选择并转发两组输入中的一组。

# Input types
## Required
- model_a
    - 第一个模型输入对节点的运行至关重要，代表布尔开关可以选择的两条可能的数据流之一。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip_a
    - 第一个剪辑输入是第一条数据流的一部分，如果布尔参数为真，则会被选择，影响节点的输出。
    - Comfy dtype: CLIP
    - Python dtype: Any
- model_b
    - 第二个模型输入代表备选数据流，如果布尔参数为假，则会被选择。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip_b
    - 第二个剪辑输入是备选数据流的一部分，其选择由布尔参数的状态决定。
    - Comfy dtype: CLIP
    - Python dtype: Any
- boolean
    - 布尔参数作为开关的控制信号，决定了哪组输入将被节点转发。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- output
    - 节点的输出由布尔参数决定，要么转发第一组输入，要么转发备选组输入。
    - Comfy dtype: MODEL,CLIP
    - Python dtype: Tuple[Any, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Lora_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_a': ('MODEL',), 'clip_a': ('CLIP',), 'model_b': ('MODEL',), 'clip_b': ('CLIP',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('MODEL', 'CLIP')
    FUNCTION = 'lora_input_switch'
    CATEGORY = 'WAS Suite/Logic'

    def lora_input_switch(self, model_a, clip_a, model_b, clip_b, boolean=True):
        if boolean:
            return (model_a, clip_a)
        else:
            return (model_b, clip_b)
```