# Documentation
- Class name: BboxDetectorForEach
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

BboxDetectorForEach节点旨在检测图像中每个段的边界框。它利用bbox_detector根据提供的阈值和其他参数识别和定位段，确保只检测到最相关的段。该节点在段检测工作流程中扮演着关键角色，通过自动化识别和隔离图像中的特定感兴趣区域来简化流程。

# Input types
## Required
- bbox_detector
    - bbox_detector是节点的关键组件，负责在图像中实际检测边界框。它对节点的执行至关重要，因为它直接影响检测过程的准确性和效率。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: torch.nn.Module
- image
    - image参数是节点的输入数据，bbox_detector使用它来执行其检测任务。它是节点操作的基础，因为图像的质量和分辨率可以显著影响检测结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- threshold
    - 阈值参数决定了bbox_detector在识别边界框时的灵敏度。它是一个重要的调整因素，可以影响检测到的段的数量和检测的精度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation
    - 膨胀参数控制检测到的边界框的扩展。它在检测后处理中起着重要作用，可能增强检测到的段的覆盖范围。
    - Comfy dtype: INT
    - Python dtype: int
- crop_factor
    - crop_factor参数用于调整检测后的裁剪段的大小。它对于微调分割过程以满足特定应用需求至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- drop_size
    - drop_size参数指定在检测过程中要考虑的段的最小大小。它对于过滤掉噪声和无关数据至关重要，因此可以提高检测质量。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- labels
    - labels参数允许指定要检测的段类型。它是一个可选但有用的特性，用于集中检测特定的感兴趣的段。
    - Comfy dtype: STRING
    - Python dtype: str
- detailer_hook
    - detailer_hook参数提供了一种机制，用于对检测到的边界框进行自定义后处理。它是一个高级特性，可用于将额外的处理步骤集成到检测工作流程中。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Callable

# Output types
- segs
    - segs输出包含图像中检测到的段，每个段都带有其边界框信息。这是节点操作的主要结果，对于进一步的分析或处理至关重要。
    - Comfy dtype: SEGS
    - Python dtype: List[impact.core.SEG]

# Usage tips
- Infra type: CPU

# Source code
```
class BboxDetectorForEach:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'bbox_detector': ('BBOX_DETECTOR',), 'image': ('IMAGE',), 'threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'dilation': ('INT', {'default': 10, 'min': -512, 'max': 512, 'step': 1}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'labels': ('STRING', {'multiline': True, 'default': 'all', 'placeholder': 'List the types of segments to be allowed, separated by commas'})}, 'optional': {'detailer_hook': ('DETAILER_HOOK',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    def doit(self, bbox_detector, image, threshold, dilation, crop_factor, drop_size, labels=None, detailer_hook=None):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: BboxDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        segs = bbox_detector.detect(image, threshold, dilation, crop_factor, drop_size, detailer_hook)
        if labels is not None and labels != '':
            labels = labels.split(',')
            if len(labels) > 0:
                (segs, _) = segs_nodes.SEGSLabelFilter.filter(segs, labels)
        return (segs,)
```