# Documentation
- Class name: WAS_Conditioning_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `conditioning_input_switch` 设计用于根据布尔标志有条件地在两个输入条件之间进行选择。它在工作流中充当逻辑开关，允许根据指定的条件动态路由数据，在复杂系统中控制信息流方面至关重要。

# Input types
## Required
- conditioning_a
    - 参数 'conditioning_a' 表示当布尔标志为真时将被选择的第一个输入条件。它在确定节点输出方面起着关键作用，因为它直接影响系统通过的数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, comfy.sd.CONDITIONING]
- conditioning_b
    - 参数 'conditioning_b' 是当布尔标志为假时将使用的替代输入条件。当条件未满足时，它对于提供数据流的替代路径至关重要，确保节点在处理不同场景时的灵活性。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, comfy.sd.CONDITIONING]
## Optional
- boolean
    - 参数 'boolean' 作为控制信号，用以决定选择哪个条件输入。当设置为真时，选择 'conditioning_a'；当设置为假时，选择 'conditioning_b'。它是一个关键参数，因为它直接决定节点的行为。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_conditioning
    - 输出 'selected_conditioning' 表示根据提供的布尔标志选择的输入条件。它非常重要，因为它决定了工作流中的后续步骤和过程，可能影响最终结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, comfy.sd.CONDITIONING]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Conditioning_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'conditioning_a': ('CONDITIONING',), 'conditioning_b': ('CONDITIONING',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'conditioning_input_switch'
    CATEGORY = 'WAS Suite/Logic'

    def conditioning_input_switch(self, conditioning_a, conditioning_b, boolean=True):
        if boolean:
            return (conditioning_a,)
        else:
            return (conditioning_b,)
```