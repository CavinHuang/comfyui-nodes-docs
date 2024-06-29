# Documentation
- Class name: InvertMask
- Category: segment_anything
- Output node: False
- Repo Ref: https://github.com/storyicon/comfyui_segment_anything

InvertMask节点旨在反转二值掩码的值。它在各种图像分割任务中扮演着关键角色，其中反转掩码以突出不同的兴趣区域是必要的。该节点通过从输入掩码中减去1来操作，有效地翻转掩码的极性。

# Input types
## Required
- mask
    - ‘mask’参数是一个二值掩码，节点将对其进行反转。它对节点的操作至关重要，因为它直接决定了输出。反转后的掩码用于识别或隔离图像中的某些区域，这对于分割目的至关重要。
    - Comfy dtype: np.ndarray
    - Python dtype: numpy.ndarray

# Output types
- MASK
    - ‘MASK’输出是输入掩码的反转版本。它很重要，因为它代表了节点操作的结果，提供了一个具有反转值的二进制掩码，可以用于分割工作流中的进一步处理或分析。
    - Comfy dtype: np.ndarray
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class InvertMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',)}}
    CATEGORY = 'segment_anything'
    FUNCTION = 'main'
    RETURN_TYPES = ('MASK',)

    def main(self, mask):
        out = 1.0 - mask
        return (out,)
```