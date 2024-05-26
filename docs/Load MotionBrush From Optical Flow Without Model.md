# Documentation
- Class name: LoadMotionBrushFromOpticalFlowWithoutModel
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点有助于解释光流数据以生成运动刷效果，这对于视觉模拟和效果生成至关重要，且不依赖于预训练模型。

# Input types
## Required
- optical_flow
    - 光流数据至关重要，因为它提供了推断运动模式并创建运动刷效果所需的基础信息。
    - Comfy dtype: OPTICAL_FLOW
    - Python dtype: numpy.ndarray

# Output types
- MotionBrush
    - 输出代表合成的运动刷，包含了从光流数据中推断出的运动模式。
    - Comfy dtype: MOTION_BRUSH
    - Python dtype: tuple

# Usage tips
- Infra type: CPU

# Source code
```
class LoadMotionBrushFromOpticalFlowWithoutModel:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'optical_flow': ('OPTICAL_FLOW',)}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, optical_flow):
        return (optical_flow,)
```