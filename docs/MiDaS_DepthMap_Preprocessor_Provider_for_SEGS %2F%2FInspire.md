# Documentation
- Class name: MiDaS_DepthMap_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点通过使用MiDaS模型生成语义分割任务的深度图，提高分割输出的质量。

# Input types
## Required
- a
    - 参数'a'是影响深度估计过程的关键输入，影响深度图的整体准确性和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bg_threshold
    - ‘bg_threshold’参数对于在深度图中区分前景和背景至关重要，从而提高了分割精度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SEGS_PREPROCESSOR
    - 输出提供一个预处理过的深度图，作为分割模型的输入，显著提升了分割结果的质量。
    - Comfy dtype: NODE
    - Python dtype: MiDaS_DepthMapPreprocessor

# Usage tips
- Infra type: GPU

# Source code
```
class MiDaS_DepthMap_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'a': ('FLOAT', {'default': np.pi * 2.0, 'min': 0.0, 'max': np.pi * 5.0, 'step': 0.05}), 'bg_threshold': ('FLOAT', {'default': 0.1, 'min': 0, 'max': 1, 'step': 0.05})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, a, bg_threshold):
        obj = MiDaS_DepthMap_Preprocessor_wrapper(a, bg_threshold)
        return (obj,)
```