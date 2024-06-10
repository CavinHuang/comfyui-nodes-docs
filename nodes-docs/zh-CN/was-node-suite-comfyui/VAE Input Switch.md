# Documentation
- Class name: WAS_VAE_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

在`WAS_VAE_Input_Switch`节点中的`vae_switch`方法旨在根据布尔标志有条件地选择两个变分自编码器（VAE）实例中的一个。它作为一个逻辑开关，将处理流程导向提供的VAE之一，从而在工作流中实现灵活和有条件的处理。

# Input types
## Required
- vae_a
    - 参数`vae_a`表示可能被开关选择的第一个变分自编码器（VAE）实例。这是一个关键组件，因为节点的决策过程取决于这个VAE还是另一个将在后续操作中被使用。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE
- vae_b
    - 参数`vae_b`表示开关的第二个变分自编码器（VAE）实例，是开关的替代选项。它的包含允许在节点的功能中提供次要的执行路径，提供处理选项的多样性。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE
## Optional
- boolean
    - 参数`boolean`作为开关的控制信号，决定`vae_a`或`vae_b`将是节点的输出。它的值直接影响节点的决策过程，将输出引向其中一个VAE实例。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_vae
    - 输出`selected_vae`表示根据布尔条件由开关选择的变分自编码器（VAE）实例。它很重要，因为它代表了节点条件逻辑的结果，以及任何后续处理的起点。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_VAE_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'vae_a': ('VAE',), 'vae_b': ('VAE',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('VAE',)
    FUNCTION = 'vae_switch'
    CATEGORY = 'WAS Suite/Logic'

    def vae_switch(self, vae_a, vae_b, boolean=True):
        if boolean:
            return (vae_a,)
        else:
            return (vae_b,)
```