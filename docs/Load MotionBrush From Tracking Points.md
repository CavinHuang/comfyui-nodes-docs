# Documentation
- Class name: LoadMotionBrushFromTrackingPoints
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点通过解释跟踪点来促进运动刷子的创建，生成代表序列中运动的向量场。

# Input types
## Required
- tracking_points
    - 跟踪点是必需的，因为它们为运动检测和刷子创建提供源数据，决定了节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- MotionBrush
    - 输出代表了一个详细的运动向量场，对于可视化和应用运动效果至关重要。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LoadMotionBrushFromTrackingPoints:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('DragNUWA',), 'tracking_points': ('STRING', {'multiline': True, 'default': '[[[25,25],[128,128]]]'})}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model, tracking_points):
        return (model.load_motionbrush_from_tracking_points(tracking_points),)
```