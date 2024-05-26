# Documentation
- Class name: Yoloworld_ESAM_DetectorProvider_Zho
- Category: ImpactPack
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-YoloWorld-EfficientSAM.git

该节点使用基于YOLO的模型在图像中检测指定对象，并可选择使用ESAM进行对象分割。其设计目的是提供准确的边界框和分割检测，增强对图像中视觉内容的理解。

# Input types
## Required
- yolo_world_model
    - YOLO模型对于检测过程至关重要，因为它定义了用于图像中对象识别的神经网络架构。
    - Comfy dtype: YOLOWORLDMODEL
    - Python dtype: YOLOWorldModel
- categories
    - 要检测的对象类别是重要参数，指导检测过程专注于相关类别。
    - Comfy dtype: STRING
    - Python dtype: str
- iou_threshold
    - 交并比（IoU）阈值是一个关键参数，通过控制预测边界框与真实边界框之间的重叠标准，影响检测的精确度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- with_class_agnostic_nms
    - 该参数启用类别不可知的非极大值抑制，这对于减少重叠检测和提高检测结果的准确性很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- esam_model_opt
    - 提供ESAM模型选项时，通过启用检测到的对象的分割，增强了检测过程，提供了对图像内容更详细的分析。
    - Comfy dtype: ESAMMODEL
    - Python dtype: ESAMModel

# Output types
- BBOX_DETECTOR
    - BBOX检测器输出提供检测到的对象的边界框，这是理解图像中对象空间分布的基本步骤。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: YoloworldBboxDetector
- SEGM_DETECTOR
    - SEGM检测器输出提供检测到的对象的分割掩码，通过描绘每个对象的精确边界，为分析增加了额外的细节层次。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: YoloworldSegmDetector

# Usage tips
- Infra type: GPU

# Source code
```
class Yoloworld_ESAM_DetectorProvider_Zho:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'yolo_world_model': ('YOLOWORLDMODEL',), 'categories': ('STRING', {'default': '', 'placeholder': 'Please enter the objects to be detected separated by commas.', 'multiline': True}), 'iou_threshold': ('FLOAT', {'default': 0.1, 'min': 0, 'max': 1, 'step': 0.01}), 'with_class_agnostic_nms': ('BOOLEAN', {'default': False})}, 'optional': {'esam_model_opt': ('ESAMMODEL',)}}
    RETURN_TYPES = ('BBOX_DETECTOR', 'SEGM_DETECTOR')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack'

    def doit(self, yolo_world_model, categories, iou_threshold, with_class_agnostic_nms, esam_model_opt=None):
        bbox_detector = YoloworldBboxDetector(yolo_world_model, categories, iou_threshold, with_class_agnostic_nms)
        if esam_model_opt is not None:
            segm_detector = YoloworldSegmDetector(bbox_detector, esam_model_opt)
        else:
            segm_detector = None
        return (bbox_detector, segm_detector)
```