# Documentation
- Class name: BboxDetectorForEach
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

BboxDetectorForEach节点旨在使用指定的检测器为图像中的每个段检测边界框。它使用给定的阈值处理图像，并应用膨胀来细化检测。该节点还允许通过诸如裁剪因子和下降尺寸之类的参数进行定制，使用户可以根据其特定需求调整检测。它通过识别和隔离图像中的感兴趣区域，为整体分割过程做出贡献。

# Input types
## Required
- bbox_detector
    - bbox_detector参数对于BboxDetectorForEach节点至关重要，因为它定义了将用于识别图像内边界框的检测器。它在节点的执行和检测结果的准确性中起着关键作用。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: torch.nn.Module
- image
    - 图像参数是BboxDetectorForEach节点的基本输入，代表将被处理以进行边界框检测的视觉数据。它是节点操作的主要信息源，直接影响检测结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- threshold
    - 阈值参数对于控制边界框检测的灵敏度至关重要。它决定了检测器识别潜在段的水平，影响节点区分图像中相关和不相关区域的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation
    - 膨胀参数对于通过扩展边界来细化检测到的边界框很重要。它允许对检测到的段的大小和形状进行调整，当处理不同分辨率的图像或需要更高级别的细节时特别有用。
    - Comfy dtype: INT
    - Python dtype: int
- crop_factor
    - 裁剪因子参数影响图像中用于检测的部分。它可以用于专注于图像中的特定感兴趣区域或排除不相关区域，从而提高检测过程的效率和准确性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- drop_size
    - drop_size参数决定了在检测过程中被丢弃的段的大小。它是控制检测粒度的关键因素，允许在检测到的段的数量和所需的计算资源之间取得平衡。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- labels
    - labels参数允许用户指定他们感兴趣的段类型。它通过过滤不需要的段来实现选择性检测，可以简化后续处理步骤，专注于图像中最重要的部分。
    - Comfy dtype: STRING
    - Python dtype: str
- detailer_hook
    - detailer_hook参数提供了一种使用附加细节或后处理步骤定制检测过程的机制。它对于将节点与其他系统集成或将特定领域的逻辑应用于检测结果特别有用。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Callable

# Output types
- segs
    - segs输出代表图像中检测到的段的集合。它是BboxDetectorForEach节点操作的主要果，包含每个段的边界框和相关元数据。
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