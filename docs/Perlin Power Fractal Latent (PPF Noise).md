# Documentation
- Class name: PPFNoiseNode
- Category: Power Noise Suite/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

PPFNoiseNode旨在使用Perlin噪声生成分形噪声图案，可以通过调整参数来控制生成过程，从而产生复杂的视觉纹理。它提供了一种产生一批噪声张量的方法，具有可调整的参数，以控制生成过程，从而产生多样化的噪声图。

# Input types
## Required
- batch_size
    - 确定单次操作中生成的噪声图数量，影响输出的总体吞吐量和多样性。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 指定生成的噪声图的宽度，影响纹理的分辨率和细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 定义噪声图的高度，这直接关系到输出纹理的垂直维度。
    - Comfy dtype: INT
    - Python dtype: int
- X
    - 控制噪声采样的X坐标偏移量，沿X轴移动图案，有助于噪声图中的整体变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Y
    - 调整噪声采样的Y坐标偏移量，影响图案沿Y轴的位置，有助于输出的多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Z
    - 影响噪声采样的Z坐标偏移量，为噪声图案增加深度并引入时间演变。
    - Comfy dtype: FLOAT
    - Python dtype: float
- evolution
    - 调节噪声图案的时间演变，随着帧序列创造出输出中的动态变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame
    - 代表演变序列中的当前帧，影响噪声图案随时间的进展。
    - Comfy dtype: INT
    - Python dtype: int
- scale
    - 调整噪声的频率比例，影响生成纹理的粒度和细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- octaves
    - 指定分形生成过程中的八度音数，决定了噪声图案的复杂性和丰富性。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - 影响分形中每个八度音的持续性，控制振幅减小和噪声的整体平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lacunarity
    - 调整连续八度音之间的频率增加，影响噪声图案的变化和对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- exponent
    - 调节应用于噪声值的指数，影响输出的整体强度和对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 调整噪声的整体亮度，允许在生成的纹理中从暗到亮的变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 影响噪声的对比度，增强或减少输出中暗区和光区之间的差异。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp_min
    - 设置噪声值的最小值，防止结果过于暗淡或负面。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp_max
    - 定义噪声值的最大值，确保输出不超过一定的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 为随机数生成提供种子，确保噪声图案的可复现性和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- device
    - 根据性能和资源需求选择计算设备，可以是CPU或GPU。
    - Comfy dtype: COMBO['cpu', 'cuda']
    - Python dtype: str

# Output types
- latents
    - 包含以潜在形式生成的噪声图，可以进一步处理或用作其他节点的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- previews
    - 提供生成的噪声图的视觉表示，允许快速评估噪声图案及其属性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNoiseNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'batch_size': ('INT', {'default': 1, 'max': 64, 'min': 1, 'step': 1}), 'width': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'resampling': (['nearest-exact', 'bilinear', 'area', 'bicubic', 'bislerp'],), 'X': ('FLOAT', {'default': 0, 'max': 99999999, 'min': -99999999, 'step': 0.01}), 'Y': ('FLOAT', {'default': 0, 'max': 99999999, 'min': -99999999, 'step': 0.01}), 'Z': ('FLOAT', {'default': 0, 'max': 99999999, 'min': -99999999, 'step': 0.01}), 'evolution': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': 0.0, 'step': 0.01}), 'frame': ('INT', {'default': 0, 'max': 99999999, 'min': 0, 'step': 1}), 'scale': ('FLOAT', {'default': 5, 'max': 2048, 'min': 2, 'step': 0.01}), 'octaves': ('INT', {'default': 8, 'max': 8, 'min': 1, 'step': 1}), 'persistence': ('FLOAT', {'default': 1.5, 'max': 23.0, 'min': 0.01, 'step': 0.01}), 'lacunarity': ('FLOAT', {'default': 2.0, 'max': 99.0, 'min': 0.01, 'step': 0.01}), 'exponent': ('FLOAT', {'default': 4.0, 'max': 38.0, 'min': 0.01, 'step': 0.01}), 'brightness': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.01}), 'contrast': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.01}), 'clamp_min': ('FLOAT', {'default': 0.0, 'max': 10.0, 'min': -10.0, 'step': 0.01}), 'clamp_max': ('FLOAT', {'default': 1.0, 'max': 10.0, 'min': -10.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'device': (['cpu', 'cuda'],)}, 'optional': {'optional_vae': ('VAE',), 'ppf_settings': ('PPF_SETTINGS',)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    RETURN_NAMES = ('latents', 'previews')
    FUNCTION = 'power_fractal_latent'
    CATEGORY = 'Power Noise Suite/Noise'

    def power_fractal_latent(self, batch_size, width, height, resampling, X, Y, Z, evolution, frame, scale, octaves, persistence, lacunarity, exponent, brightness, contrast, clamp_min, clamp_max, seed, device, optional_vae=None, ppf_settings=None):
        if ppf_settings:
            ppf = ppf_settings
            X = ppf['X']
            Y = ppf['Y']
            Z = ppf['Z']
            evolution = ppf['evolution']
            frame = ppf['frame']
            scale = ppf['scale']
            octaves = ppf['octaves']
            persistence = ppf['persistence']
            lacunarity = ppf['lacunarity']
            exponent = ppf['exponent']
            brightness = ppf['brightness']
            contrast = ppf['contrast']
        color_intensity = 1
        masking_intensity = 1
        batch_size = int(batch_size)
        width = int(width)
        height = int(height)
        channel_tensors = []
        for i in range(batch_size):
            nseed = seed + i * 12
            rgb_noise_maps = []
            rgb_image = torch.zeros(4, height, width)
            for j in range(3):
                rgba_noise_map = self.generate_noise_map(width, height, X, Y, Z, frame, device, evolution, octaves, persistence, lacunarity, exponent, scale, brightness, contrast, nseed + j, clamp_min, clamp_max)
                rgb_noise_map = rgba_noise_map.squeeze(-1)
                rgb_noise_map *= color_intensity
                rgb_noise_map *= masking_intensity
                rgb_image[j] = rgb_noise_map
            rgb_image[3] = torch.ones(height, width)
            channel_tensors.append(rgb_image)
        tensors = torch.stack(channel_tensors)
        tensors = normalize(tensors)
        if optional_vae is None:
            latents = F.interpolate(tensors, size=(height // 8, width // 8), mode=resampling)
            return ({'samples': latents}, tensors.permute(0, 2, 3, 1))
        encoder = nodes.VAEEncode()
        latents = []
        for tensor in tensors:
            tensor = tensor.unsqueeze(0)
            tensor = tensor.permute(0, 2, 3, 1)
            latents.append(encoder.encode(optional_vae, tensor)[0]['samples'])
        latents = torch.cat(latents)
        return ({'samples': latents}, tensors.permute(0, 2, 3, 1))

    def generate_noise_map(self, width, height, X, Y, Z, frame, device, evolution, octaves, persistence, lacunarity, exponent, scale, brightness, contrast, seed, clamp_min, clamp_max):
        PPF = PerlinPowerFractal(width, height)
        noise_map = PPF(1, X, Y, Z, frame, device, evolution, octaves, persistence, lacunarity, exponent, scale, brightness, contrast, seed, clamp_min, clamp_max)
        return noise_map
```