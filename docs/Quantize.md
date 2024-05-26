# Documentation
- Class name: Quantize
- Category: postprocessing/Color Adjustments
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

Quantize节点旨在减少图像中的颜色数量，这个过程被称为颜色量化。它通过将图像的颜色映射到指定数量的颜色来实现这一点，这对于创造更加风格化或复古的外观非常有用。该节点还提供了应用抖动的选项，这有助于平滑颜色之间的过渡，减少颜色条纹的出现。

# Input types
## Required
- image
    - 图像参数是表示要量化的图像的输入张量。它在节点的操作中起着至关重要的作用，因为整个量化过程都应用于此图像。量化图像的质量和特性在很大程度上取决于输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- colors
    - 颜色参数指定将图像减少到的颜色数量。这是一个重要的设置，因为它直接影响量化图像的细节水平和外观。颜色数量越多，保留的细节越多，但会导致文件大小更大。
    - Comfy dtype: INT
    - Python dtype: int
- dither
    - 抖动参数决定在量化过程中是否对图像应用抖动算法。抖动可以通过减少颜色条纹的可见性来帮助创建更具有视觉吸引力的结果。在'none'和'floyd-steinberg'之间的选择会影响最终图像的质量。
    - Comfy dtype: COMBO[none, floyd-steinberg]
    - Python dtype: str

# Output types
- quantized_image
    - 量化图像输出是颜色量化过程的结果。它是一个张量，代表具有减少颜色数量的图像。这个输出很重要，因为它是节点操作的直接结果，可以用于进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Quantize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'colors': ('INT', {'default': 256, 'min': 1, 'max': 256, 'step': 1}), 'dither': (['none', 'floyd-steinberg'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'quantize'
    CATEGORY = 'postprocessing/Color Adjustments'

    def quantize(self, image: torch.Tensor, colors: int=256, dither: str='FLOYDSTEINBERG'):
        (batch_size, height, width, _) = image.shape
        result = torch.zeros_like(image)
        dither_option = Image.Dither.FLOYDSTEINBERG if dither == 'floyd-steinberg' else Image.Dither.NONE
        for b in range(batch_size):
            tensor_image = image[b]
            img = (tensor_image * 255).to(torch.uint8).numpy()
            pil_image = Image.fromarray(img, mode='RGB')
            palette = pil_image.quantize(colors=colors)
            quantized_image = pil_image.quantize(colors=colors, palette=palette, dither=dither_option)
            quantized_array = torch.tensor(np.array(quantized_image.convert('RGB'))).float() / 255
            result[b] = quantized_array
        return (result,)
```