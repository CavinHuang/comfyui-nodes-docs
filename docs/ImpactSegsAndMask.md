# Documentation
- Class name: SegsBitwiseAndMask
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SegsBitwiseAndMask节点的'doit'方法对提供的分割（segs）和掩码进行按位与操作，生成仅包含分割和掩码重叠区域的精炼分割。此操作对于需要精确空间过滤的应用至关重要，例如在医学成像或在图像的特定区域内进行对象检测。

# Input types
## Required
- segs
    - 'segs'参数是节点将要处理的分割对象集合。它对于定义将通过按位与操作与掩码结合的初始分割至关重要。'segs'的质量和准确性直接影响节点操作的结果。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- mask
    - 'mask'参数是一个二进制掩码，将用于过滤'segs'提供的分割。它是一个关键组件，因为它决定了按位与操作后将保留的分割区域。掩码应准确定义以确保所需的过滤效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- result
    - 'result'输出是经过与提供的掩码进行按位与操作过滤后的精炼分割集合。它代表了节点的最终输出，其中仅包含符合掩码标准的分割区域。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[List[SEG], List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SegsBitwiseAndMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, segs, mask):
        return (core.segs_bitwise_and_mask(segs, mask),)
```