# Documentation
- Class name: DualCLIPLoader
- Category: advanced/loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DualCLIPLoader节点旨在高效地加载和管理双CLIP（对比语言-图像预训练）模型。它专注于两个不同CLIP模型的无缝集成，促进它们在更大系统中的联合操作。该节点抽象了加载和访问CLIP模型的复杂性，确保用户可以最小化开销地利用它们的能力。

# Input types
## Required
- clip_name1
    - 参数'clip_name1'指定要加载的第一个CLIP模型。它在确定系统中将使用的具体模型中起着关键作用。此参数直接影响节点访问和处理所需CLIP模型的能力。
    - Comfy dtype: str
    - Python dtype: str
- clip_name2
    - 参数'clip_name2'指定要加载的第二个CLIP模型。与'clip_name1'类似，它对于识别和加载所需的模型至关重要。节点依赖于'clip_name1'和'clip_name2'有效地与双CLIP模型一起工作。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- CLIP
    - 输出'CLIP'代表已加载的CLIP模型，它可以是图像和文本嵌入的组合。它很重要，因为它使得在应用程序中进行进一步的处理和分析成为可能，为各种下游任务提供了基础。
    - Comfy dtype: COMBO[str, torch.Tensor]
    - Python dtype: Tuple[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class DualCLIPLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_name1': (folder_paths.get_filename_list('clip'),), 'clip_name2': (folder_paths.get_filename_list('clip'),)}}
    RETURN_TYPES = ('CLIP',)
    FUNCTION = 'load_clip'
    CATEGORY = 'advanced/loaders'

    def load_clip(self, clip_name1, clip_name2):
        clip_path1 = folder_paths.get_full_path('clip', clip_name1)
        clip_path2 = folder_paths.get_full_path('clip', clip_name2)
        clip = comfy.sd.load_clip(ckpt_paths=[clip_path1, clip_path2], embedding_directory=folder_paths.get_folder_paths('embeddings'))
        return (clip,)
```