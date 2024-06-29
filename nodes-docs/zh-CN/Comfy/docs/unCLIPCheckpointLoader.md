# Documentation
- Class name: unCLIPCheckpointLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

unCLIPCheckpointLoader节点旨在高效管理和加载unCLIP模型的检查点。它抽象了检查点检索的复杂性，并确保从保存的状态正确初始化适当的组件，如模型、CLIP和VAE。该节点在模型部署和推理工作流程中发挥关键作用，通过简化检查点加载过程来实现。

# Input types
## Required
- ckpt_name
    - ckpt_name参数对于识别要加载的特定检查点至关重要。它将节点指向检查点目录内的正确文件路径，从而实现检索相关模型状态。此参数对节点的执行至关重要，因为它决定了模型恢复的起点。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - output_vae参数决定是否应从检查点加载变分自编码器（VAE）组件。它在节点操作中提供灵活性，允许用户根据其特定用例或计算限制选择性地仅加载所需组件。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - output_clip参数指定是否应加载模型的CLIP组件。对于需要文本到图像或图像到文本功能的应用程序来说，它是一个重要的设置，确保节点能够适应不同的操作需求。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - MODEL输出提供了从检查点加载的模型。它是任何后续处理或推理任务的基础输出，作为模型功能的核心组件。
    - Comfy dtype: COMBO[str, torch.nn.Module]
    - Python dtype: torch.nn.Module
- CLIP
    - CLIP输出代表模型的文本到图像或图像到文本组件，对于涉及自然语言处理和计算机视觉的应用程序特别有用。
    - Comfy dtype: COMBO[str, torch.nn.Module]
    - Python dtype: torch.nn.Module
- VAE
    - VAE输出是模型的变分自编码器部分，负责从学习到的分布中生成新的数据样本。它是需要数据生成或操作的任务的关键组件。
    - Comfy dtype: COMBO[str, torch.nn.Module]
    - Python dtype: torch.nn.Module
- CLIP_VISION
    - CLIP_VISION输出涉及CLIP模型的视觉方面，专注于与图像相关的功能。它对于专门处理图像处理和分析的任务具有重要意义。
    - Comfy dtype: COMBO[str, torch.nn.Module]
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class unCLIPCheckpointLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'CLIP_VISION')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'loaders'

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, output_clipvision=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        return out
```