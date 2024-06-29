# Documentation
- Class name: WAS_Model_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

模型切换方法旨在根据布尔条件选择两个模型中的一个。它作为工作流中的决策节点，根据布尔输入将数据流向导向模型_a或模型_b。此节点在模型处理序列中的条件逻辑中起着关键作用。

# Input types
## Required
- model_a
    - 参数`model_a`代表节点可以选择的第一个模型。它对于节点的决策过程至关重要，因为它决定了布尔条件满足时可能的结果之一。
    - Comfy dtype: MODEL
    - Python dtype: Union[torch.nn.Module, Any]
- model_b
    - 参数`model_b`表示节点可以选择的第二个模型。它在决策过程中起着重要作用，因为它决定了当布尔条件不满足时的替代结果。
    - Comfy dtype: MODEL
    - Python dtype: Union[torch.nn.Module, Any]
## Optional
- boolean
    - 参数`boolean`充当开关，决定节点返回哪个模型。它很重要，因为它直接影响节点的输出，从而影响工作流中的后续步骤。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_model
    - 输出`selected_model`表示根据布尔条件选择的模型。它是一个关键的输出，因为它决定了工作流中随后的处理步骤。
    - Comfy dtype: MODEL
    - Python dtype: Union[torch.nn.Module, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Model_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_a': ('MODEL',), 'model_b': ('MODEL',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'model_switch'
    CATEGORY = 'WAS Suite/Logic'

    def model_switch(self, model_a, model_b, boolean=True):
        if boolean:
            return (model_a,)
        else:
            return (model_b,)
```