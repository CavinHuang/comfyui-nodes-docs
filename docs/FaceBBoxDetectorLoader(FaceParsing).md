# Documentation
- Class name: FaceBBoxDetectorLoader
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

FaceBBoxDetectorLoader节点旨在加载和管理面部检测模型，使得输入数据能够用于识别和定位图像中的面部。它封装了初始化基于YOLO的模型的功能，这对于后续的面部相关分析任务至关重要。

# Input types
## Required
- model_name
    - model_name参数对于指定节点使用的面部检测模型至关重要。它决定了模型的架构，从而影响了检测的准确性和性能。模型的选择直接影响节点处理和分析面部数据的能力。
    - Comfy dtype: COMBO['bbox/face_yolov5s.pt', 'bbox/face_yolov5m.pt', ...]
    - Python dtype: Union[str, List[str]

# Output types
- BBOX_DETECTOR
    - FaceBBoxDetectorLoader节点的输出是一个配置好的面部检测模型，准备应用于面部图像。这个输出非常重要，因为它为进一步的面部分析奠定了基础，使得下游任务能够有效进行。
    - Comfy dtype: Tuple[YOLO]
    - Python dtype: Tuple[YOLO]

# Usage tips
- Infra type: CPU

# Source code
```
class FaceBBoxDetectorLoader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        files = folder_paths.get_filename_list('ultralytics_bbox')
        face_detect_models = list(filter(lambda x: 'face' in x, files))
        bboxs = ['bbox/' + x for x in face_detect_models]
        return {'required': {'model_name': (bboxs, {})}}
    RETURN_TYPES = ('BBOX_DETECTOR',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, model_name):
        model_path = folder_paths.get_full_path('ultralytics', model_name)
        model = YOLO(model_path)
        return (model,)
```