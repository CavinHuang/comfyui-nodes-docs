# Documentation
- Class name: KfSetKeyframe
- Category: RootCategory
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在管理和修改计划中的键帧条件，允许对模型训练过程中的参数进行动态调整。

# Input types
## Required
- keyframed_condition
    - 该参数至关重要，因为它定义了设置键帧的条件，这些条件对于控制在特定间隔处模型的行为至关重要。
    - Comfy dtype: KEYFRAMED_CONDITION
    - Python dtype: Dict[str, Any]
## Optional
- schedule
    - 计划参数对于定义模型更新的时机和频率很重要，结合键帧条件，它可以优化训练过程。
    - Comfy dtype: SCHEDULE
    - Python dtype: Optional[kf.ParameterGroup]

# Output types
- schedule
    - 输出是一个包含更新的键帧条件的修改后的计划，这对于指导模型的进展和性能至关重要。
    - Comfy dtype: SCHEDULE
    - Python dtype: Tuple[kf.ParameterGroup, Dict[str, Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSetKeyframe:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('SCHEDULE',)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'keyframed_condition': ('KEYFRAMED_CONDITION', {})}, 'optional': {'schedule': ('SCHEDULE', {})}}

    def main(self, keyframed_condition, schedule=None):
        schedule = set_keyframed_condition(keyframed_condition, schedule)
        return (schedule,)
```