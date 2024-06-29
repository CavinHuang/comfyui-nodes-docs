# Documentation
- Class name: LayeredDiffusionDecodeSplit
- Category: Image Processing
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionDecodeSplit 类旨在以子批次的方式高效解码 RGBA 图像，提高处理吞吐量和内存管理。它通过解码较小的图像组来处理大型图像数据集，从而优化计算资源并为各种应用简化解码过程。

# Input types
## Required
- samples
    - “samples”参数是必需的，因为它包含了解码过程所需的潜在表示。它直接影响解码图像的质量和准确性，是整个操作的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- images
    - “images”参数对于解码过程至关重要，它提供了需要处理的输入图像。它是节点执行的核心，并影响最终输出，决定了解码图像的视觉方面。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- frames
    - “frames”参数决定了图像解码的频率，有效地控制子批次的大小。它在平衡计算效率和内存使用方面发挥着关键作用，确保处理过程顺畅且优化。
    - Comfy dtype: INT
    - Python dtype: int
- sd_version
    - “sd_version”参数指定要使用的稳定扩散模型的版本，这对于确定解码算法及其与输入数据的兼容性至关重要。它影响整体性能和生成图像的质量。
    - Comfy dtype: ENUM
    - Python dtype: StableDiffusionVersion
- sub_batch_size
    - “sub_batch_size”参数对于管理计算负载至关重要，因为它定义了每个子批次处理的图像数量。它在优化解码过程的速度和资源分配方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - “image”输出代表解码后的 RGBA 图像，是节点操作的主要结果。它封装了从输入数据处理得到的视觉信息，展示了节点将潜在表示转换为可感知视觉内容的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- alpha
    - “alpha”输出包含解码图像的 alpha 通道信息，对于需要透明度的应用来说非常重要。它突出了节点处理复杂图像属性的能力，并为最终视觉输出的丰富性做出了贡献。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionDecodeSplit(LayeredDiffusionDecodeRGBA):
    """Decode RGBA every N images."""

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'images': ('IMAGE',), 'frames': ('INT', {'default': 2, 'min': 2, 'max': s.MAX_FRAMES, 'step': 1}), 'sd_version': ([StableDiffusionVersion.SD1x.value, StableDiffusionVersion.SDXL.value], {'default': StableDiffusionVersion.SDXL.value}), 'sub_batch_size': ('INT', {'default': 16, 'min': 1, 'max': 4096, 'step': 1})}}
    MAX_FRAMES = 3
    RETURN_TYPES = ('IMAGE',) * MAX_FRAMES

    def decode(self, samples, images: torch.Tensor, frames: int, sd_version: str, sub_batch_size: int):
        sliced_samples = copy.copy(samples)
        sliced_samples['samples'] = sliced_samples['samples'][::frames]
        return tuple((super(LayeredDiffusionDecodeSplit, self).decode(sliced_samples, imgs, sd_version, sub_batch_size)[0] if i == 0 else imgs for i in range(frames) for imgs in (images[i::frames],))) + (None,) * (self.MAX_FRAMES - frames)
```