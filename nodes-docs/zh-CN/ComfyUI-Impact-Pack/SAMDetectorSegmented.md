# Documentation
- Class name: SAMDetectorSegmented
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SAMDetectorSegmented节点旨在使用SAM（分割和掩蔽）模型检测和分割图像中的物体。它处理输入图像和分割提示，生成一个组合掩蔽和一个单独掩蔽的批次，这对于在ImpactPack框架内进行进一步分析和操作至关重要。

# Input types
## Required
- sam_model
    - SAM模型参数至关重要，因为它定义了将用于分割任务的机器学习模型。它直接影响节点准确检测和分割图像中对象的能力。
    - Comfy dtype: SAM_MODEL
    - Python dtype: torch.nn.Module
- segs
    - segs参数包含分割提示，指导SAM模型检测图像中的特定区域。它通过将检测过程集中在感兴趣的区域上，在提高节点性能方面发挥着重要作用。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- image
    - 图像参数是节点处理的输入。它是分割和检测任务的主要数据源，是节点功能的基本方面。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- detection_hint
    - 检测提示参数提供了一种细化检测过程的方法。它允许指定不同的检测策略，这对于根据输入图像的特性优化节点性能至关重要。
    - Comfy dtype: COMBO['center-1', 'horizontal-2', 'vertical-2', 'rect-4', 'diamond-4', 'mask-area', 'mask-points', 'mask-point-bbox', 'none']
    - Python dtype: str
- dilation
    - 膨胀参数用于控制检测到的掩蔽的扩展。它对于调整节点的输出以更好地适应后续处理步骤的要求可能是重要的。
    - Comfy dtype: INT
    - Python dtype: int
- threshold
    - 阈值参数决定了检测被认为是有效的置信度水平。它是控制节点操作中精确度和召回率平衡的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_expansion
    - bbox_expansion参数允许扩展检测过程中使用的边界框。这对于确保检测到的掩蔽包含整个感兴趣的对象可能是有用的。
    - Comfy dtype: INT
    - Python dtype: int
- mask_hint_threshold
    - mask_hint_threshold参数用于设置掩蔽提示的敏感度。它影响节点如何解释和响应提供的分割提示，影响分割的质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mask_hint_use_negative
    - mask_hint_use_negative参数指定应如何使用负掩蔽提示。它可能显著影响节点区分图像中的对象和背景的能力。
    - Comfy dtype: COMBO['False', 'Small', 'Outter']
    - Python dtype: str

# Output types
- combined_mask
    - combined_mask输出参数代表分割过程的聚合结果。它是一个包含所有检测到的对象的单一掩蔽，提供了分割结果的整合视图。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- batch_masks
    - batch_masks输出参数提供了一个对应于每个检测到的对象的单独掩蔽的数组。这允许在分割上下文中对每个对象进行详细的分析和操作。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SAMDetectorSegmented:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sam_model': ('SAM_MODEL',), 'segs': ('SEGS',), 'image': ('IMAGE',), 'detection_hint': (['center-1', 'horizontal-2', 'vertical-2', 'rect-4', 'diamond-4', 'mask-area', 'mask-points', 'mask-point-bbox', 'none'],), 'dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'threshold': ('FLOAT', {'default': 0.93, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'bbox_expansion': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1}), 'mask_hint_threshold': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'mask_hint_use_negative': (['False', 'Small', 'Outter'],)}}
    RETURN_TYPES = ('MASK', 'MASK')
    RETURN_NAMES = ('combined_mask', 'batch_masks')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    def doit(self, sam_model, segs, image, detection_hint, dilation, threshold, bbox_expansion, mask_hint_threshold, mask_hint_use_negative):
        (combined_mask, batch_masks) = core.make_sam_mask_segmented(sam_model, segs, image, detection_hint, dilation, threshold, bbox_expansion, mask_hint_threshold, mask_hint_use_negative)
        return (combined_mask, batch_masks)
```