# Documentation
- Class name: WAS_Image_To_Noise
- Category: WAS Suite/Image/Generate/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_To_Noise节点旨在将输入图像转换为噪声模式。它通过量化颜色、随机化像素数据，并可选择性地与高斯模糊混合，以实现一种嘈杂的美学效果。此节点作为生成基于噪声的图像的创意工具，可用于艺术表达或数据增强等多种应用。

# Input types
## Required
- images
    - ‘images’参数至关重要，因为它定义了节点将处理成噪声模式的输入图像。这种转换对最终输出有显著影响，使得此参数对节点的执行和生成图像的质量至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
## Optional
- num_colors
    - ‘num_colors’参数决定了对图像进行量化的颜色数量，这影响了噪声模式的复杂性。它在节点的操作中起着重要作用，通过控制颜色深度和生成的视觉噪声效果。
    - Comfy dtype: INT
    - Python dtype: int
- black_mix
    - ‘black_mix’参数控制混合到图像中的黑色噪声量，为噪声模式增加了一层复杂性。它对于实现输出图像中所需噪声水平非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- gaussian_mix
    - ‘gaussian_mix’参数指定要应用的高斯模糊程度，这可以平滑噪声并创建更微妙的噪声效果。它是微调噪声视觉外观的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - ‘brightness’参数调整噪声图像的亮度，可以增强或减少噪声模式的对比度。它是控制噪声效果整体外观的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- output_mode
    - ‘output_mode’参数决定输出的格式。选择‘batch’会将图像合并为单个张量，而‘list’会将它们保持为单独图像的列表。这影响结果如何为下游任务构建。
    - Comfy dtype: COMBO['batch', 'list']
    - Python dtype: Literal['batch', 'list']
- seed
    - ‘seed’参数用于初始化随机数生成器，确保噪声模式的可重复性。它对于在不同运行中生成一致的结果非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - ‘image’输出参数代表转换后的噪声图像。它是节点功能的主要结果，包含了从输入图像生成的噪声模式。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_To_Noise:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'num_colors': ('INT', {'default': 16, 'max': 256, 'min': 2, 'step': 2}), 'black_mix': ('INT', {'default': 0, 'max': 20, 'min': 0, 'step': 1}), 'gaussian_mix': ('FLOAT', {'default': 0.0, 'max': 1024, 'min': 0, 'step': 0.1}), 'brightness': ('FLOAT', {'default': 1.0, 'max': 2.0, 'min': 0.0, 'step': 0.01}), 'output_mode': (['batch', 'list'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    OUTPUT_IS_LIST = (False,)
    FUNCTION = 'image_to_noise'
    CATEGORY = 'WAS Suite/Image/Generate/Noise'

    def image_to_noise(self, images, num_colors, black_mix, gaussian_mix, brightness, output_mode, seed):
        noise_images = []
        for image in images:
            noise_images.append(pil2tensor(self.image2noise(tensor2pil(image), num_colors, black_mix, brightness, gaussian_mix, seed)))
        if output_mode == 'list':
            self.OUTPUT_IS_LIST = (True,)
        else:
            noise_images = torch.cat(noise_images, dim=0)
        return (noise_images,)

    def image2noise(self, image, num_colors=16, black_mix=0, brightness=1.0, gaussian_mix=0, seed=0):
        random.seed(int(seed))
        image = image.quantize(colors=num_colors)
        image = image.convert('RGBA')
        pixel_data = list(image.getdata())
        random.shuffle(pixel_data)
        randomized_image = Image.new('RGBA', image.size)
        randomized_image.putdata(pixel_data)
        (width, height) = image.size
        black_noise = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        for _ in range(black_mix):
            for x in range(width):
                for y in range(height):
                    if random.randint(0, 1) == 1:
                        black_noise.putpixel((x, y), (0, 0, 0, 255))
        randomized_image = Image.alpha_composite(randomized_image, black_noise)
        enhancer = ImageEnhance.Brightness(randomized_image)
        randomized_image = enhancer.enhance(brightness)
        if gaussian_mix > 0:
            original_noise = randomized_image.copy()
            randomized_gaussian = randomized_image.filter(ImageFilter.GaussianBlur(radius=gaussian_mix))
            randomized_image = Image.blend(randomized_image, randomized_gaussian, 0.65)
            randomized_image = Image.blend(randomized_image, original_noise, 0.25)
        return randomized_image
```