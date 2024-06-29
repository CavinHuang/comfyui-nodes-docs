# Documentation
- Class name: LatentCompositeMasked
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentCompositeMasked节点的'composite'方法旨在将源潜在样本混合到目标潜在样本中的指定位置。它通过考虑可选的掩蔽和调整大小参数，智能地管理合成操作，以实现无缝集成。

# Input types
## Required
- destination
    - “destination”参数表示源样本将被合成的潜在样本。它对节点的操作至关重要，因为它定义了源样本混合的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- source
    - “source”参数是要放置在目标上的潜在样本。它在节点的功能中起着关键作用，因为它提供了要合成的内容。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- x
    - “x”参数指定了源样本将在目标中放置的水平位置。它很重要，因为它决定了合成操作的确切位置。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - “y”参数定义了源样本将在目标中放置的垂直位置。它是节点执行中的一个重要因素，因为它决定了合成内容的垂直放置。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- resize_source
    - “resize_source”参数是一个可选的标志，当设置为True时，在合成操作之前将源调整大小以匹配目标的尺寸。它增强了节点在处理不同潜在大小方面的灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mask
    - “mask”参数是一个可选的张量，它定义了源样本的掩码。它用于控制合成操作后源的哪些部分是可见的，在最终输出上增加了一层控制。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- composited_latent
    - “composited_latent”输出代表了合成操作后的最终潜在样本。它封装了在指定位置使用可选掩蔽和调整大小将源混合到目标中的结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LatentCompositeMasked:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'destination': ('LATENT',), 'source': ('LATENT',), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'resize_source': ('BOOLEAN', {'default': False})}, 'optional': {'mask': ('MASK',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'composite'
    CATEGORY = 'latent'

    def composite(self, destination, source, x, y, resize_source, mask=None):
        output = destination.copy()
        destination = destination['samples'].clone()
        source = source['samples']
        output['samples'] = composite(destination, source, x, y, mask, 8, resize_source)
        return (output,)
```