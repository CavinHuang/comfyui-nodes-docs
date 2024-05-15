# Documentation
- Class name: PPFNPowerLawNoise
- Category: Power Noise Suite/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

该节点旨在生成各种类型的幂律噪声，可应用于纹理生成、随机过程和基于噪声的艺术等多种应用中。它提供了一个灵活的接口，用于指定噪声类型、规模和阿尔法指数等参数，允许用户根据自己的特定需求定制输出。

# Input types
## Required
- batch_size
    - 此参数确定在单个批次中生成的噪声图像数量，这会影响计算效率和结果的适用性。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 噪声图像的宽度决定了水平分辨率，影响细节层次和输出的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 与宽度类似，高度参数设置了噪声图像的垂直分辨率，影响输出的尺寸和细节。
    - Comfy dtype: INT
    - Python dtype: int
- noise_type
    - 所选噪声类型将决定生成噪声的统计特性，这对于依赖特定噪声特性的应用至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- scale
    - 比例参数调整噪声的整体振幅，控制噪声图案的可见性和强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- alpha_exponent
    - 阿尔法指数塑造了噪声的幂律分布，影响频率内容和噪声的“颜色”（例如，从白色到布朗噪声）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- device
    - 指定设备（'cpu'或'cuda'）决定了将执行计算的硬件，影响性能和兼容性。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- resampling
    - 重采样参数影响在调整大小时噪声图像的插值方式，影响最终输出的质量和外观。
    - Comfy dtype: COMBO
    - Python dtype: str
- modulator
    - 调制参数为噪声添加了调制，可以在输出中创建更复杂的图案和变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 通过设置种子，用户可以确保噪声生成过程的可重复性，这对于实验和研究目的非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- optional_vae
    - 当提供时，optional_vae参数允许集成变分自编码器（VAE），从而实现更复杂的噪声操作和生成。
    - Comfy dtype: VAE
    - Python dtype: VAE

# Output types
- latents
    - 潜在输出包含潜在空间表示中的噪声图像，可以进一步处理或用作其他节点的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- previews
    - 预览输出提供了生成噪声的视觉表示，允许用户快速评估和比较不同的噪声设置和参数。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNPowerLawNoise:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        pln = PowerLawNoise('cpu')
        return {'required': {'batch_size': ('INT', {'default': 1, 'max': 64, 'min': 1, 'step': 1}), 'width': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'resampling': (['nearest-exact', 'bilinear', 'area', 'bicubic', 'bislerp'],), 'noise_type': (pln.get_noise_types(),), 'scale': ('FLOAT', {'default': 1.0, 'max': 1024.0, 'min': 0.01, 'step': 0.001}), 'alpha_exponent': ('FLOAT', {'default': 1.0, 'max': 12.0, 'min': -12.0, 'step': 0.001}), 'modulator': ('FLOAT', {'default': 1.0, 'max': 2.0, 'min': 0.1, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'device': (['cpu', 'cuda'],)}, 'optional': {'optional_vae': ('VAE',)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    RETURN_NAMES = ('latents', 'previews')
    FUNCTION = 'power_noise'
    CATEGORY = 'Power Noise Suite/Noise'

    def power_noise(self, batch_size, width, height, resampling, noise_type, scale, alpha_exponent, modulator, seed, device, optional_vae=None):
        power_law = PowerLawNoise(device=device)
        tensors = power_law(batch_size, width, height, scale=scale, alpha=alpha_exponent, modulator=modulator, noise_type=noise_type, seed=seed)
        alpha_channel = torch.ones((batch_size, height, width, 1), dtype=tensors.dtype, device='cpu')
        tensors = torch.cat((tensors, alpha_channel), dim=3)
        if optional_vae is None:
            latents = tensors.permute(0, 3, 1, 2)
            latents = F.interpolate(latents, size=(height // 8, width // 8), mode=resampling)
            return ({'samples': latents}, tensors)
        encoder = nodes.VAEEncode()
        latents = []
        for tensor in tensors:
            tensor = tensor.unsqueeze(0)
            latents.append(encoder.encode(optional_vae, tensor)[0]['samples'])
        latents = torch.cat(latents)
        return ({'samples': latents}, tensors)
```