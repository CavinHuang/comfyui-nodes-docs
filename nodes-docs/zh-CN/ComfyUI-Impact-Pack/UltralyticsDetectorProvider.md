# Documentation
- Class name: UltraalyticsDetectorProvider
- Category: ImpactPack
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

UltraalyticsDetectorProvider节点旨在方便加载和使用由Ultraalytics提供的对象检测模型。它抽象了模型初始化的复杂性，允许用户轻松执行边界框和分割检测。该节点强调将检测功能无缝集成到更广泛的系统中，为检测任务提供了一个高级接口，无需深入了解底层模型架构或推理过程。

# Input types
## Required
- model_name
    - model_name参数对于指定加载哪个预训练的YOLO模型进行对象检测任务至关重要。它的值决定了模型的配置以及节点将执行的检测类型（边界框或分割）。此参数直接影响节点的执行和检测结果的质量。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- BBOX_DETECTOR
    - BBOX_DETECTOR输出提供了一个专门用于通过边界框在图像中识别和定位对象的检测器对象。它封装了执行检测的功能，是对象检测流水线中的关键组件，提供了一种结构化的方法来获取和使用检测结果。
    - Comfy dtype: UltraBBoxDetector
    - Python dtype: UltraBBoxDetector
- SEGM_DETECTOR
    - SEGM_DETECTOR输出提供了一个检测器对象，它不仅可以在图像中定位对象，还可以提供分割掩码。此输出对于需要更详细了解对象形状和边界的应用程序非常重要，提供了一种全面的检测解决方案，包括分割功能。
    - Comfy dtype: UltraSegmDetector
    - Python dtype: UltraSegmDetector

# Usage tips
- Infra type: GPU

# Source code
```
class UltralyticsDetectorProvider:

    @classmethod
    def INPUT_TYPES(s):
        bboxs = ['bbox/' + x for x in folder_paths.get_filename_list('ultralytics_bbox')]
        segms = ['segm/' + x for x in folder_paths.get_filename_list('ultralytics_segm')]
        return {'required': {'model_name': (bboxs + segms,)}}
    RETURN_TYPES = ('BBOX_DETECTOR', 'SEGM_DETECTOR')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack'

    def doit(self, model_name):
        model_path = folder_paths.get_full_path('ultralytics', model_name)
        model = subcore.load_yolo(model_path)
        if model_name.startswith('bbox'):
            return (subcore.UltraBBoxDetector(model), core.NO_SEGM_DETECTOR())
        else:
            return (subcore.UltraBBoxDetector(model), subcore.UltraSegmDetector(model))
```