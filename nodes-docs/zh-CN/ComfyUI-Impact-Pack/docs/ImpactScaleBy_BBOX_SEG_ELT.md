# Documentation
- Class name: SEG_ELT_BBOX_ScaleBy
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEG_ELT_BBOX_ScaleBy 节点旨在通过指定的因子调整分割元素（SEG_ELT）的规模。它通过缩放 SEG_ELT 的边界框，然后应用零填充到掩码上，以保持分割的完整性。这个节点对于调整分割的大小而不丢失任何细节或引入伪影至关重要。

# Input types
## Required
- seg
    - 'seg' 参数是需要缩放的分割元素（SEG_ELT）。它非常重要，因为它定义了节点操作的输入数据，并直接影响输出分割的尺寸和属性。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG_ELT
- scale_by
    - 'scale_by' 参数决定了 SEG_ELT 的边界框的缩放因子。它是一个浮点数，用于调整分割元素的大小，对最终输出的分辨率和覆盖范围有影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- scaled_seg
    - 'scaled_seg' 输出是将缩放操作应用于输入 SEG_ELT 的结果。它包括缩放后的边界框和调整后的掩码，确保分割被正确地调整大小，并且在过程中没有丢失信息。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG_ELT

# Usage tips
- Infra type: CPU

# Source code
```
class SEG_ELT_BBOX_ScaleBy:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seg': ('SEG_ELT',), 'scale_by': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 8.0, 'step': 0.01})}}
    RETURN_TYPES = ('SEG_ELT',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    @staticmethod
    def fill_zero_outside_bbox(mask, crop_region, bbox):
        (cx1, cy1, _, _) = crop_region
        (x1, y1, x2, y2) = bbox
        (x1, y1, x2, y2) = (x1 - cx1, y1 - cy1, x2 - cx1, y2 - cy1)
        (h, w) = mask.shape
        x1 = min(w - 1, max(0, x1))
        x2 = min(w - 1, max(0, x2))
        y1 = min(h - 1, max(0, y1))
        y2 = min(h - 1, max(0, y2))
        mask_cropped = mask.copy()
        mask_cropped[:, :x1] = 0
        mask_cropped[:, x2:] = 0
        mask_cropped[:y1, :] = 0
        mask_cropped[y2:, :] = 0
        return mask_cropped

    def doit(self, seg, scale_by):
        (x1, y1, x2, y2) = seg.bbox
        w = x2 - x1
        h = y2 - y1
        dw = int((w * scale_by - w) / 2)
        dh = int((h * scale_by - h) / 2)
        bbox = (x1 - dw, y1 - dh, x2 + dw, y2 + dh)
        cropped_mask = SEG_ELT_BBOX_ScaleBy.fill_zero_outside_bbox(seg.cropped_mask, seg.crop_region, bbox)
        seg = SEG(seg.cropped_image, cropped_mask, seg.confidence, seg.crop_region, bbox, seg.label, seg.control_net_wrapper)
        return (seg,)
```