# Documentation
- Class name: GaussianBlurMaskInSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

GaussianBlurMaskInSEGS节点对SEG对象列表中每个段的掩码部分应用高斯模糊。这个操作增强了掩码边缘的平滑度，对于某些需要更扩散掩码的图像分割任务来说，这可能是有益的。

# Input types
## Required
- segs
    - segs参数是节点将处理的SEG对象列表。每个SEG对象包含图像数据、掩码和其他对节点操作至关重要的相关信息。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- kernel_size
    - kernel_size参数决定了高斯模糊核的大小。较大的核大小会导致更明显的模糊效果，这可以更显著地平滑掩码边缘。
    - Comfy dtype: INT
    - Python dtype: int
- sigma
    - sigma参数控制高斯核的标准差，影响模糊的范围。较高的sigma值将产生更强的模糊，而较低的值将导致更温和的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- segs
    - 输出的segs是原始SEG对象，它们的掩码已经通过高斯模糊操作进行了修改。这允许对平滑后的掩码数据进行后续处理或分析。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[List[SEG], List[SEG]]

# Usage tips
- Infra type: GPU

# Source code
```
class GaussianBlurMaskInSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'kernel_size': ('INT', {'default': 10, 'min': 0, 'max': 100, 'step': 1}), 'sigma': ('FLOAT', {'default': 10.0, 'min': 0.1, 'max': 100.0, 'step': 0.1})}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, kernel_size, sigma):
        new_segs = []
        for seg in segs[1]:
            mask = utils.tensor_gaussian_blur_mask(seg.cropped_mask, kernel_size, sigma)
            mask = torch.squeeze(mask, dim=-1).squeeze(0).numpy()
            seg = SEG(seg.cropped_image, mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
            new_segs.append(seg)
        return ((segs[0], new_segs),)
```