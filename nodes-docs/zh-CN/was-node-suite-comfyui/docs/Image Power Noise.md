# Documentation
- Class name: WAS_Image_Power_Noise
- Category: WAS Suite/Image/Generate/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

power_noise 方法旨在生成可用作图像处理或作为数字纹理的不同类型的噪声模式。它提供创建白色、灰色、粉红、绿色、蓝色或混合噪声的功能，基于指定的参数，如宽度、高度、频率和衰减，提供了一个根据不同需求定制噪声生成的多功能工具。

# Input types
## Required
- width
    - width 参数定义了要生成的噪声图像的宽度。它至关重要，因为它决定了输出图像的水平分辨率，影响整体细节和纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height 参数设置了噪声图像的垂直尺寸。它对于建立图像的垂直分辨率至关重要，并且与宽度一起定义了输出的整体形状。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- frequency
    - frequency 参数用于调整噪声模式的尺度。它对于粉红、绿色和蓝色噪声类型特别重要，影响噪声的频谱内容，从而影响视觉纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attenuation
    - 衰减通过调整灰噪声生成过程中的标准偏差来影响噪声的对比度。这是一个重要的参数，控制着噪声模式的可见性和强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_type
    - 要生成的噪声类型，选项包括灰色、白色、粉红、蓝色、绿色或这些的混合。每种类型产生不同的视觉效果，提供适用于不同应用的一系列噪声特性。
    - Comfy dtype: COMBO[grey, white, pink, blue, green, mix]
    - Python dtype: str
