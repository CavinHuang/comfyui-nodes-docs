# Documentation
- Class name: CLIPVisionLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPVisionLoader节点旨在高效地加载和处理来自CLIP模型的视觉数据。它抽象了文件处理的复杂性，并为访问视觉表示提供了一个简化的接口。

# Input types
## Required
- clip_name
    - 参数'clip_name'对于指定要加载的视觉数据的唯一标识符至关重要。它在节点的操作中扮演着关键角色，因为它指导检索过程。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- CLIP_VISION
    - 输出'CLIP_VISION'以张量形式表示加载的视觉数据，这对于模型流水线内的进一步处理和分析至关重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPVisionLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_name': (folder_paths.get_filename_list('clip_vision'),)}}
    RETURN_TYPES = ('CLIP_VISION',)
    FUNCTION = 'load_clip'
    CATEGORY = 'loaders'

    def load_clip(self, clip_name):
        clip_path = folder_paths.get_full_path('clip_vision', clip_name)
        clip_vision = comfy.clip_vision.load(clip_path)
        return (clip_vision,)
```