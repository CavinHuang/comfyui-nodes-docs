# Documentation
- Class name: PPFNCrossHatchNode
- Category: Power Noise Suite/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

该节点旨在生成具有动力分形效应的复杂交叉线图案，为创建视觉复杂且详细的图像提供了一种高级方法。它通过操作各种参数来控制噪声图案的复杂性、颜色和整体美观度，为不同视觉应用提供了多样化的输出。

# Input types
## Required
- batch_size
    - 该参数决定了单次操作中生成的图像数量，直接影响节点输出的规模和吞吐量。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 图像的宽度决定了水平分辨率，并在定义交叉线图案的画布大小方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 与宽度类似，高度参数设置了垂直分辨率，这对于建立生成图像的尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- frequency
    - 频率参数控制交叉线线的密度，值越高，图案越复杂，视觉复杂性也越大。
    - Comfy dtype: FLOAT
    - Python dtype: float
- octaves
    - 该参数影响分形生成过程中的细节和复杂性水平，更高的八度会产生更详细和多样化的图案。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - 持续性调整每个连续八度的振幅，影响生成图案的平滑度和整体视觉质感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- color_tolerance
    - 颜色容差细化了噪声值到颜色的映射，确保交叉线图案具有更细致和多样的色彩调色板。
    - Comfy dtype: FLOAT
    - Python dtype: float
- angle_degrees
    - 角度参数设置了交叉线的方向，这在定义图案的整体美观和方向性方面是基本的。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 亮度调整生成图像的整体亮度，允许交叉线图案在明亮度和暗度上有所变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 对比度影响生成图像的动态范围，影响交叉线图案的生动性和深度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur
    - 模糊参数对图像应用平滑效果，软化边缘，为交叉线创造更微妙和融合的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latents
    - 潜在输出提供了生成图像的压缩表示，适合在动力噪声套件内进行进一步的处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- previews
    - 预览提供了生成图像的缩小版本，允许快速视觉检查和评估交叉线图案。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNCrossHatchNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'batch_size': ('INT', {'default': 1, 'max': 64, 'min': 1, 'step': 1}), 'width': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'resampling': (['nearest-exact', 'bilinear', 'area', 'bicubic', 'bislerp'],), 'frequency': ('FLOAT', {'default': 320.0, 'max': 1024.0, 'min': 0.001, 'step': 0.001}), 'octaves': ('INT', {'default': 12, 'max': 32, 'min': 1, 'step': 1}), 'persistence': ('FLOAT', {'default': 1.5, 'max': 2.0, 'min': 0.001, 'step': 0.001}), 'num_colors': ('INT', {'default': 16, 'max': 256, 'min': 2, 'step': 1}), 'color_tolerance': ('FLOAT', {'default': 0.05, 'max': 1.0, 'min': 0.001, 'step': 0.001}), 'angle_degrees': ('FLOAT', {'default': 45.0, 'max': 360.0, 'min': 0.0, 'step': 0.01}), 'brightness': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.001}), 'contrast': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.001}), 'blur': ('FLOAT', {'default': 2.5, 'max': 1024, 'min': 0, 'step': 0.01}), 'clamp_min': ('FLOAT', {'default': 0.0, 'max': 10.0, 'min': -10.0, 'step': 0.01}), 'clamp_max': ('FLOAT', {'default': 1.0, 'max': 10.0, 'min': -10.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'device': (['cpu', 'cuda'],)}, 'optional': {'optional_vae': ('VAE',), 'ch_settings': ('CH_SETTINGS',)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    RETURN_NAMES = ('latents', 'previews')
    FUNCTION = 'cross_hatch'
    CATEGORY = 'Power Noise Suite/Noise'

    def cross_hatch(self, batch_size, width, height, resampling, frequency, octaves, persistence, color_tolerance, num_colors, angle_degrees, brightness, contrast, blur, clamp_min, clamp_max, seed, device, optional_vae=None, ch_settings=None):
        if ch_settings:
            ch = ch_settings
            frequency = ch['frequency']
            octaves = ch['octaves']
            persistence = ch['persistence']
            color_tolerance = ch['color_tolerance']
            num_colors = ch['num_colors']
            angle_degrees = ch['angle_degrees']
            brightness = ch['brightness']
            contrast = ch['contrast']
            blur = ch['blur']
        cross_hatch = CrossHatchPowerFractal(width=width, height=height, frequency=frequency, octaves=octaves, persistence=persistence, num_colors=num_colors, color_tolerance=color_tolerance, angle_degrees=angle_degrees, blur=blur, clamp_min=clamp_min, clamp_max=clamp_max)
        tensors = cross_hatch(batch_size, device, seed).to(device='cpu')
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