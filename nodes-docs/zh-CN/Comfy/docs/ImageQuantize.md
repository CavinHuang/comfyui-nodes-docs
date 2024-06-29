# Documentation
- Class name: Quantize
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Quantize节点旨在减少图像中使用的颜色数量，这个过程被称为颜色量化。它通过将给定图像中的连续颜色范围映射到有限数量颜色的指定调色板来实现这一点。节点支持多种抖动技术来提高量化图像的视觉质量，例如Floyd-Steinberg抖动和不同阶数的拜耳抖动。节点的功能对于希望减少颜色深度的应用至关重要，例如在创建较小图像文件或与某些显示技术兼容时。

# Input types
## Required
- image
    - 图像参数是表示要量化的图像的输入张量。它是整个过程中的关键部分，因为整个过程都围绕着减少这张图像的颜色调色板。图像张量应该是RGB格式，并且预期是规范化在0到1之间的浮点表示。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- colors
    - 颜色参数指定将图像调色板减少到的颜色数量。它在确定量化图像的最终质量和文件大小方面起着重要作用。颜色数量较少将导致文件大小的明显减少，但也可能导致图像细节的损失。
    - Comfy dtype: int
    - Python dtype: int
## Optional
- dither
    - 抖动参数决定了在量化过程中要应用的抖动技术。抖动可以通过分散量化误差来帮助创建更令人愉悦的视觉效果。可用的选项包括'none'、'floyd-steinberg'以及各种阶数的'bayer'抖动。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- quantized_image
    - 量化图像输出是颜色量化过程的结果。它是一个张量，代表具有减少颜色调色板的图像。这个输出张量对于进一步处理或以支持减少颜色深度的格式保存图像至关重要。
    - Comfy dtype: torch.Tensor
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
        return {'required': {'image': ('IMAGE',), 'colors': ('INT', {'default': 256, 'min': 1, 'max': 256, 'step': 1}), 'dither': (['none', 'floyd-steinberg', 'bayer-2', 'bayer-4', 'bayer-8', 'bayer-16'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'quantize'
    CATEGORY = 'image/postprocessing'

    def bayer(im, pal_im, order):

        def normalized_bayer_matrix(n):
            if n == 0:
                return np.zeros((1, 1), 'float32')
            else:
                q = 4 ** n
                m = q * normalized_bayer_matrix(n - 1)
                return np.bmat(((m - 1.5, m + 0.5), (m + 1.5, m - 0.5))) / q
        num_colors = len(pal_im.getpalette()) // 3
        spread = 2 * 256 / num_colors
        bayer_n = int(math.log2(order))
        bayer_matrix = torch.from_numpy(spread * normalized_bayer_matrix(bayer_n) + 0.5)
        result = torch.from_numpy(np.array(im).astype(np.float32))
        tw = math.ceil(result.shape[0] / bayer_matrix.shape[0])
        th = math.ceil(result.shape[1] / bayer_matrix.shape[1])
        tiled_matrix = bayer_matrix.tile(tw, th).unsqueeze(-1)
        result.add_(tiled_matrix[:result.shape[0], :result.shape[1]]).clamp_(0, 255)
        result = result.to(dtype=torch.uint8)
        im = Image.fromarray(result.cpu().numpy())
        im = im.quantize(palette=pal_im, dither=Image.Dither.NONE)
        return im

    def quantize(self, image: torch.Tensor, colors: int, dither: str):
        (batch_size, height, width, _) = image.shape
        result = torch.zeros_like(image)
        for b in range(batch_size):
            im = Image.fromarray((image[b] * 255).to(torch.uint8).numpy(), mode='RGB')
            pal_im = im.quantize(colors=colors)
            if dither == 'none':
                quantized_image = im.quantize(palette=pal_im, dither=Image.Dither.NONE)
            elif dither == 'floyd-steinberg':
                quantized_image = im.quantize(palette=pal_im, dither=Image.Dither.FLOYDSTEINBERG)
            elif dither.startswith('bayer'):
                order = int(dither.split('-')[-1])
                quantized_image = Quantize.bayer(im, pal_im, order)
            quantized_array = torch.tensor(np.array(quantized_image.convert('RGB'))).float() / 255
            result[b] = quantized_array
        return (result,)
```