- seed
    - seed 参数用于初始化随机数生成器，确保噪声模式的可重复性。它是一个可选参数，为噪声的随机性提供控制，以获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出图像参数表示生成的噪声模式作为图像。它是 power_noise 方法的主要结果，将指定的噪声特性封装在视觉格式中。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Power_Noise:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'width': ('INT', {'default': 512, 'max': 4096, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 4096, 'min': 64, 'step': 1}), 'frequency': ('FLOAT', {'default': 0.5, 'max': 10.0, 'min': 0.0, 'step': 0.01}), 'attenuation': ('FLOAT', {'default': 0.5, 'max': 10.0, 'min': 0.0, 'step': 0.01}), 'noise_type': (['grey', 'white', 'pink', 'blue', 'green', 'mix'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'power_noise'
    CATEGORY = 'WAS Suite/Image/Generate/Noise'

    def power_noise(self, width, height, frequency, attenuation, noise_type, seed):
        noise_image = self.generate_power_noise(width, height, frequency, attenuation, noise_type, seed)
        return (pil2tensor(noise_image),)

    def generate_power_noise(self, width, height, frequency=None, attenuation=None, noise_type='white', seed=None):

        def white_noise(width, height):
            noise = np.random.random((height, width))
            return noise

        def grey_noise(width, height, attenuation):
            noise = np.random.normal(0, attenuation, (height, width))
            return noise

        def blue_noise(width, height, frequency, attenuation):
            noise = grey_noise(width, height, attenuation)
            scale = 1.0 / (width * height)
            fy = np.fft.fftfreq(height)[:, np.newaxis] ** 2
            fx = np.fft.fftfreq(width) ** 2
            f = fy + fx
            power = np.sqrt(f)
            power[0, 0] = 1
            noise = np.fft.ifft2(np.fft.fft2(noise) / power)
            noise *= scale / noise.std()
            return np.real(noise)

        def green_noise(width, height, frequency, attenuation):
            noise = grey_noise(width, height, attenuation)
            scale = 1.0 / (width * height)
            fy = np.fft.fftfreq(height)[:, np.newaxis] ** 2
            fx = np.fft.fftfreq(width) ** 2
            f = fy + fx
            power = np.sqrt(f)
            power[0, 0] = 1
            noise = np.fft.ifft2(np.fft.fft2(noise) / np.sqrt(power))
            noise *= scale / noise.std()
            return np.real(noise)

        def pink_noise(width, height, frequency, attenuation):
            noise = grey_noise(width, height, attenuation)
            scale = 1.0 / (width * height)
            fy = np.fft.fftfreq(height)[:, np.newaxis] ** 2
            fx = np.fft.fftfreq(width) ** 2
            f = fy + fx
            power = np.sqrt(f)
            power[0, 0] = 1
            noise = np.fft.ifft2(np.fft.fft2(noise) * power)
            noise *= scale / noise.std()
            return np.real(noise)

        def blue_noise_mask(width, height, frequency, attenuation, seed, num_masks=3):
            masks = []
            for i in range(num_masks):
                mask_seed = seed + i
                np.random.seed(mask_seed)
                mask = blue_noise(width, height, frequency, attenuation)
                masks.append(mask)
            return masks

        def blend_noise(width, height, masks, noise_types, attenuations):
            blended_image = Image.new('L', (width, height), color=0)
            fy = np.fft.fftfreq(height)[:, np.newaxis] ** 2
            fx = np.fft.fftfreq(width) ** 2
            f = fy + fx
            i = 0
            for (mask, noise_type, attenuation) in zip(masks, noise_types, attenuations):
                mask = Image.fromarray((255 * (mask - np.min(mask)) / (np.max(mask) - np.min(mask))).astype(np.uint8).real)
                if noise_type == 'white':
                    noise = white_noise(width, height)
                    noise = Image.fromarray((255 * (noise - np.min(noise)) / (np.max(noise) - np.min(noise))).astype(np.uint8).real)
                elif noise_type == 'grey':
                    noise = grey_noise(width, height, attenuation)
                    noise = Image.fromarray((255 * (noise - np.min(noise)) / (np.max(noise) - np.min(noise))).astype(np.uint8).real)
                elif noise_type == 'pink':
                    noise = pink_noise(width, height, frequency, attenuation)
                    noise = Image.fromarray((255 * (noise - np.min(noise)) / (np.max(noise) - np.min(noise))).astype(np.uint8).real)
                elif noise_type == 'green':
                    noise = green_noise(width, height, frequency, attenuation)
                    noise = Image.fromarray((255 * (noise - np.min(noise)) / (np.max(noise) - np.min(noise))).astype(np.uint8).real)
                elif noise_type == 'blue':
                    noise = blue_noise(width, height, frequency, attenuation)
                    noise = Image.fromarray((255 * (noise - np.min(noise)) / (np.max(noise) - np.min(noise))).astype(np.uint8).real)
                blended_image = Image.composite(blended_image, noise, mask)
                i += 1
            return np.asarray(blended_image)

        def shorten_to_range(value, min_value, max_value):
            range_length = max_value - min_value + 1
            return (value - min_value) % range_length + min_value
        if seed is not None:
            if seed > 4294967294:
                seed = shorten_to_range(seed, 0, 4294967293)
                cstr(f'Seed too large for power noise; rescaled to: {seed}').warning.print()
            np.random.seed(seed)
        if noise_type == 'white':
            noise = white_noise(width, height)
        elif noise_type == 'grey':
            noise = grey_noise(width, height, attenuation)
        elif noise_type == 'pink':
            if frequency is None:
                cstr('Pink noise requires a frequency value.').error.print()
                return None
            noise = pink_noise(width, height, frequency, attenuation)
        elif noise_type == 'green':
            if frequency is None:
                cstr('Green noise requires a frequency value.').error.print()
                return None
            noise = green_noise(width, height, frequency, attenuation)
        elif noise_type == 'blue':
            if frequency is None:
                cstr('Blue noise requires a frequency value.').error.print()
                return None
            noise = blue_noise(width, height, frequency, attenuation)
        elif noise_type == 'mix':
            if frequency is None:
                cstr('Mix noise requires a frequency value.').error.print()
                return None
            if seed is None:
                cstr('Mix noise requires a seed value.').error.print()
                return None
            blue_noise_masks = blue_noise_mask(width, height, frequency, attenuation, seed=seed, num_masks=3)
            noise_types = ['white', 'grey', 'pink', 'green', 'blue']
            attenuations = [attenuation] * len(noise_types)
            noise = blend_noise(width, height, blue_noise_masks, noise_types, attenuations)
        else:
            cstr(f'Unsupported noise type `{noise_type}`').error.print()
            return None
        if noise_type != 'mix':
            noise = 255 * (noise - np.min(noise)) / (np.max(noise) - np.min(noise))
        noise_image = Image.fromarray(noise.astype(np.uint8).real)
        return noise_image.convert('RGB')
```