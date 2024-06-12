# Documentation
- Class name: CheckpointLoader
- Category: advanced/loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CheckpointLoader节点旨在高效地管理检索模型检查点。它通过使用配置和检查点文件名来抽象定位和加载预训练模型的复杂性，确保恢复正确的模型状态以进行进一步处理或推理。

# Input types
## Required
- config_name
    - config_name参数对于识别与所需模型检查点相关联的特定配置至关重要。它指导节点到正确的配置文件，该文件包含模型按预期工作所需的设置。
    - Comfy dtype: str
    - Python dtype: str
- ckpt_name
    - ckpt_name参数指定要加载的检查点文件的名称。对于节点定位并恢复到指定检查点中保存的模型状态至关重要。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - output_vae参数决定是否加载模型的变分自编码器（VAE）组件。在只需要模型的特定部分用于手头任务的情况下，它提供了灵活性。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - output_clip参数指示是否应在加载的检查点中包含模型的对比语言-图像预训练（CLIP）组件。它允许根据应用程序的需求选择性地加载模型组件。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - MODEL输出提供了已加载的模型检查点，可用于后续任务，如推理或进一步训练。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP
    - 当请求时，CLIP输出提供已加载模型的对比语言-图像预训练组件，适用于涉及文本和图像分析的任务。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- VAE
    - 如果指定，VAE输出包括模型的变分自编码器部分，这对于生成任务或降维非常有用。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class CheckpointLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'config_name': (folder_paths.get_filename_list('configs'),), 'ckpt_name': (folder_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'advanced/loaders'

    def load_checkpoint(self, config_name, ckpt_name, output_vae=True, output_clip=True):
        config_path = folder_paths.get_full_path('configs', config_name)
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        return comfy.sd.load_checkpoint(config_path, ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
```