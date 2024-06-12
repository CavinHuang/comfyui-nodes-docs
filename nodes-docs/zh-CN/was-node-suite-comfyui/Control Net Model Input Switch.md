# Documentation
- Class name: WAS_Control_Net_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

‘control_net_switch’方法旨在根据布尔条件智能选择两个控制网络中的一个。它作为工作流程中的决策节点，确保在任何给定时间使用适当的控制网络，从而增强系统的灵活性和适应性。

# Input types
## Required
- control_net_a
    - ‘control_net_a’参数代表节点可以切换到的第一个控制网络选项。它在决策过程中起着关键作用，因为当布尔条件满足时，节点将选择此网络。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Optional[Union[comfy.sd.CONTROL_NET, torch.Tensor]]
- control_net_b
    - ‘control_net_b’参数是布尔条件不满足时节点可能选择的替代控制网络。它对节点的功能至关重要，为控制网络提供了一个备选方案。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Optional[Union[comfy.sd.CONTROL_NET, torch.Tensor]]
## Optional
- boolean
    - ‘boolean’参数作为一个条件开关，决定了返回‘control_net_a’还是‘control_net_b’。它的重要性在于，它的真值直接决定了节点的输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_control_net
    - ‘selected_control_net’输出代表节点根据布尔条件选择的控制网络。它至关重要，因为它决定了工作流程中随后的处理步骤。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Union[comfy.sd.CONTROL_NET, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Control_Net_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'control_net_a': ('CONTROL_NET',), 'control_net_b': ('CONTROL_NET',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'control_net_switch'
    CATEGORY = 'WAS Suite/Logic'

    def control_net_switch(self, control_net_a, control_net_b, boolean=True):
        if boolean:
            return (control_net_a,)
        else:
            return (control_net_b,)
```