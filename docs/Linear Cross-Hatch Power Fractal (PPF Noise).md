# Documentation
- Class name: PPFNLinearCrossHatchNode
- Category: Power Noise Suite/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

该节点旨在生成具有动力分形效应的复杂交叉线图案，为输出图像引入高度的细节和纹理。它通过操作各种参数来控制噪声的频率、持续性以及其他特性，从而实现创建复杂且视觉丰富的图像。节点的功能还包括调整亮度和对比度，并且支持与VAE模型的可选集成，以进一步增强生成内容。

# Input types
## Required
- batch_size
    - 该参数决定了一次操作中生成的图像数量，直接影响节点处理的规模和吞吐量。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 生成图像的宽度影响画布大小和输出中可以捕获的细节粒度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 与宽度类似，高度参数在确定图像的垂直尺寸和总体分辨率方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- resampling
    - 重采样方法对于缩放或调整图像大小时的图像质量至关重要，因为它影响像素的插值。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- frequency
    - 频率参数控制交叉线线的密度，这是定义生成图案的复杂性和纹理的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gain
    - 增益调整噪声的振幅，这对于确定最终图像中交叉线图案的显著性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- octaves
    - 八度数影响分形图案的复杂性和细节层次，有助于丰富视觉输出。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - 持续性是分形生成中的关键参数，影响图案在不同尺度上的平滑度和连续性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- add_noise
    - 添加噪声引入随机性到图案中，这可以在输出中创建更自然和多样化的视觉纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- linear_range
    - 线性范围参数对于噪声值的映射非常重要，因为它决定了交叉线线的传播和变化。
    - Comfy dtype: INT
    - Python dtype: int
- angle_degrees
    - 角度度数指定交叉线的方向，这是图案整体结构的基本方面。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 亮度调整影响图像的整体亮度，允许创建更广泛的视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 对比度控制图像最亮和最暗部分之间的差异，有助于视觉输出的生动性和深度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 种子用于随机数生成，确保图案的随机性可复现和一致。
    - Comfy dtype: INT
    - Python dtype: int
- device
    - 指定执行计算的设备对于优化性能和确保与底层硬件的兼容性至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
## Optional
- optional_vae
    - 可选的VAE集成允许通过使用生成模型进一步增强生成的图像，引入额外的复杂性和变化层。
    - Comfy dtype: VAE
    - Python dtype: VAE

# Output types
- latents
    - 潜在变量表示生成图像的编码版本，可用于进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- previews
    - 预览提供了生成图像的缩小版本，适合快速可视化和审查。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNLinearCrossHatchNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'batch_size': ('INT', {'default': 1, 'max': 64, 'min': 1, 'step': 1}), 'width': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'resampling': (['nearest-exact', 'bilinear', 'area', 'bicubic', 'bislerp'],), 'frequency': ('FLOAT', {'default': 320.0, 'max': 1024.0, 'min': 0.001, 'step': 0.001}), 'gain': ('FLOAT', {'default': 0.25, 'max': 1.0, 'min': 0.0, 'step': 0.001}), 'octaves': ('INT', {'default': 12, 'max': 32, 'min': 1, 'step': 1}), 'persistence': ('FLOAT', {'default': 1.5, 'max': 2.0, 'min': 0.001, 'step': 0.001}), 'add_noise': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': 0.0, 'step': 0.001}), 'linear_range': ('INT', {'default': 16, 'max': 256, 'min': 2, 'step': 1}), 'linear_tolerance': ('FLOAT', {'default': 0.05, 'max': 1.0, 'min': 0.001, 'step': 0.001}), 'angle_degrees': ('FLOAT', {'default': 45.0, 'max': 360.0, 'min': 0.0, 'step': 0.01}), 'brightness': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.001}), 'contrast': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.001}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'device': (['cpu', 'cuda'],)}, 'optional': {'optional_vae': ('VAE',)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    RETURN_NAMES = ('latents', 'previews')
    FUNCTION = 'cross_hatch'
    CATEGORY = 'Power Noise Suite/Noise'

    def cross_hatch(self, batch_size, width, height, resampling, frequency, gain, octaves, persistence, add_noise, linear_range, linear_tolerance, angle_degrees, brightness, contrast, seed, device, optional_vae=None):
        cross_hatch = CrossHatchLinearPowerFractal(width=width, height=height, frequency=frequency, gain=gain, octaves=octaves, persistence=persistence, add_noise_tolerance=add_noise, mapping_range=linear_range, angle_degrees=angle_degrees, brightness=brightness, contrast=contrast)
        tensors = cross_hatch(batch_size, device, seed)
        tensors = torch.cat([tensors, torch.ones(batch_size, height, width, 1, dtype=tensors.dtype, device='cpu')], dim=-1)
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