# Documentation
- Class name: UpscaleTileCalculator
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

UpscaleTileCalculator节点旨在高效计算和管理图像的上采样操作中的平铺。它提供了一种方法，根据图像分辨率和指定的平铺分辨率来确定最优的平铺尺寸，确保上采样后的图像保持其完整性和质量。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它代表了将要被处理的输入图像。它是影响节点执行和平铺计算结果的基础元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- tile_resolution
    - tile_resolution参数定义了图像每个平铺的期望分辨率。它在确定平铺尺寸方面起着关键作用，因此影响上采样过程的效率和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 上采样后的图像是节点的主要输出，代表上采样操作的处理结果。它标志着节点在提高图像质量方面的功能性成功。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- tile_width
    - tile_width参数指示上采样过程后每个平铺计算出的宽度。它很重要，因为它提供了操作中使用的平铺的空间尺寸信息。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - tile_height参数指定上采样过程后每个平铺计算出的高度。与tile_width一起，它决定了平铺的整体结构，对于理解节点的输出至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class UpscaleTileCalculator:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'tile_resolution': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 8})}}
    RETURN_TYPES = ('IMAGE', 'INT', 'INT')
    RETURN_NAMES = ('image', 'tile_width', 'tile_height')
    FUNCTION = 'calculate'
    CATEGORY = 'Mikey/Image'

    def upscale(self, image, upscale_method, width, height, crop):
        samples = image.movedim(-1, 1)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
        s = s.movedim(1, -1)
        return (s,)

    def resize(self, image, width, height, upscale_method, crop):
        (w, h) = find_latent_size(image.shape[2], image.shape[1])
        img = self.upscale(image, upscale_method, w, h, crop)[0]
        return (img,)

    def calculate(self, image, tile_resolution):
        (width, height) = (image.shape[2], image.shape[1])
        (tile_width, tile_height) = find_tile_dimensions(width, height, 1.0, tile_resolution)
        return (image, tile_width, tile_height)
```