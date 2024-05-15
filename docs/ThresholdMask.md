# Documentation
- Class name: ThresholdMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ThresholdMask节点旨在根据指定的阈值将图像转换为二进制掩码。它在图像分割任务中起着关键作用，通过确定哪些像素属于感兴趣的对象，哪些不属于。该节点通过应用二进制分类简化了图像的复杂性，从而促进了下游处理和分析。

# Input types
## Required
- mask
    - ‘mask’参数是需要进行阈值处理的输入图像。它对节点的操作至关重要，因为它直接影响输出掩码的质量和准确性。参数的值基于提供的阈值决定了哪些像素被包含在最终掩码中。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- value
    - ‘value’参数设置了掩码转换的阈值。它非常重要，因为它决定了像素包含在掩码中的截止点。较高的值将导致一个更保守的掩码，包含较少的像素，而较低的值将包含更多的像素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- mask
    - 输出‘mask’是输入图像的二进制表示，其中像素被分类为属于对象或不属于对象，这基于阈值。这个二进制掩码对于图像处理工作流中的对象检测和分割等应用至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ThresholdMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'value': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'image_to_mask'

    def image_to_mask(self, mask, value):
        mask = (mask > value).float()
        return (mask,)
```