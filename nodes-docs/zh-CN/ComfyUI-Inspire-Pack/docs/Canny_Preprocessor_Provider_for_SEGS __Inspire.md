
# Documentation
- Class name: Canny_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点为SEGS（语义边缘引导合成）提供了一个Canny边缘检测预处理器，旨在增强图像边缘，以获得更好的分割和合成效果。Canny边缘检测是一种流行的边缘检测算法，能够有效地识别图像中的边缘特征，对于后续的图像分割和处理任务具有重要意义。

# Input types
## Required
- low_threshold
    - 指定Canny边缘检测算法中滞后阈值处理步骤的下限，影响较弱边缘的检测。较低的阈值会导致检测到更多的边缘，包括一些可能是噪声的微弱边缘。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_threshold
    - 定义滞后阈值处理步骤的上限，决定最显著边缘的检测。较高的阈值会导致只检测到最强的边缘，可能会忽略一些重要但不太显著的边缘。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- segs_preprocessor
    - 输出一个配置为Canny边缘检测的预处理器对象，可直接用于SEGS工作流程。这个预处理器将应用指定的低阈值和高阈值参数来执行Canny边缘检测。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: Canny_Preprocessor_wrapper


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Canny_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "low_threshold": ("FLOAT", {"default": 0.4, "min": 0.01, "max": 0.99, "step": 0.01}),
                "high_threshold": ("FLOAT", {"default": 0.8, "min": 0.01, "max": 0.99, "step": 0.01})
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, low_threshold, high_threshold):
        obj = Canny_Preprocessor_wrapper(low_threshold, high_threshold)
        return (obj, )

```
