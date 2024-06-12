# Documentation
- Class name: SAMDetectorCombined
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SAMDetectorCombined节点旨在使用SAM（Segment Anything Model）检测和分割图像中的物体。它使用指定的SAM模型、分割提示和其他参数处理输入图像，以生成勾勒出检测到的物体的掩码。该节点对于需要精确物体定位和分割的应用程序至关重要，例如在计算机视觉和图像分析任务中。

# Input types
## Required
- sam_model
    - SAM模型参数对于节点的操作至关重要，因为它定义了将用于对象检测和分割的模型。模型的选择直接影响节点准确识别和分割图像中对象的能力。
    - Comfy dtype: SAM_MODEL
    - Python dtype: torch.nn.Module
- segs
    - segs参数提供分割提示，指导SAM模型检测图像中的特定区域。这些提示对于提高分割过程的准确性至关重要，特别是在具有多个对象的复杂场景中。
    - Comfy dtype: SEGS
    - Python dtype: List[impact.core.SEG]
- image
    - 图像参数是节点的输入，对于检测过程是必需的。图像的质量和分辨率直接影响节点在检测和分割对象方面的性能。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- detection_hint
    - 检测提示参数允许指定要使用的检测策略类型。它影响SAM模型如何解释和处理分割提示，从而影响对象检测的结果。
    - Comfy dtype: COMBO['center-1', 'horizontal-2', 'vertical-2', 'rect-4', 'diamond-4', 'mask-area', 'mask-points', 'mask-point-bbox', 'none']
    - Python dtype: str
- dilation
    - 膨胀参数用于控制检测到的对象周围的边界框的扩展。它在分割掩码的后处理中起着重要作用，可能改善掩码对对象的覆盖。
    - Comfy dtype: INT
    - Python dtype: int
- threshold
    - 阈值参数对于确定将对象视为已检测的置信度水平至关重要。它直接影响节点在图像中识别对象的敏感性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_expansion
    - bbox_expansion参数定义了要应用于检测到的对象的边界框的扩展量。这有助于调整分割掩码围绕对象的紧密度。
    - Comfy dtype: INT
    - Python dtype: int
- mask_hint_threshold
    - mask_hint_threshold参数用于设置分割过程中使用掩码提示的阈值。它影响节点在识别对象边界时对掩码提示的依赖。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mask_hint_use_negative
    - mask_hint_use_negative参数决定了分割过程中如何使用负提示。它可以增强节点区分对象和背景的能力。
    - Comfy dtype: COMBO['False', 'Small', 'Outter']
    - Python dtype: str

# Output types
- MASK
    - MASK输出提供了检测和分割过程后的最终分割掩码。它是进一步分析或用于需要对象分割的下游任务的关键输出。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SAMDetectorCombined:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sam_model': ('SAM_MODEL',), 'segs': ('SEGS',), 'image': ('IMAGE',), 'detection_hint': (['center-1', 'horizontal-2', 'vertical-2', 'rect-4', 'diamond-4', 'mask-area', 'mask-points', 'mask-point-bbox', 'none'],), 'dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'threshold': ('FLOAT', {'default': 0.93, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'bbox_expansion': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1}), 'mask_hint_threshold': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'mask_hint_use_negative': (['False', 'Small', 'Outter'],)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    def doit(self, sam_model, segs, image, detection_hint, dilation, threshold, bbox_expansion, mask_hint_threshold, mask_hint_use_negative):
        return (core.make_sam_mask(sam_model, segs, image, detection_hint, dilation, threshold, bbox_expansion, mask_hint_threshold, mask_hint_use_negative),)
```