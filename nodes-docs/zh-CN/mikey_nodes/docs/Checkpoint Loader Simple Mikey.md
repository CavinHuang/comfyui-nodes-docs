# Documentation
- Class name: CheckpointLoaderSimpleMikey
- Category: Mikey/Loaders
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

CheckpointLoaderSimpleMikey节点旨在简化机器学习工作流中检查点的加载和管理过程。它提供了一个简单的接口，用于从指定的检查点目录检索模型状态、相关剪辑和变分自编码器（VAE）。该节点还计算并返回检查点文件的哈希值，确保数据的完整性和可追溯性。

# Input types
## Required
- ckpt_name
    - 参数'ckpt_name'对于识别要加载的特定检查点至关重要。节点使用它在检查点目录中定位和访问相关的模型状态和配置文件。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - 参数'output_vae'决定是否加载与检查点相关联的变分自编码器。它在节点的操作中提供了灵活性，允许用户控制检索检查点的组件。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - 参数'output_clip'控制加载与检查点相关联的clip。它允许节点根据用户的需求选择性地包含或排除clip。
    - Comfy dtype: bool
    - Python dtype: bool
- unique_id
    - 参数'unique_id'用于节点操作中的额外识别目的。在某些应用中，可能需要通过文件名之外的方式区分多个检查点，这时'unique_id'就变得相关了。
    - Comfy dtype: str
    - Python dtype: str
- extra_pnginfo
    - 参数'extra_pnginfo'旨在为节点内的某些操作提供可能需要的额外信息。它的使用是可选的，并且依赖于上下文，增强了节点对各种场景的适应性。
    - Comfy dtype: str
    - Python dtype: str
- prompt
    - 参数'prompt'用于根据用户输入引导节点的行为。它可以影响检查点的处理方式或返回的信息，为节点的执行提供了一定程度的定制化。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- model
    - 输出'model'代表从检查点加载的机器学习模型状态。它是节点功能的核心组件，使得模型的训练过程可以继续或进行分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 输出'clip'对应于与检查点相关联的加载的clip。它是一个可选组件，可以根据'output_clip'参数包括，为某些应用提供额外的上下文或功能。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- vae
    - 输出'vae'表示从检查点加载的变分自编码器。它是节点输出的可选部分，由'output_vae'参数控制，可以用于生成任务或进一步分析。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- ckpt_name
    - 输出'ckpt_name'提供了被加载的检查点文件的名称。这对于记录、跟踪或在后续操作中引用特定检查点非常有用。
    - Comfy dtype: str
    - Python dtype: str
- ckpt_hash
    - 输出'ckpt_hash'是派生自检查点文件的哈希值。它作为检查点的唯一标识符，对于验证加载数据的完整性或用于记录目的非常有用。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CheckpointLoaderSimpleMikey:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),)}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'STRING', 'STRING')
    RETURN_NAMES = ('model', 'clip', 'vae', 'ckpt_name', 'ckpt_hash')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'Mikey/Loaders'

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True, unique_id=None, extra_pnginfo=None, prompt=None):
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        hash = get_file_hash(ckpt_path)
        ckpt_name = os.path.basename(ckpt_name)
        return out[:3] + (ckpt_name, hash)
```