# Documentation
- Class name: CR_DebatchFrames
- Category: Comfyroll/Animation/Utils
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_DebatchFrames 节点旨在处理并拆分输入数据为单独的帧。它在动画工作流程中准备数据进行进一步分析或处理中扮演着关键角色，确保每个帧都能独立处理。

# Input types
## Required
- frames
    - ‘frames’参数至关重要，因为它代表了节点将处理的图像帧批次。它通过确定将被拆分为单独帧的输入数据来影响节点的执行。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- debatched_frames
    - ‘debatched_frames’输出由从输入批次中提取的单独帧组成。这个输出很重要，因为它构成了动画流水线中后续操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class CR_DebatchFrames:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'frames': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('debatched_frames',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'debatch'
    CATEGORY = icons.get('Comfyroll/Animation/Utils')

    def debatch(self, frames):
        images = [frames[i:i + 1, ...] for i in range(frames.shape[0])]
        return (images,)
```