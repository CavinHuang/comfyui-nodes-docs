
# Documentation
- Class name: OpenPose_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

OpenPose Preprocessor Provider (SEGS)节点为SEGS(语义分割)提供了一个使用OpenPose的预处理器。该节点能够检测和处理图像中的人手、身体和面部。它允许调整检测功能和图像分辨率缩放，以便为进一步的处理或分析准备图像。

# Input types
## Required
- detect_hand
    - 启用或禁用图像中的手部检测。这会影响节点识别和处理手部相关特征的能力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_body
    - 启用或禁用图像中的身体检测。这会影响节点识别和处理身体相关特征的能力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_face
    - 启用或禁用图像中的面部检测。这会影响节点识别和处理面部相关特征的能力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- resolution_upscale_by
    - 通过指定的放大因子调整图像的分辨率。这会影响处理后图像的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- segs_preprocessor
    - 提供一个经过预处理的图像对象，专门为SEGS应用定制，可用于语义分割任务。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: OpenPose_Preprocessor_wrapper


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OpenPose_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "detect_hand": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                "detect_body": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                "detect_face": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                "resolution_upscale_by": ("FLOAT", {"default": 1.0, "min": 0.5, "max": 100, "step": 0.1}),
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, detect_hand, detect_body, detect_face, resolution_upscale_by):
        obj = OpenPose_Preprocessor_wrapper(detect_hand, detect_body, detect_face, upscale_factor=resolution_upscale_by)
        return (obj, )

```
