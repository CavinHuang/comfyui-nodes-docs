# Documentation
- Class name: SeargeControlnetModels
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点协调检索和整合各种控制网模型，用于图像处理任务，便于根据不同的模型检查点定制视觉输出。

# Input types
## Required
- clip_vision
    - clip_vision参数对于选择影响生成图像视觉风格和内容的模型检查点至关重要。
    - Comfy dtype: COMBO[UI.CLIP_VISION_WITH_NONE()]
    - Python dtype: Union[str, None]
- canny_checkpoint
    - 该参数对于图像中的边缘检测至关重要，使节点能够根据所选检查点细化输出的结构元素。
    - Comfy dtype: COMBO[UI.CONTROLNETS_WITH_NONE()]
    - Python dtype: Union[str, None]
- depth_checkpoint
    - depth_checkpoint参数对于控制生成图像中的深度感知至关重要，增强了三维方面的展示。
    - Comfy dtype: COMBO[UI.CONTROLNETS_WITH_NONE()]
    - Python dtype: Union[str, None]
- recolor_checkpoint
    - 该参数对于调整图像的色彩板至关重要，允许最终视觉产品中有广泛的风格变化。
    - Comfy dtype: COMBO[UI.CONTROLNETS_WITH_NONE()]
    - Python dtype: Union[str, None]
- sketch_checkpoint
    - sketch_checkpoint参数在以素描风格渲染图像方面发挥着重要作用，提供了独特的艺术解读。
    - Comfy dtype: COMBO[UI.CONTROLNETS_WITH_NONE()]
    - Python dtype: Union[str, None]
- custom_checkpoint
    - 该参数允许实施自定义控制网模型，扩展节点的功能以满足特定的用户定义要求。
    - Comfy dtype: COMBO[UI.CONTROLNETS_WITH_NONE()]
    - Python dtype: Union[str, None]

# Output types
- data
    - 数据输出是一个结构化的字典，包含了所选的控制网模型，为进一步的图像处理操作提供了基础。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeControlnetModels:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'clip_vision': (UI.CLIP_VISION_WITH_NONE(),), 'canny_checkpoint': (UI.CONTROLNETS_WITH_NONE(),), 'depth_checkpoint': (UI.CONTROLNETS_WITH_NONE(),), 'recolor_checkpoint': (UI.CONTROLNETS_WITH_NONE(),), 'sketch_checkpoint': (UI.CONTROLNETS_WITH_NONE(),), 'custom_checkpoint': (UI.CONTROLNETS_WITH_NONE(),)}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(clip_vision, canny_checkpoint, depth_checkpoint, recolor_checkpoint, sketch_checkpoint, custom_checkpoint):
        return {UI.F_CLIP_VISION_CHECKPOINT: clip_vision, UI.F_CANNY_CHECKPOINT: canny_checkpoint, UI.F_DEPTH_CHECKPOINT: depth_checkpoint, UI.F_RECOLOR_CHECKPOINT: recolor_checkpoint, UI.F_SKETCH_CHECKPOINT: sketch_checkpoint, UI.F_CUSTOM_CHECKPOINT: custom_checkpoint}

    def get(self, clip_vision, canny_checkpoint, depth_checkpoint, recolor_checkpoint, sketch_checkpoint, custom_checkpoint, data=None):
        if data is None:
            data = {}
        data[UI.S_CONTROLNET_MODELS] = self.create_dict(clip_vision, canny_checkpoint, depth_checkpoint, recolor_checkpoint, sketch_checkpoint, custom_checkpoint)
        return (data,)
```