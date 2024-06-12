# Documentation
- Class name: ImageCompositeMasked
- Category: image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageCompositeMasked 节点的 'composite' 方法旨在将源图像无缝地合成到目标图像的指定位置，可选择使用遮罩来定义混合区域。它通过允许精确控制图像组合，为整体图像编辑过程做出了贡献。

# Input types
## Required
- destination
    - 目标图像作为合成源图像的基础。这是一个关键参数，因为它决定了合成发生的画布。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- source
    - 将放置在目标图像上的源图像。它在组合过程中起着重要作用，因为它是被操作的主要视觉元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- x
    - x坐标决定了源图像在目标图像上的水平位置。这是一个重要参数，因为它控制了源图像在目标图像中的对齐方式。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - y坐标指定了源图像在目标图像上的垂直位置。它对于控制源图像在组合中的垂直放置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- resize_source
    - 'resize_source' 参数决定源图像是否应调整大小以适应目标图像的尺寸。它在调整源图像在组合中的规模方面很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mask
    - 可选的遮罩参数允许指定源图像中应在合成中可见的区域。它适用于创建只有源图像的某些部分需要显示的复杂图像组合。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- output
    - 'composite' 方法的输出是最终合成的图像，它是在指定位置和可选遮罩的影响下将源图像合成到目标图像的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ImageCompositeMasked:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'destination': ('IMAGE',), 'source': ('IMAGE',), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'resize_source': ('BOOLEAN', {'default': False})}, 'optional': {'mask': ('MASK',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'composite'
    CATEGORY = 'image'

    def composite(self, destination, source, x, y, resize_source, mask=None):
        destination = destination.clone().movedim(-1, 1)
        output = composite(destination, source.movedim(-1, 1), x, y, mask, 1, resize_source).movedim(1, -1)
        return (output,)
```