# Documentation
- Class name: LeReS_DepthMap_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

这个节点类用于为分割任务预处理深度图，利用LeReS算法优化输入数据，提高分割输出的质量。

# Input types
## Required
- rm_nearest
    - 该参数调整附近像素的移除阈值，这对于定义深度图的精度和分割边界的清晰度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rm_background
    - 该参数设置移除背景噪声的阈值，这对于隔离主题并确保分割的准确性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- boost
    - 启用此参数时，增强深度图的特征，可能会改善分割结果，但可能会增加处理时间。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- SEGS_PREPROCESSOR
    - 输出是为分割任务优化的预处理深度图，为进一步处理提供了精炼的基础。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: LeReS_DepthMapPreprocessor

# Usage tips
- Infra type: CPU

# Source code
```
class LeReS_DepthMap_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'rm_nearest': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100, 'step': 0.1}), 'rm_background': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100, 'step': 0.1})}, 'optional': {'boost': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, rm_nearest, rm_background, boost=False):
        obj = LeReS_DepthMap_Preprocessor_wrapper(rm_nearest, rm_background, boost)
        return (obj,)
```