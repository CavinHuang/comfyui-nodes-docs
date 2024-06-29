# Documentation
- Class name: MaskToSEGS_for_AnimateDiff
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

MaskToSEGS_for_AnimateDiff 节点旨在将二进制掩码转换为一组分段对象，称为 SEGS。它通过利用系统的核心功能来识别和分离掩码内的不同区域来执行此转换。该节点对于需要将掩码数据转换为可以进一步处理或分析以进行详细操作的格式的应用程序特别有用。

# Input types
## Required
- mask
    - 掩码参数是节点的关键输入，因为它定义了要从中执行分割的二进制掩码。掩码的质量和准确性直接影响结果的分割，使其成为节点执行的重要组成部分。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- combined
    - combined 参数决定节点是否应将掩码视为单个实体还是作为单独的段。这个决定影响分割的处理方式，并根据不同任务的具体需求可能导致不同的结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- crop_factor
    - crop_factor 参数用于定义掩码内裁剪区域的大小。它在分割过程中起着重要作用，通过控制从掩码中提取的细节的规模。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_fill
    - bbox_fill 参数是一个可选设置，当启用时，它填充掩码内的边界框区域。在某些应用中，填充的边界框的存在对于进一步分析或处理是必要的，这可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- drop_size
    - drop_size 参数指定要考虑进行分割的区域的最小尺寸。它确保只有大于某个尺寸阈值的区域包含在最终的分割中，这有助于过滤掉噪声或不相关的细节。
    - Comfy dtype: INT
    - Python dtype: int
- contour_fill
    - contour_fill 参数指示节点是否应填充掩码内的轮廓。这对于需要在后续操作中对分段区域进行实心填充的应用程序非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- SEGS
    - SEGS 输出代表分割过程的结果，提供了原始掩码内不同区域的详细分解。这个输出对于进一步分析或操作分割数据至关重要。
    - Comfy dtype: SEGS
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class MaskToSEGS_for_AnimateDiff:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'combined': ('BOOLEAN', {'default': False, 'label_on': 'True', 'label_off': 'False'}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'bbox_fill': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'contour_fill': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'})}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, mask, combined, crop_factor, bbox_fill, drop_size, contour_fill=False):
        mask = make_2d_mask(mask)
        segs = core.mask_to_segs(mask, combined, crop_factor, bbox_fill, drop_size, is_contour=contour_fill)
        all_masks = SEGSToMaskList().doit(segs)[0]
        result_mask = (all_masks[0] * 255).to(torch.uint8)
        for mask in all_masks[1:]:
            result_mask |= (mask * 255).to(torch.uint8)
        result_mask = (result_mask / 255.0).to(torch.float32)
        result_mask = utils.to_binary_mask(result_mask, 0.1)[0]
        return MaskToSEGS().doit(result_mask, False, crop_factor, False, drop_size, contour_fill)
```