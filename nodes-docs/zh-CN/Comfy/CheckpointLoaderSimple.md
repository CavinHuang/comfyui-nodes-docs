# Documentation
- Class name: CheckpointLoaderSimple
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CheckpointLoaderSimple节点旨在加载和管理机器学习模型的检查点。它负责从指定的检查点检索模型的状态，确保模型准备用于推理或进一步训练。该节点抽象了检查点加载的复杂性，为模型部署和利用提供了一个简化的接口。

# Input types
## Required
- ckpt_name
    - 检查点名称是CheckpointLoaderSimple节点的关键参数，因为它标识要加载的特定检查点。此参数直接影响节点的操作，通过确定要检索的模型状态，影响随后的模型性能和行为。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - output_vae参数指示是否应从检查点加载变分自编码器（VAE）。此可选参数允许在加载模型的必要组件时具有灵活性，从而优化资源使用并简化加载过程。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - output_clip参数确定是否应将CLIP（对比语言-图像预训练）模型与主模型检查点一起加载。这个选择对于需要文本-图像配对功能的应用程序来说可能很重要，从而增强了模型的功能。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - MODEL输出代表已加载的机器学习模型。它是一个关键组件，因为它包含了模型的已学习参数和架构，使其能够根据输入数据执行分类或回归等任务。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP
    - 当请求时，CLIP输出提供能够理解和从文本描述生成图像的对比语言-图像预训练模型。这个输出对于涉及文本到图像生成或图像-文本匹配的应用程序来说非常重要。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- VAE
    - VAE输出指的是模型的变分自编码器组件，它负责生成与输入数据分布相似的新数据样本。对于需要数据生成或去噪的任务来说，这是一个重要部分。
    - Comfy dtype: AutoencoderKL
    - Python dtype: AutoencoderKL

# Usage tips
- Infra type: CPU

# Source code
```
class CheckpointLoaderSimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'loaders'

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        return out[:3]
```