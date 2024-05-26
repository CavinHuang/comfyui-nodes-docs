# Documentation
- Class name: LoadMotionBrushFromTrackingPointsWithoutModel
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点抽象了无需预存模型即可从跟踪点生成运动数据的过程，便于用户根据提供的跟踪点创建运动刷。

# Input types
## Required
- model_length
    - 模型长度参数决定了运动序列的持续时间，这对节点的运行至关重要，因为它决定了输出运动刷的帧数。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 宽度参数指定了运动刷的水平分辨率，这对于建立运动数据的空间上下文至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数定义了运动刷的垂直分辨率，通过确定输出的空间维度，在节点功能中扮演关键角色。
    - Comfy dtype: INT
    - Python dtype: int
- tracking_points
    - 跟踪点参数是必需的，因为它提供了用于构建运动刷的原始跟踪数据，直接影响运动的质量和准确性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- MotionBrush
    - 输出MotionBrush是一个张量，表示在指定的持续时间和空间维度上的运动数据，包含了节点的主要功能。
    - Comfy dtype: TORCH_TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LoadMotionBrushFromTrackingPointsWithoutModel:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_length': ('INT', {'default': 14}), 'width': ('INT', {'default': 36}), 'height': ('INT', {'default': 20}), 'tracking_points': ('STRING', {'multiline': True, 'default': '[[[1,1],[2,2]]]'})}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model_length, width, height, tracking_points):
        tracking_points = json.loads(tracking_points)
        motionbrush = load_motionbrush_from_tracking_points_without_model(model_length, width, height, tracking_points)
        return (motionbrush,)
```