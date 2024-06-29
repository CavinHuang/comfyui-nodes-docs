# Documentation
- Class name: DilateMask
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DilateMask节点旨在对二进制掩码执行形态学膨胀，扩展掩码前景对象的边界。它特别适用于通过增加分段区域的大小来细化分割掩码，这对于对象检测和分割细化等任务非常有益。

# Input types
## Required
- mask
    - ‘mask’参数是一个二进制掩码，定义了图像内的兴趣区域。它对于膨胀过程至关重要，因为它决定了哪些区域将被扩展。膨胀结果的质量在很大程度上取决于输入掩码的准确性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- dilation
    - ‘dilation’参数指定要应用于掩码的膨胀量。正值会导致掩码边缘扩展，而负值会导致它们收缩。这个参数对于控制膨胀效果的范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- dilated_mask
    - ‘dilated_mask’输出是将膨胀操作应用于输入掩码的结果。它是一个二进制掩码，其中前景对象已根据指定的膨胀因子进行了扩展。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class DilateMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'dilation': ('INT', {'default': 10, 'min': -512, 'max': 512, 'step': 1})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, mask, dilation):
        mask = core.dilate_mask(mask.numpy(), dilation)
        mask = torch.from_numpy(mask)
        mask = utils.make_3d_mask(mask)
        return (mask,)
```