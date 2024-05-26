# Documentation
- Class name: WAS_Checkpoint_Loader_Simple
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

load_checkpoint 方法旨在高效地检索和初始化指定检查点的各个组件，便于其在工作流中的无缝集成。它作为存储模型与应用之间的关键链接，确保后续操作所需的必要元素随时可用。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于识别要加载的特定检查点至关重要。它指导节点找到正确的文件，从而检索相关的模型和配置。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - output_vae 参数决定是否从检查点加载变分自编码器（VAE）组件。它允许根据当前任务的需求选择性地加载组件。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - output_clip 参数决定在检索检查点的过程中是否应加载 CLIP 模型。它提供了在加载的组件中包含或排除 CLIP 模型的灵活性。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - MODEL 输出代表从检查点加载的主要神经网络架构，它对后续的处理和分析任务至关重要。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP
    - CLIP 输出表示与主要模型一起加载的条件语言-图像预训练模型，它增强了节点处理多模态任务的能力。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- VAE
    - VAE 输出表示可以检索的变分自编码器组件，在节点的操作范围内提供强大的生成模型和数据编码工具。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- NAME_STRING
    - NAME_STRING 输出提供检查点的名称作为字符串，这对于日志记录、识别或工作流中的进一步处理非常有用。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Checkpoint_Loader_Simple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (comfy_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', TEXT_TYPE)
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'NAME_STRING')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'WAS Suite/Loaders'

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = comfy_paths.get_full_path('checkpoints', ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=comfy_paths.get_folder_paths('embeddings'))
        return (out[0], out[1], out[2], os.path.splitext(os.path.basename(ckpt_name))[0])
```