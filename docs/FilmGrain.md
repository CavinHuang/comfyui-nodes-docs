# Documentation
- Class name: FilmGrain
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

FilmGrain节点向图像中引入随机噪声模式，模拟胶片颗粒的纹理。这一过程通过增加深度和纹理感，增强了视觉美学效果，常用于艺术性和风格化的后期处理。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是将要应用电影颗粒效果的基础媒体。它决定了输出的视觉质量，是整个操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- intensity
    - 强度控制应用于图像的噪声的大小。它影响颗粒效果的显著性，较高的值会导致更明显的颗粒图案。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale
    - 比例调整噪声图案相对于图像的大小。较大的比例会导致更明显的噪声特征，这可以为电影颗粒外观增添更戏剧性的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- temperature
    - 温度调整图像的颜色平衡，为最终输出增加温暖或凉爽感。这个参数可以微妙地改变图像的情绪和整体感觉。
    - Comfy dtype: FLOAT
    - Python dtype: float
- vignette
    - 晕影控制图像边缘褪色的强度，创造出更集中和戏剧性的视觉效果。它可以引导观众的注意力向图像中心。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 输出图像是应用电影颗粒效果后的结果，包括调整过的强度、比例、温度和晕影参数。它代表了节点的最终创意输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class FilmGrain:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'intensity': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'scale': ('FLOAT', {'default': 10, 'min': 1, 'max': 100, 'step': 1}), 'temperature': ('FLOAT', {'default': 0.0, 'min': -100, 'max': 100, 'step': 1}), 'vignette': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 10.0, 'step': 1.0})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'film_grain'
    CATEGORY = 'postprocessing/Effects'

    def film_grain(self, image: torch.Tensor, intensity: float, scale: float, temperature: float, vignette: float):
        (batch_size, height, width, _) = image.shape
        result = torch.zeros_like(image)
        for b in range(batch_size):
            tensor_image = image[b].numpy()
            noise = self.generate_perlin_noise((height, width), scale)
            noise = (noise - np.min(noise)) / (np.max(noise) - np.min(noise))
            noise = (noise * 2 - 1) * intensity
            grain_image = np.clip(tensor_image + noise[:, :, np.newaxis], 0, 1)
            grain_image = self.apply_temperature(grain_image, temperature)
            grain_image = self.apply_vignette(grain_image, vignette)
            tensor = torch.from_numpy(grain_image).unsqueeze(0)
            result[b] = tensor
        return (result,)

    def generate_perlin_noise(self, shape, scale, octaves=4, persistence=0.5, lacunarity=2):

        def smoothstep(t):
            return t * t * (3.0 - 2.0 * t)

        def lerp(t, a, b):
            return a + t * (b - a)

        def gradient(h, x, y):
            vectors = np.array([[1, 1], [-1, 1], [1, -1], [-1, -1]])
            g = vectors[h % 4]
            return g[:, :, 0] * x + g[:, :, 1] * y
        (height, width) = shape
        noise = np.zeros(shape)
        for octave in range(octaves):
            octave_scale = scale * lacunarity ** octave
            x = np.linspace(0, 1, width, endpoint=False)
            y = np.linspace(0, 1, height, endpoint=False)
            (X, Y) = np.meshgrid(x, y)
            (X, Y) = (X * octave_scale, Y * octave_scale)
            xi = X.astype(int)
            yi = Y.astype(int)
            xf = X - xi
            yf = Y - yi
            u = smoothstep(xf)
            v = smoothstep(yf)
            n00 = gradient(np.random.randint(0, 4, (height, width)), xf, yf)
            n01 = gradient(np.random.randint(0, 4, (height, width)), xf, yf - 1)
            n10 = gradient(np.random.randint(0, 4, (height, width)), xf - 1, yf)
            n11 = gradient(np.random.randint(0, 4, (height, width)), xf - 1, yf - 1)
            x1 = lerp(u, n00, n10)
            x2 = lerp(u, n01, n11)
            y1 = lerp(v, x1, x2)
            noise += y1 * persistence ** octave
        return noise / (1 - persistence ** octaves)

    def apply_temperature(self, image, temperature):
        if temperature == 0:
            return image
        temperature /= 100
        new_image = image.copy()
        if temperature > 0:
            new_image[:, :, 0] *= 1 + temperature
            new_image[:, :, 1] *= 1 + temperature * 0.4
        else:
            new_image[:, :, 2] *= 1 - temperature
        return np.clip(new_image, 0, 1)

    def apply_vignette(self, image, vignette_strength):
        if vignette_strength == 0:
            return image
        (height, width, _) = image.shape
        x = np.linspace(-1, 1, width)
        y = np.linspace(-1, 1, height)
        (X, Y) = np.meshgrid(x, y)
        radius = np.sqrt(X ** 2 + Y ** 2)
        mapped_vignette_strength = 1.8 - (vignette_strength - 1) * 0.1
        vignette = 1 - np.clip(radius / mapped_vignette_strength, 0, 1)
        return np.clip(image * vignette[..., np.newaxis], 0, 1)
```