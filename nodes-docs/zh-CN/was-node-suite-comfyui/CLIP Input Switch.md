# Documentation
- Class name: WAS_CLIP_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `clip_switch` 设计用于根据一个布尔标志有条件地选择两个提供的 CLIP 对象中的一个。它在工作流中充当逻辑开关，根据布尔值的真实性来指导数据流的方向。

# Input types
## Required
- clip_a
    - 当布尔参数为 true 时被条件选择的第一个 CLIP 对象。它在节点的决策过程中起着关键作用，根据布尔标志的状态确定输出。
    - Comfy dtype: CLIP
    - Python dtype: Union[torch.Tensor, comfy.sd.CLIP]
- clip_b
    - 当布尔参数为 false 时被条件选择的第二个 CLIP 对象。它在节点的操作中至关重要，当布尔条件未满足时提供替代输出。
    - Comfy dtype: CLIP
    - Python dtype: Union[torch.Tensor, comfy.sd.CLIP]
## Optional
- boolean
    - 决定将返回哪个 CLIP 对象的布尔标志。它是一个关键参数，因为它直接影响节点的输出选择逻辑。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_clip
    - 节点的输出是一个单一的 CLIP 对象，根据布尔参数的值，可以是 `clip_a` 或 `clip_b`。这个输出很重要，因为它代表了节点条件逻辑的结果。
    - Comfy dtype: CLIP
    - Python dtype: Union[torch.Tensor, comfy.sd.CLIP]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_CLIP_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'clip_a': ('CLIP',), 'clip_b': ('CLIP',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('CLIP',)
    FUNCTION = 'clip_switch'
    CATEGORY = 'WAS Suite/Logic'

    def clip_switch(self, clip_a, clip_b, boolean=True):
        if boolean:
            return (clip_a,)
        else:
            return (clip_b,)
```