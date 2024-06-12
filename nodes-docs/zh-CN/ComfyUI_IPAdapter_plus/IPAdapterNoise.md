# Documentation
- Class name: IPAdapterNoise
- Category: ipadapter/utils
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterNoise节点旨在向图像中引入受控噪声，可用于数据增强或增强模型鲁棒性等多种目的。它提供了多种噪声类型的选择，并允许调整噪声强度，因此为不同用例提供了灵活的解决方案。

# Input types
## Required
- type
    - “type”参数决定了要生成的噪声类型，这显著影响了噪声应用的结果。这是一个关键的决策点，因为不同的噪声类型有不同的功能，并以不同的方式影响图像。
    - Comfy dtype: COMBO[fade, dissolve, gaussian, shuffle]
    - Python dtype: str
- strength
    - “strength”参数调整噪声的强度，直接影响图像的改变程度。这是一个重要的参数，它允许用户调整噪声效果以满足他们的具体需求。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- blur
    - “blur”参数对噪声应用高斯模糊，这可以帮助在某些应用中平滑噪声。它在噪声的最终视觉结果中发挥作用，提供了进一步细化噪声纹理的手段。
    - Comfy dtype: INT
    - Python dtype: int
- image_optional
    - “image_optional”参数允许提供一个可选的图像作为噪声生成的基础。这个参数很重要，因为它使得噪声可以应用于特定图像，而不是默认的空白图像，提供了更大的灵活性和定制化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- noise
    - “noise”输出是IPAdapterNoise节点的主要结果，代表了引入噪声的图像。它是一个关键组件，因为它承载了应用的噪声效果，准备在后续过程或分析中使用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterNoise:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'type': (['fade', 'dissolve', 'gaussian', 'shuffle'],), 'strength': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 1, 'step': 0.05}), 'blur': ('INT', {'default': 0, 'min': 0, 'max': 32, 'step': 1})}, 'optional': {'image_optional': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'make_noise'
    CATEGORY = 'ipadapter/utils'

    def make_noise(self, type, strength, blur, image_optional=None):
        if image_optional is None:
            image = torch.zeros([1, 224, 224, 3])
        else:
            transforms = T.Compose([T.CenterCrop(min(image_optional.shape[1], image_optional.shape[2])), T.Resize((224, 224), interpolation=T.InterpolationMode.BICUBIC, antialias=True)])
            image = transforms(image_optional.permute([0, 3, 1, 2])).permute([0, 2, 3, 1])
        seed = int(torch.sum(image).item()) % 1000000007
        torch.manual_seed(seed)
        if type == 'fade':
            noise = torch.rand_like(image)
            noise = image * (1 - strength) + noise * strength
        elif type == 'dissolve':
            mask = (torch.rand_like(image) < strength).float()
            noise = torch.rand_like(image)
            noise = image * (1 - mask) + noise * mask
        elif type == 'gaussian':
            noise = torch.randn_like(image) * strength
            noise = image + noise
        elif type == 'shuffle':
            transforms = T.Compose([T.ElasticTransform(alpha=75.0, sigma=(1 - strength) * 3.5), T.RandomVerticalFlip(p=1.0), T.RandomHorizontalFlip(p=1.0)])
            image = transforms(image.permute([0, 3, 1, 2])).permute([0, 2, 3, 1])
            noise = torch.randn_like(image) * (strength * 0.75)
            noise = image * (1 - noise) + noise
        del image
        noise = torch.clamp(noise, 0, 1)
        if blur > 0:
            if blur % 2 == 0:
                blur += 1
            noise = T.functional.gaussian_blur(noise.permute([0, 3, 1, 2]), blur).permute([0, 2, 3, 1])
        return (noise,)
```