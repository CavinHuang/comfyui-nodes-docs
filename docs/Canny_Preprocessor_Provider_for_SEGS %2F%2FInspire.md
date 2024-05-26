# Documentation
- Class name: Canny_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

Canny_Preprocessor_Provider_for_SEGS 节点旨在通过应用 Canny 边缘检测算法来预处理图像，以便进行分割任务。它增强了图像的边缘，这可以通过为后续的分割模型提供更详细的结构信息，显著提高它们的性能。

# Input types
## Required
- low_threshold
    - low_threshold 参数对于 Canny 边缘检测算法至关重要，因为它决定了边缘检测的下限。它影响算法对噪声的敏感度以及检测到的边缘的精细度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_threshold
    - high_threshold 参数在 Canny 边缘检测过程中起着关键作用，它设置了边缘链接的上限。它定义了边缘的证据必须有多强才能被认为是显著的。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SEGS_PREPROCESSOR
    - SEGS_PREPROCESSOR 输出是经过增强边缘的预处理图像，适用于分割任务。它是使用指定的阈值应用 Canny 边缘检测的结果。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: Canny_Preprocessor_wrapper

# Usage tips
- Infra type: CPU

# Source code
```
class Canny_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'low_threshold': ('FLOAT', {'default': 0.4, 'min': 0.01, 'max': 0.99, 'step': 0.01}), 'high_threshold': ('FLOAT', {'default': 0.8, 'min': 0.01, 'max': 0.99, 'step': 0.01})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, low_threshold, high_threshold):
        obj = Canny_Preprocessor_wrapper(low_threshold, high_threshold)
        return (obj,)
```