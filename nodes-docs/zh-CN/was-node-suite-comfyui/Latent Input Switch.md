# Documentation
- Class name: WAS_Latent_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Latent_Input_Switch节点的'latent_input_switch'方法旨在根据布尔标志有条件地选择两个潜在表示中的一个。它作为一个逻辑开关，用于在神经网络流水线中引导潜在数据的流向，允许对不同模型架构的输入进行灵活的操作。

# Input types
## Required
- latent_a
    - 参数'latent_a'表示要有条件选择的潜在表示之一。它在节点的操作中起着关键作用，因为它决定了布尔标志为真时的输出，从而影响后续的处理步骤。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, np.ndarray]
- latent_b
    - 参数'latent_b'是另一个潜在表示，如果布尔标志为假，则需要选择它。它对节点的功能至关重要，因为它在指定条件下决定了输出，指导了随后的神经网络操作。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, np.ndarray]
## Optional
- boolean
    - 参数'boolean'作为节点决策过程的控制信号。它的重要性在于它直接影响选择哪个潜在表示，从而影响神经网络的整体行为。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent_output
    - 'latent_output'代表根据提供给节点的布尔标志选择的潜在表示。它是节点操作的最终结果，对神经网络中的进一步处理至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, np.ndarray]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Latent_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'latent_a': ('LATENT',), 'latent_b': ('LATENT',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'latent_input_switch'
    CATEGORY = 'WAS Suite/Logic'

    def latent_input_switch(self, latent_a, latent_b, boolean=True):
        if boolean:
            return (latent_a,)
        else:
            return (latent_b,)
```