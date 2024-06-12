# Documentation
- Class name: SegmDetectorForEach
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SegmDetectorForEach节点旨在对图像进行分割检测处理和分析。它应用一个分割模型来识别图像中的不同区域，并遵循特定的检测置信度阈值。该节点能够处理各种参数，如膨胀、裁剪因子和下采样大小，以优化检测过程。它还允许基于标签列表过滤检测到的段，增强了其在目标分析场景中的实用性。

# Input types
## Required
- segm_detector
    - segm_detector参数对节点的操作至关重要，因为它定义了将用于分析输入图像的分割模型。它在检测过程中起着核心作用，直接影响分割结果的准确性和质量。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: torch.nn.Module
- image
    - 图像输入对于SegmDetectorForEach节点至关重要，因为它是分割检测的主要数据源。图像的质量和分辨率直接影响节点准确检测和分割图像内不同区域的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- threshold
    - 阈值参数对于控制分割模型的检测灵敏度非常重要。它决定了将一个段视为已检测所需的最小置信度水平，从而影响节点的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation
    - 膨胀参数对于后处理检测到的段很重要。它控制应用于段的形态学膨胀的程度，这有助于细化边界并提高整体分割质量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_factor
    - crop_factor参数用于在分割模型处理之前调整图像的大小。它可以帮助聚焦于图像内的特定感兴趣区域，并提高检测精度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- drop_size
    - drop_size参数与控制分割模型运行的分辨率有关。它可以用来平衡处理速度和分割结果中的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- labels
    - labels参数允许基于指定的段类型列表过滤检测到的段。当分析需要聚焦于特定感兴趣的段时，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str
- detailer_hook
    - detailer_hook参数提供了一种定制检测过程的机制。它允许集成特定于用户需求的额外功能或后处理步骤。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Callable

# Output types
- segs
    - 输出的segs参数代表从输入图像中检测到的段。它是分段区域的集合，每个区域都有自己的属性和标签，提供了对图像内容的详细分析。
    - Comfy dtype: SEGS
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SegmDetectorForEach:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segm_detector': ('SEGM_DETECTOR',), 'image': ('IMAGE',), 'threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'dilation': ('INT', {'default': 10, 'min': -512, 'max': 512, 'step': 1}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'labels': ('STRING', {'multiline': True, 'default': 'all', 'placeholder': 'List the types of segments to be allowed, separated by commas'})}, 'optional': {'detailer_hook': ('DETAILER_HOOK',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    def doit(self, segm_detector, image, threshold, dilation, crop_factor, drop_size, labels=None, detailer_hook=None):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: SegmDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        segs = segm_detector.detect(image, threshold, dilation, crop_factor, drop_size, detailer_hook)
        if labels is not None and labels != '':
            labels = labels.split(',')
            if len(labels) > 0:
                (segs, _) = segs_nodes.SEGSLabelFilter.filter(segs, labels)
        return (segs,)
```