# Documentation
- Class name: ultralyticsDetectorForDetailerFix
- Category: EasyUse/Fix
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点与Ultralytics检测器集成，处理边界框和分割数据，提高图像中对象检测的准确性和细节。它旨在通过调整检测参数和应用特定的处理步骤来提高图像分析的整体质量。

# Input types
## Required
- model_name
    - model_name参数指定了检测模型的来源，这对节点的运行至关重要，因为它决定了用于对象检测和分割的数据。
    - Comfy dtype: COMBO[bboxs, segms]
    - Python dtype: Union[str, List[str]]
- bbox_threshold
    - bbox_threshold参数微调边界框检测的灵敏度，影响节点识别和隔离图像中对象的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_dilation
    - bbox_dilation参数调整边界框的大小，这对于准确框定和聚焦检测到的对象至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- bbox_crop_factor
    - bbox_crop_factor参数影响围绕检测到的对象的图像裁剪，确保有效地捕捉细节以进行进一步分析。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- bbox_segm_pipe
    - 该节点的输出是一个结合了精炼的边界框和分割结果的流水线，为详细的图像分析提供了一套全面的数据。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, float, int, float, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class ultralyticsDetectorForDetailerFix:

    @classmethod
    def INPUT_TYPES(s):
        bboxs = ['bbox/' + x for x in folder_paths.get_filename_list('ultralytics_bbox')]
        segms = ['segm/' + x for x in folder_paths.get_filename_list('ultralytics_segm')]
        return {'required': {'model_name': (bboxs + segms,), 'bbox_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'bbox_dilation': ('INT', {'default': 10, 'min': -512, 'max': 512, 'step': 1}), 'bbox_crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 10, 'step': 0.1})}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('bbox_segm_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Fix'

    def doit(self, model_name, bbox_threshold, bbox_dilation, bbox_crop_factor):
        if 'UltralyticsDetectorProvider' not in ALL_NODE_CLASS_MAPPINGS:
            raise Exception(f"[ERROR] To use UltralyticsDetectorProvider, you need to install 'Impact Pack'")
        cls = ALL_NODE_CLASS_MAPPINGS['UltralyticsDetectorProvider']
        (bbox_detector, segm_detector) = cls().doit(model_name)
        pipe = (bbox_detector, bbox_threshold, bbox_dilation, bbox_crop_factor, segm_detector)
        return (pipe,)
```