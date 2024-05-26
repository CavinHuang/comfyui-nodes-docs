# Documentation
- Class name: SineWave
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

SineWave类引入了一种方法，对图像应用正弦波扭曲效果，通过模拟波浪状图案增强其视觉外观。这种方法旨在以创造性的方式操纵图像数据，引入艺术性的改变，而不损害原始内容的完整性。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是节点操作的主要输入。它是应用正弦波效果的媒介，其属性直接影响扭曲结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- amplitude
    - 振幅决定了正弦波效果的强度，控制应用于图像的扭曲程度。它是塑造节点执行视觉结果的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frequency
    - 频率决定了单位图像空间内的正弦波周期数，影响扭曲的粒度。它在定义图案的外观中起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- direction
    - 方向指定了正弦波效果的方向，水平或垂直，这决定了扭曲如何应用于图像。
    - Comfy dtype: COMBO['horizontal', 'vertical']
    - Python dtype: str

# Output types
- output_image
    - 输出图像是应用于输入图像的正弦波效果的结果。它代表了转换，是节点的主要输出，包含了创造性的扭曲。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SineWave:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'amplitude': ('FLOAT', {'default': 10, 'min': 0, 'max': 150, 'step': 5}), 'frequency': ('FLOAT', {'default': 5, 'min': 0, 'max': 20, 'step': 1}), 'direction': (['horizontal', 'vertical'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_sine_wave'
    CATEGORY = 'postprocessing/Effects'

    def apply_sine_wave(self, image: torch.Tensor, amplitude: float, frequency: float, direction: str):
        (batch_size, height, width, channels) = image.shape
        result = torch.zeros_like(image)
        for b in range(batch_size):
            tensor_image = image[b]
            result[b] = self.sine_wave_effect(tensor_image, amplitude, frequency, direction)
        return (result,)

    def sine_wave_effect(self, image: torch.Tensor, amplitude: float, frequency: float, direction: str):
        (height, width, _) = image.shape
        shifted_image = torch.zeros_like(image)
        for channel in range(3):
            if direction == 'horizontal':
                for i in range(height):
                    offset = int(amplitude * np.sin(2 * torch.pi * i * frequency / height))
                    shifted_image[i, :, channel] = torch.roll(image[i, :, channel], offset)
            elif direction == 'vertical':
                for j in range(width):
                    offset = int(amplitude * np.sin(2 * torch.pi * j * frequency / width))
                    shifted_image[:, j, channel] = torch.roll(image[:, j, channel], offset)
        return shifted_image
```