# Documentation
- Class name: CustomCFGNode
- Category: Animate Diff 🎭🅐🅓/sample settings
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

CustomCFGNode 是一个用于创建动画和采样设置的自定义控制流图（CFG）的节点。它允许用户定义具有特定多值配置的关键帧，这些配置决定了采样过程的行为。该节点为用户提供了一个高级接口，使用户能够自定义动画流程，而无需深入了解底层模型操作的细节。

# Input types
## Required
- cfg_multival
    - cfg_multival 参数对于在动画中定义特定关键帧的多值配置至关重要。它决定了关键帧的属性如何影响采样过程。此参数对于实现所需的动画效果和控制生成样本中的可变性至关重要。
    - Comfy dtype: MULTIVAL
    - Python dtype: Union[float, torch.Tensor]

# Output types
- CUSTOM_CFG
    - 输出 CUSTOM_CFG 表示已自定义的关键帧组，用于控制采样过程。它封装了多值配置及其对应的开始百分比，允许对动画的进展和不同样本的生成进行细粒度控制。
    - Comfy dtype: CUSTOM_CFG
    - Python dtype: CustomCFGKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class CustomCFGNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'cfg_multival': ('MULTIVAL',)}}
    RETURN_TYPES = ('CUSTOM_CFG',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/sample settings'
    FUNCTION = 'create_custom_cfg'

    def create_custom_cfg(self, cfg_multival: Union[float, Tensor]):
        keyframe = CustomCFGKeyframe(cfg_multival=cfg_multival)
        cfg_custom = CustomCFGKeyframeGroup()
        cfg_custom.add(keyframe)
        return (cfg_custom,)
```