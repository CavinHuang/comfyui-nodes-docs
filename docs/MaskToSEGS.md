# Documentation
- Class name: MaskToSEGS
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

MaskToSEGS节点旨在将二进制掩码转换为由SEG对象表示的一系列分段对象。它处理输入掩码以识别不同区域，并将它们输出为分段对象的集合，这些对象可以进一步用于各种图像处理任务。

# Input types
## Required
- mask
    - 掩码参数是一个二进制掩码，它定义了图像内的感兴趣区域。它对节点的操作至关重要，因为它直接影响分割过程和生成的SEG对象。
    - Comfy dtype: MASK
    - Python dtype: np.ndarray
## Optional
- combined
    - combined参数决定节点是否应将掩码中的重叠区域合并为单个SEG对象。这对于简化复杂场景的表示可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- crop_factor
    - crop_factor参数控制每个掩码段的边界框周围的裁剪区域的大小。它通过确定每个段周围包含多少上下文，影响SEG对象的细节级别。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_fill
    - bbox_fill参数指定是否应在裁剪区域内用实心值填充边界框。这可以用来突出显示或隔离SEG对象内的特定区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- drop_size
    - drop_size参数设置将包含在输出中的掩码段的最小尺寸。不满足此尺寸阈值的较小段将被丢弃，可能会减少分割中的噪声。
    - Comfy dtype: INT
    - Python dtype: int
- contour_fill
    - contour_fill参数指示节点是否应填充掩码轮廓内的区域。这可以用来从基于轮廓的掩码创建实心SEG对象。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- SEGS
    - SEGS输出包含一系列SEG对象，每个对象代表从输入掩码派生的分段区域。这些对象被结构化，以便在图像处理工作流程中进一步分析或操作。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[int, List[core.SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class MaskToSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'combined': ('BOOLEAN', {'default': False, 'label_on': 'True', 'label_off': 'False'}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'bbox_fill': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'contour_fill': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'})}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, mask, combined, crop_factor, bbox_fill, drop_size, contour_fill=False):
        mask = make_2d_mask(mask)
        result = core.mask_to_segs(mask, combined, crop_factor, bbox_fill, drop_size, is_contour=contour_fill)
        return (result,)
```