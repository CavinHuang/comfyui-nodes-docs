# Documentation
- Class name: WAS_Film_Grain
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Film_Grain节点旨在为图像添加电影颗粒效果，增强其视觉纹理，并创造出类似于传统电影摄影的审美吸引力。它通过应用具有可调密度和强度的灰度噪声来实现这一点，使用户能够控制最终图像中颗粒的显著性。

# Input types
## Required
- image
    - 图像参数是将要应用电影颗粒效果的输入图像。它是节点操作的基本组成部分，因为整个过程围绕操纵此图像以实现所需的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- density
    - 密度参数控制应用于图像的噪声浓度。它对于调整电影颗粒效果的强度至关重要，允许微调以适应不同的视觉偏好。
    - Comfy dtype: FLOAT
    - Python dtype: float
- intensity
    - 强度参数确定电影颗粒覆盖在原始图像上的力量。它是实现平衡效果的重要因素，确保颗粒明显但不会压倒图像的细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highlights
    - 高光参数调整图像的亮度，特别针对较亮的区域。它在增强对比度和使电影颗粒效果在图像的明亮部分更加显著方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- supersample_factor
    - supersample_factor参数在应用噪声之前增加图像的分辨率，这可以导致更详细和更高质量的电影颗粒效果。对于寻求对最终输出外观有更大控制权的用户来说，这是一个可选设置。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- film_grain_image
    - film_grain_image输出参数代表应用了电影颗粒效果的最终图像。它是所有节点处理的顶点，反映了用户对密度、强度和高光选择的设置。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Film_Grain:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'density': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 1.0, 'step': 0.01}), 'intensity': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 1.0, 'step': 0.01}), 'highlights': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 255.0, 'step': 0.01}), 'supersample_factor': ('INT', {'default': 4, 'min': 1, 'max': 8, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'film_grain'
    CATEGORY = 'WAS Suite/Image/Filter'

    def film_grain(self, image, density, intensity, highlights, supersample_factor):
        return (pil2tensor(self.apply_film_grain(tensor2pil(image), density, intensity, highlights, supersample_factor)),)

    def apply_film_grain(self, img, density=0.1, intensity=1.0, highlights=1.0, supersample_factor=4):
        """
        Apply grayscale noise with specified density, intensity, and highlights to a PIL image.
        """
        img_gray = img.convert('L')
        original_size = img.size
        img_gray = img_gray.resize((img.size[0] * supersample_factor, img.size[1] * supersample_factor), Image.Resampling(2))
        num_pixels = int(density * img_gray.size[0] * img_gray.size[1])
        noise_pixels = []
        for i in range(num_pixels):
            x = random.randint(0, img_gray.size[0] - 1)
            y = random.randint(0, img_gray.size[1] - 1)
            noise_pixels.append((x, y))
        for (x, y) in noise_pixels:
            value = random.randint(0, 255)
            img_gray.putpixel((x, y), value)
        img_noise = img_gray.convert('RGB')
        img_noise = img_noise.filter(ImageFilter.GaussianBlur(radius=0.125))
        img_noise = img_noise.resize(original_size, Image.Resampling(1))
        img_noise = img_noise.filter(ImageFilter.EDGE_ENHANCE_MORE)
        img_final = Image.blend(img, img_noise, intensity)
        enhancer = ImageEnhance.Brightness(img_final)
        img_highlights = enhancer.enhance(highlights)
        return img_highlights
```