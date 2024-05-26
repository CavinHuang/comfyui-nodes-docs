# Documentation
- Class name: LoadMotionBrushFromOpticalFlowDirectory
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点能够从指定目录中的光流文件中提取和处理运动数据，用于生成运动刷子以供进一步分析和应用。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于处理光流数据的特定算法或框架，影响运动刷子生成的准确性和效率。
    - Comfy dtype: DragNUWA
    - Python dtype: DragNUWA
- optical_flow_directory
    - 该参数指定包含光流文件的目录，对于节点定位和处理所需的运动数据至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- MotionBrush
    - 输出代表以运动刷子形式处理后的运动数据，可用于动画、视频编辑和效果生成等多种应用。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LoadMotionBrushFromOpticalFlowDirectory:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('DragNUWA',), 'optical_flow_directory': ('STRING', {'default': 'X://path/to/optical_flow', 'vhs_path_extensions': []})}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model, optical_flow_directory):
        return (model.load_motionbrush_from_optical_flow_directory(optical_flow_directory),)
```