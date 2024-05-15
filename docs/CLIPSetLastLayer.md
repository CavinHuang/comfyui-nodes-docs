# Documentation
- Class name: CLIPSetLastLayer
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

方法 `set_last_layer` 旨在修改 CLIP 模型的最后一层。它允许根据特定需求定制神经网络的输出层，确保模型能够适应不同的任务，同时不改变其核心架构。

# Input types
## Required
- clip
    - 参数 'clip' 是必需的，因为它代表了将被修改最后一层的 CLIP 模型。它是主要的输入，决定了节点的操作和随后的输出。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- stop_at_clip_layer
    - 参数 'stop_at_clip_layer' 指定了 CLIP 模型的层次结构应该停止的索引。它在确定模型架构的最终配置中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- modified_clip
    - 输出 'modified_clip' 是根据输入参数调整了最后一层的 CLIP 模型。它标志着节点功能成功应用，实现了所需的模型配置。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPSetLastLayer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'stop_at_clip_layer': ('INT', {'default': -1, 'min': -24, 'max': -1, 'step': 1})}}
    RETURN_TYPES = ('CLIP',)
    FUNCTION = 'set_last_layer'
    CATEGORY = 'conditioning'

    def set_last_layer(self, clip, stop_at_clip_layer):
        clip = clip.clone()
        clip.clip_layer(stop_at_clip_layer)
        return (clip,)
```