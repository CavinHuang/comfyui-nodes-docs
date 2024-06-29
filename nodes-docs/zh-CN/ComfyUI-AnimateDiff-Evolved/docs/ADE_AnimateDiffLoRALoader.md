# Documentation
- Class name: AnimateDiffLoraLoader
- Category: Animate Diff 🎭🅐🅓
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

AnimateDiffLoraLoader节点旨在方便地加载和应用运动Lora模型到主体上。它能够根据指定的强度混合不同的Lora模型，允许对动画进行精细控制。在需要将多个运动影响集成到一起的字符动画任务中，这个节点至关重要。

# Input types
## Required
- lora_name
    - 参数'lora_name'对于识别要加载的特定运动Lora模型至关重要。它确保从可用选项中正确选择模型，这对于节点的操作和最终的动画效果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- strength
    - 参数'strength'决定运动Lora对动画影响的强度。它是微调动画以实现所需效果的关键因素，允许在不同的运动层之间保持平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- prev_motion_lora
    - 参数'prev_motion_lora'用于提供之前运动Lora模型的状态。它对于保持动画序列的连贯性很重要，并允许为复杂的动画效果叠加多个Lora模型。
    - Comfy dtype: MOTION_LORA
    - Python dtype: MotionLoraList

# Output types
- MOTION_LORA
    - 输出'MOTION_LORA'表示应用了指定强度并与任何之前的运动Lora模型混合后的结果运动Lora模型。它对后续的动画步骤很重要，并作为进一步角色动画的基础。
    - Comfy dtype: MOTION_LORA
    - Python dtype: MotionLoraList

# Usage tips
- Infra type: CPU

# Source code
```
class AnimateDiffLoraLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'lora_name': (get_available_motion_loras(),), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'prev_motion_lora': ('MOTION_LORA',)}}
    RETURN_TYPES = ('MOTION_LORA',)
    CATEGORY = 'Animate Diff 🎭🅐🅓'
    FUNCTION = 'load_motion_lora'

    def load_motion_lora(self, lora_name: str, strength: float, prev_motion_lora: MotionLoraList=None):
        if prev_motion_lora is None:
            prev_motion_lora = MotionLoraList()
        else:
            prev_motion_lora = prev_motion_lora.clone()
        lora_path = get_motion_lora_path(lora_name)
        if not Path(lora_path).is_file():
            raise FileNotFoundError(f"Motion lora with name '{lora_name}' not found.")
        lora_info = MotionLoraInfo(name=lora_name, strength=strength)
        prev_motion_lora.add_lora(lora_info)
        return (prev_motion_lora,)
```