# Documentation
- Class name: Yoloworld_ModelLoader_Zho
- Category: 🔎YOLOWORLD_ESAM
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-YoloWorld-EfficientSAM.git

Yoloworld_ModelLoader_Zho 类旨在方便加载和初始化特定应用的 YOLO (You Only Look Once) 目标检测模型。它封装了模型加载的复杂性，使用户能够轻松地将 YOLO 模型集成到他们的项目中，而无需深入了解模型配置的复杂细节。

# Input types
## Required
- yolo_world_model
    - 参数 `yolo_world_model` 对于指定要加载的 YOLO 模型变体至关重要。它决定了节点将使用的特定配置和预训练权重，这直接影响模型在目标检测任务中的性能和准确性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- yolo_world_model
    - 输出 `yolo_world_model` 表示已加载的 YOLO 模型，准备用于目标检测任务。它是节点功能的最终成果，为与模型交互以对新数据执行推理提供了一个结构化的接口。
    - Comfy dtype: YOLOWORLDMODEL
    - Python dtype: YOLOWorld

# Usage tips
- Infra type: CPU

# Source code
```
class Yoloworld_ModelLoader_Zho:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'yolo_world_model': (['yolo_world/l', 'yolo_world/m', 'yolo_world/s'],)}}
    RETURN_TYPES = ('YOLOWORLDMODEL',)
    RETURN_NAMES = ('yolo_world_model',)
    FUNCTION = 'load_yolo_world_model'
    CATEGORY = '🔎YOLOWORLD_ESAM'

    def load_yolo_world_model(self, yolo_world_model):
        YOLO_WORLD_MODEL = YOLOWorld(model_id=yolo_world_model)
        return [YOLO_WORLD_MODEL]
```