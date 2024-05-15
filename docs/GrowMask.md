# Documentation
- Class name: GrowMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GrowMask节点旨在通过扩展或侵蚀其边界来操作二进制掩码。它为掩码修改提供了高级功能，这对于需要精确控制掩蔽区域形状和大小的应用程序至关重要。

# Input types
## Required
- mask
    - ‘mask’参数是要被扩展或侵蚀的二进制掩码。它在节点的操作中扮演中心角色，因为它直接影响掩码的输出形状和质量。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- expand
    - ‘expand’参数确定应用于掩码的扩展或侵蚀量。正值会导致膨胀，而负值则导致侵蚀。它显著影响最终掩码的尺寸和细节。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- tapered_corners
    - 当设置为True时，‘tapered_corners’参数将特定的侵蚀模式应用于掩码的角落。这对于实现具有圆角的视觉吸引力掩码形状很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- expanded_mask
    - ‘expanded_mask’输出是掩码扩展或侵蚀过程的结果。它很重要，因为它代表了节点操作后掩码的最终状态。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GrowMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',), 'expand': ('INT', {'default': 0, 'min': -MAX_RESOLUTION, 'max': MAX_RESOLUTION, 'step': 1}), 'tapered_corners': ('BOOLEAN', {'default': True})}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'expand_mask'

    def expand_mask(self, mask, expand, tapered_corners):
        c = 0 if tapered_corners else 1
        kernel = np.array([[c, 1, c], [1, 1, 1], [c, 1, c]])
        mask = mask.reshape((-1, mask.shape[-2], mask.shape[-1]))
        out = []
        for m in mask:
            output = m.numpy()
            for _ in range(abs(expand)):
                if expand < 0:
                    output = scipy.ndimage.grey_erosion(output, footprint=kernel)
                else:
                    output = scipy.ndimage.grey_dilation(output, footprint=kernel)
            output = torch.from_numpy(output)
            out.append(output)
        return (torch.stack(out, dim=0),)
```