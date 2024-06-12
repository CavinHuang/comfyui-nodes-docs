# Documentation
- Class name: WAS_unCLIP_Checkpoint_Loader
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点旨在为WAS套件加载和管理检查点，包括模型、CLIP和VAE组件。它对于初始化WAS框架内进一步处理和分析所需的组件至关重要。

# Input types
## Required
- ckpt_name
    - 检查点名称是一个必需的参数，它指定要加载的检查点的名称。这对于识别和检索WAS套件操作的正确检查点至关重要。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - 'output_vae' 参数决定是否在加载的检查点中包含变分自编码器（VAE）组件。它影响节点返回对象的组成。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - 'output_clip' 参指示是否应将CLIP模型作为加载的检查点的一部分。它通过包含或排除CLIP模型来影响节点的输出。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - MODEL输出代表从检查点加载的机器学习模型组件。它对于执行需要模型推理或处理的任务非常重要。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP
    - CLIP输出是加载的CLIP模型组件，用于WAS套件内的文本到图像匹配和其他相关任务。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- VAE
    - VAE输出表示检查点中的变分自编码器组件。它对于涉及生成模型和潜在空间操作的任务至关重要。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP_VISION
    - CLIP_VISION输出是CLIP模型的视觉组件，负责WAS套件内与图像相关的操作。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- NAME_STRING
    - NAME_STRING输出提供了没有文件扩展名的加载检查点的基本名称。它对于引用和识别目的非常有用。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_unCLIP_Checkpoint_Loader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (comfy_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'CLIP_VISION', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'CLIP_VISION', 'NAME_STRING')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'WAS Suite/Loaders'

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = comfy_paths.get_full_path('checkpoints', ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, output_clipvision=True, embedding_directory=comfy_paths.get_folder_paths('embeddings'))
        return (out[0], out[1], out[2], out[3], os.path.splitext(os.path.basename(ckpt_name))[0])
```