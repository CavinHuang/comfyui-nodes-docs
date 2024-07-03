
# Documentation
- Class name: MediaPipe_FaceMesh_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点为SEGS（语义分割）任务提供了一个预处理器，专门利用MediaPipe的FaceMesh技术来检测面部特征和标志点。它旨在通过应用面部网格检测来增强SEGS模型的输入数据，从而实现更精确和详细的面部区域分割。

# Input types
## Required
- max_faces
    - 指定在输入图像中要检测的最大人脸数量。这个参数有助于优化多人脸图像的检测过程。
    - Comfy dtype: INT
    - Python dtype: int
- min_confidence
    - 设置人脸检测的最小置信度阈值。置信度得分低于此阈值的人脸将不被考虑，确保只有以足够确定性检测到的人脸才会被处理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution_upscale_by
    - 决定在进行面部网格检测之前，输入图像分辨率的放大倍数。放大可以改善低分辨率图像中面部特征的检测效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- segs_preprocessor
    - 返回一个为SEGS任务配置的预处理器对象，专门用于使用MediaPipe的FaceMesh技术进行面部特征检测。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MediaPipe_FaceMesh_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "max_faces": ("INT", {"default": 10, "min": 1, "max": 50, "step": 1}),
                "min_confidence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01}),
                "resolution_upscale_by": ("FLOAT", {"default": 1.0, "min": 0.5, "max": 100, "step": 0.1}),
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, max_faces, min_confidence, resolution_upscale_by):
        obj = MediaPipe_FaceMesh_Preprocessor_wrapper(max_faces, min_confidence, upscale_factor=resolution_upscale_by)
        return (obj, )

```
