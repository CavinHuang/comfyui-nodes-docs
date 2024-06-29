# Documentation
- Class name: ImageOnlyCheckpointLoader
- Category: loaders/video_models
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点负责从指定目录加载检查点，并返回相关的模型、CLIP视觉模块和VAE组件。它旨在处理检查点加载和提取的复杂性，抽象细节，并为下游任务提供直接的接口。

# Input types
## Required
- ckpt_name
    - 要加载的检查点文件的名称。它对于在目录中识别特定的检查点至关重要，因为它直接影响节点的操作和生成的模型组件。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- MODEL
    - 从检查点加载的模型组件，可用于各种下游任务，如推理或进一步训练。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP_VISION
    - 从检查点中提取的CLIP视觉模块，对于涉及文本到图像生成或图像文本匹配的任务至关重要。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- VAE
    - 从检查点加载的变分自编码器（VAE）组件，通常用于潜在空间操作和生成任务。
    - Comfy dtype: AutoencoderKL
    - Python dtype: AutoencoderKL

# Usage tips
- Infra type: CPU

# Source code
```
class ImageOnlyCheckpointLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP_VISION', 'VAE')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'loaders/video_models'

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=False, output_clipvision=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        return (out[0], out[3], out[2])
```