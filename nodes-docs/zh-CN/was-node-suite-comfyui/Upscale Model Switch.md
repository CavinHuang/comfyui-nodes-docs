# Documentation
- Class name: WAS_Upscale_Model_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 'upscale_model_switch' 设计用于提供一种条件选择机制，根据布尔标志选择两个放大模型中的一个。它作为一个逻辑开关，决定用于图像放大操作的模型，从而增强了系统的灵活性。

# Input types
## Required
- upscale_model_a
    - 参数 'upscale_model_a' 表示用于选择的第一个放大模型。它在决策过程中至关重要，因为它是基于布尔标志值可以选择的两个模型之一。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: Union[torch.nn.Module, Any]
- upscale_model_b
    - 参数 'upscale_model_b' 表示第二个放大模型，是节点的替代选项。当布尔标志设置为 False 时，它起着关键作用，因为此时它被选为图像放大。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: Union[torch.nn.Module, Any]
## Optional
- boolean
    - 参数 'boolean' 作为控制标志，影响节点决定返回哪个放大模型。当设置为 True 时，选择 'upscale_model_a'；当为 False 时，选择 'upscale_model_b'。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_upscale_model
    - 输出 'selected_upscale_model' 表示根据布尔标志选择的放大模型。它很重要，因为它决定了后续的图像放大过程。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: Union[torch.nn.Module, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Upscale_Model_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'upscale_model_a': ('UPSCALE_MODEL',), 'upscale_model_b': ('UPSCALE_MODEL',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('UPSCALE_MODEL',)
    FUNCTION = 'upscale_model_switch'
    CATEGORY = 'WAS Suite/Logic'

    def upscale_model_switch(self, upscale_model_a, upscale_model_b, boolean=True):
        if boolean:
            return (upscale_model_a,)
        else:
            return (upscale_model_b,)
```