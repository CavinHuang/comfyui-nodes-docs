# Documentation
- Class name: CLIPLoader
- Category: advanced/loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPLoader节点旨在高效管理和加载基于指定类型的CLIP模型，促进稳定扩散或稳定级联模型的集成。它抽象了文件路径管理和模型加载的复杂性，确保了用户在使用CLIP模型时的无缝体验。

# Input types
## Required
- clip_name
    - clip_name参数对于识别要加载的特定CLIP模型至关重要。它通过确定从哪个文件路径检索模型来影响节点的执行，从而影响模型加载过程的结果。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- type
    - type参数用于指定要加载的CLIP模型类型，可以是'stable_diffusion'或'stable_cascade'。它在节点的功能中起着重要作用，通过指导选择当前任务的适当模型类型。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- CLIP
    - 输出的CLIP参数代表加载的CLIP模型，是节点操作的主要结果。它标志着模型成功加载并为后续任务做好准备。
    - Comfy dtype: CLIP
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_name': (folder_paths.get_filename_list('clip'),), 'type': (['stable_diffusion', 'stable_cascade'],)}}
    RETURN_TYPES = ('CLIP',)
    FUNCTION = 'load_clip'
    CATEGORY = 'advanced/loaders'

    def load_clip(self, clip_name, type='stable_diffusion'):
        clip_type = comfy.sd.CLIPType.STABLE_DIFFUSION
        if type == 'stable_cascade':
            clip_type = comfy.sd.CLIPType.STABLE_CASCADE
        clip_path = folder_paths.get_full_path('clip', clip_name)
        clip = comfy.sd.load_clip(ckpt_paths=[clip_path], embedding_directory=folder_paths.get_folder_paths('embeddings'), clip_type=clip_type)
        return (clip,)
```