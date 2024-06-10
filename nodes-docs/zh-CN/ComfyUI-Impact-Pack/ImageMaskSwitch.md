# Documentation
- Class name: ImageMaskSwitch
- Category: ImpactPack/Util
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImageMaskSwitch节点旨在根据选择参数选择性地路由图像和掩码输入。它便于在进一步处理或分析中选择多个图像-掩码对，确保只有所需的对被传递到工作流程中。

# Input types
## Required
- select
    - 'select'参数决定将使用哪组图像-掩码对。它至关重要，因为它根据其整数值直接通过选择适当的对来影响节点的输出。
    - Comfy dtype: INT
    - Python dtype: int
- images1
    - 'images1'参数表示要考虑用于开关操作的第一组图像。当'select'设置为1时，它在节点的功能中扮演重要角色，因为它将变成输出的图像集。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
## Optional
- mask1_opt
    - 'mask1_opt'参数是对应于'images1'的可选掩码。当'select'为1并且希望在输出中包含图像的掩码时，它变得相关。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image or torch.Tensor
- images2_opt
    - 'images2_opt'参数表示开关操作的第二组可选图像。当'select'设置为2并且需要替代图像集作为输出时使用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- mask2_opt
    - 'mask2_opt'参数是对应于'images2_opt'的可选掩码。当'select'为2并且输出需要与图像一起的掩码时，会考虑它。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image or torch.Tensor
- images3_opt
    - 'images3_opt'参数表示开关操作的第三组可选图像。当'select'设置为3并且需要第三组图像作为输出时使用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- mask3_opt
    - 'mask3_opt'参数是对应于'images3_opt'的可选掩码。当'select'为3并且输出需要与图像一起的掩码时，会使用它。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image or torch.Tensor
- images4_opt
    - 'images4_opt'参数表示开关操作的第四组可选图像。当'select'设置为4并且需要第四组图像作为输出时使用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- mask4_opt
    - 'mask4_opt'参数是对应于'images4_opt'的可选掩码。当'select'为4并且希望在输出中包含图像的掩码时，会考虑它。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image or torch.Tensor

# Output types
- IMAGE
    - 输出'IMAGE'代表基于'select'输入参数选择的图像集。它是节点功能的关键元素，因为它决定了系统内视觉数据的流向。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- MASK
    - 输出'MASK'对应于所选图像集的掩码。当需要与图像一起进行分析或处理时，它很重要。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image or torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageMaskSwitch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'select': ('INT', {'default': 1, 'min': 1, 'max': 4, 'step': 1}), 'images1': ('IMAGE',)}, 'optional': {'mask1_opt': ('MASK',), 'images2_opt': ('IMAGE',), 'mask2_opt': ('MASK',), 'images3_opt': ('IMAGE',), 'mask3_opt': ('MASK',), 'images4_opt': ('IMAGE',), 'mask4_opt': ('MASK',)}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    OUTPUT_NODE = True
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, select, images1, mask1_opt=None, images2_opt=None, mask2_opt=None, images3_opt=None, mask3_opt=None, images4_opt=None, mask4_opt=None):
        if select == 1:
            return (images1, mask1_opt)
        elif select == 2:
            return (images2_opt, mask2_opt)
        elif select == 3:
            return (images3_opt, mask3_opt)
        else:
            return (images4_opt, mask4_opt)
```