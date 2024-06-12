# Documentation
- Class name: WAS_Checkpoint_Loader
- Category: WAS Suite/Loaders/Advanced
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `load_checkpoint` 旨在高效地检索和加载指定检查点的预训练模型、CLIP模型和VAE模型。它是初始化复杂机器学习架构及其相应配置和权重的工作流程中的关键组成部分。

# Input types
## Required
- config_name
    - 参数 `config_name` 至关重要，因为它标识了模型所需的特定配置设置。它确保在加载过程中应用正确的模型架构和超参数。
    - Comfy dtype: str
    - Python dtype: str
- ckpt_name
    - 参数 `ckpt_name` 对于定位包含模型学习权重的检查点文件至关重要。它是一个关键输入，指导加载过程到模型的正确权重集。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - 标志 `output_vae` 决定是否应该加载模型的变分自编码器（VAE）组件。它根据手头任务的具体需求提供加载过程中的灵活性。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - 标志 `output_clip` 控制 CLIP 模型组件的加载。它允许根据应用或分析的需求选择性地加载模型部件。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - 输出 `MODEL` 提供了加载的模型架构。它非常重要，因为它代表了进一步处理或推理任务所需的核心组件。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP
    - 当请求时，输出 `CLIP` 提供了 CLIP 模型组件。对于涉及文本到图像或图像到文本功能的任务，它是必不可少的部分。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- VAE
    - 如果指定，输出 `VAE` 包括模型的变分自编码器部分。对于需要生成能力或潜在空间操作的任务，它是至关重要的。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- NAME_STRING
    - 输出 `NAME_STRING` 返回没有文件扩展名的检查点的基本名称。它作为检查点的标识符，对于日志记录或记录保存目的非常有用。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Checkpoint_Loader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'config_name': (comfy_paths.get_filename_list('configs'),), 'ckpt_name': (comfy_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', TEXT_TYPE)
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'NAME_STRING')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'WAS Suite/Loaders/Advanced'

    def load_checkpoint(self, config_name, ckpt_name, output_vae=True, output_clip=True):
        config_path = comfy_paths.get_full_path('configs', config_name)
        ckpt_path = comfy_paths.get_full_path('checkpoints', ckpt_name)
        out = comfy.sd.load_checkpoint(config_path, ckpt_path, output_vae=True, output_clip=True, embedding_directory=comfy_paths.get_folder_paths('embeddings'))
        return (out[0], out[1], out[2], os.path.splitext(os.path.basename(ckpt_name))[0])
```