# Documentation
- Class name: ImageOnlyCheckpointSave
- Category: _for_testing
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageOnlyCheckpointSave节点旨在简化仅图像检查点的保存过程。它封装了保存模型状态的流程，确保检查点可以稍后检索并用于图像生成或进一步处理。该节点对于维持模型操作的连续性以及在特定时间点保存模型状态至关重要。

# Input types
## Required
- model
    - 模型参数对于ImageOnlyCheckpointSave节点至关重要，因为它代表了要保存的核心组件。它是主要的输入，决定了节点的执行和生成的检查点的内容。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip_vision
    - clip_vision参数是节点的关键输入，提供了与模型相关联的视觉组件。它对检查点的功能至关重要，确保模型的视觉方面也得到保存。
    - Comfy dtype: CLIP_VISION
    - Python dtype: comfy.sd.CLIPVision
- vae
    - vae参数指定了要包含在检查点中的变分自编码器。它在节点的操作中扮演着重要角色，因为它确保了VAE状态的包含，以便进行潜在的重构任务。
    - Comfy dtype: VAE
    - Python dtype: AutoencoderKL
- filename_prefix
    - filename_prefix参数决定了保存检查点文件时使用的前缀。它是节点功能的关键方面，因为它允许在文件系统中组织和识别检查点。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prompt
    - 可选的prompt参数可用于将特定提示与检查点关联。这对于在保存时回忆模型的上下文或用例非常有用。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - extra_pnginfo参数允许在检查点中包含额外的信息。这对于存储元数据或其他与模型状态相关的详细信息非常有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: dict

# Output types
- checkpoint
    - 检查点输出代表了模型的保存状态，包括其未来使用所需的所有必要组件。它标志着节点操作的成功完成以及在特定时间点保存模型的状态。
    - Comfy dtype: CHECKPOINT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ImageOnlyCheckpointSave(comfy_extras.nodes_model_merging.CheckpointSave):
    CATEGORY = '_for_testing'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip_vision': ('CLIP_VISION',), 'vae': ('VAE',), 'filename_prefix': ('STRING', {'default': 'checkpoints/ComfyUI'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}

    def save(self, model, clip_vision, vae, filename_prefix, prompt=None, extra_pnginfo=None):
        comfy_extras.nodes_model_merging.save_checkpoint(model, clip_vision=clip_vision, vae=vae, filename_prefix=filename_prefix, output_dir=self.output_dir, prompt=prompt, extra_pnginfo=extra_pnginfo)
        return {}
```