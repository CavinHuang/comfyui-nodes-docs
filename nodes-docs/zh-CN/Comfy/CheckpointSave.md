# Documentation
- Class name: CheckpointSave
- Category: advanced/model_merging
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CheckpointSave节点旨在方便保存模型检查点。它封装了将模型的状态（包括其参数和任何相关元数据）序列化并存储到文件中的过程。这个节点对于模型持久化至关重要，允许在以后的时间恢复训练或推理，而不会丢失进度。

# Input types
## Required
- model
    - 模型参数对于CheckpointSave节点至关重要，因为它表示要保存的机器学习模型。它通过确定要序列化和存储的特定模型状态来影响节点的执行。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数需要集成CLIP模型的状态到检查点中。它在节点的功能中扮演重要角色，通过包含模型重建的相关特征。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- vae
    - vae参数指定要包含在检查点中的变分自编码器。它对节点很重要，因为它确保了VAE的参数和状态被包含以便将来使用。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- filename_prefix
    - filename_prefix参数决定了保存的检查点文件的基本名称。它很重要，因为它为检查点提供了可识别和一致的命名约定，有助于组织和检索。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prompt
    - 可选的prompt参数可以用来包含与检查点相关联的描述或注释。这对于为保存的模型状态添加上下文非常有用。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - extra_pnginfo参数允许将额外的元数据与检查点一起保存。这可以包括对模型操作或分析可能相关的任何额外信息。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class CheckpointSave:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'filename_prefix': ('STRING', {'default': 'checkpoints/ComfyUI'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save'
    OUTPUT_NODE = True
    CATEGORY = 'advanced/model_merging'

    def save(self, model, clip, vae, filename_prefix, prompt=None, extra_pnginfo=None):
        save_checkpoint(model, clip=clip, vae=vae, filename_prefix=filename_prefix, output_dir=self.output_dir, prompt=prompt, extra_pnginfo=extra_pnginfo)
        return {}
```