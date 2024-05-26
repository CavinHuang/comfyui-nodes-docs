# Documentation
- Class name: VAEDecodeBatched
- Category: Video Helper Suite 🎥🅥🅗🅢/batched nodes
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

VAEDecodeBatched节点旨在使用变分自编码器（VAE）模型对潜在样本进行批量解码。它通过批量处理多个样本来高效地重建图像，这对于大型数据集或计算资源有限的情况特别有用。

# Input types
## Required
- samples
    - 'samplse'参数是VAEDecodeBatched节点的关键输入，因为它包含了需要解码成图像的潜在表示。潜在样本的质量和结构直接影响节点产生的输出图像。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - 'vae'参数指定了节点将用于解码潜在样本的变分自编码器模型。模型的架构和训练权重对于生成高质量的重建图像至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- per_batch
    - 'per_batch'参数决定了解码过程中每个批次处理的样本数量。它对于平衡计算效率和内存使用之间的权衡非常重要，尤其是在处理大型数据集时。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- decoded_images
    - 'decoded_images'输出是一个包含重建图像的张量，这些图像是从解码输入潜在样本得到的。它代表了VAEDecodeBatched节点操作的主要结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEDecodeBatched:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',), 'per_batch': ('INT', {'default': 16, 'min': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/batched nodes'
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'decode'

    def decode(self, vae, samples, per_batch):
        decoded = []
        for start_idx in range(0, samples['samples'].shape[0], per_batch):
            decoded.append(vae.decode(samples['samples'][start_idx:start_idx + per_batch]))
        return (torch.cat(decoded, dim=0),)
```