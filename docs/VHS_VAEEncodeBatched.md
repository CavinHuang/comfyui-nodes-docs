# Documentation
- Class name: VAEEncodeBatched
- Category: Video Helper Suite 🎥🅥🅗🅢/batched nodes
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

VAEEncodeBatched节点旨在使用变分自编码器（VAE）高效地将视频帧批次编码为潜在空间表示。它以指定的批次大小处理帧，以优化计算资源和吞吐量，使其适合处理大量视频数据。

# Input types
## Required
- pixels
    - ‘pixels’参数是VAEEncodeBatched节点的关键输入，因为它代表了需要编码的原始视频帧。其高效处理对节点的性能和生成的潜在空间表示的质量至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - ‘vae’参数指定了节点将用于编码视频帧的变分自编码器模型。它对于确定帧编码的潜在空间的结构和特性至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- per_batch
    - ‘per_batch’参数定义了节点要处理的每个像素批次的大小。它对于管理内存使用和计算效率很重要，尤其是在处理高分辨率或大量视频帧时。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - VAEEncodeBatched节点的‘samples’输出包含输入视频帧的编码潜在空间表示。这个输出很重要，因为它构成了下游任务中进一步分析或处理的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEEncodeBatched:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'vae': ('VAE',), 'per_batch': ('INT', {'default': 16, 'min': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/batched nodes'
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'encode'

    def encode(self, vae, pixels, per_batch):
        t = []
        for start_idx in range(0, pixels.shape[0], per_batch):
            try:
                sub_pixels = vae.vae_encode_crop_pixels(pixels[start_idx:start_idx + per_batch])
            except:
                sub_pixels = VAEEncode.vae_encode_crop_pixels(pixels[start_idx:start_idx + per_batch])
            t.append(vae.encode(sub_pixels[:, :, :, :3]))
        return ({'samples': torch.cat(t, dim=0)},)
```