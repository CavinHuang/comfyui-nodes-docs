# Documentation
- Class name: LoadMotionBrushFromOpticalFlow
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点能够从光流数据生成运动刷，使用户能够利用运动信息进行视频处理或动画等多种应用。

# Input types
## Required
- model
    - 模型参数对于运动刷生成过程至关重要，它定义了生成过程的基础架构和参数。
    - Comfy dtype: DragNUWA
    - Python dtype: torch.nn.Module
- optical_flow
    - 光流输入对于节点来说是必不可少的，因为它提供了创建运动刷所需的运动信息。
    - Comfy dtype: OPTICAL_FLOW
    - Python dtype: torch.Tensor

# Output types
- MotionBrush
    - 输出代表生成的运动刷，以结构化格式封装了运动信息。
    - Comfy dtype: MOTION_BRUSH
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LoadMotionBrushFromOpticalFlow:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('DragNUWA',), 'optical_flow': ('OPTICAL_FLOW',)}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model, optical_flow):
        return (model.load_motionbrush_from_optical_flow(optical_flow),)
```