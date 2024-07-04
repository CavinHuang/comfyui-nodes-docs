
# Documentation
- Class name: DWPreprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

DWPreprocessor Provider for SEGS是一个专为分割任务设计的图像预处理器。它通过检测手部、身体和面部等各种元素，并调整图像分辨率来增强输入数据，从而获得更好的分割结果。该预处理器利用边界框检测器和姿态估计器来完成这些任务。

# Input types
## Required
- detect_hand
    - 启用或禁用预处理步骤中的手部检测，影响分割的重点和准确性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_body
    - 启用或禁用身体检测，通过识别身体轮廓来影响分割过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_face
    - 激活或停用面部检测，通过突出面部特征来影响分割。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- resolution_upscale_by
    - 通过指定的放大因子调整输入图像的分辨率，提高分割的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_detector
    - 指定要使用的边界框检测器模型，影响元素检测的精确度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- pose_estimator
    - 确定要使用的姿态估计器模型，通过准确的姿态信息增强分割效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- segs_preprocessor
    - 提供为分割任务定制的预处理输入，包含检测到的元素和分辨率调整。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DWPreprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "detect_hand": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                "detect_body": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                "detect_face": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                "resolution_upscale_by": ("FLOAT", {"default": 1.0, "min": 0.5, "max": 100, "step": 0.1}),
                "bbox_detector": (
                    ["yolox_l.torchscript.pt", "yolox_l.onnx", "yolo_nas_l_fp16.onnx", "yolo_nas_m_fp16.onnx", "yolo_nas_s_fp16.onnx"],
                    {"default": "yolox_l.onnx"}
                ),
                "pose_estimator": (["dw-ll_ucoco_384_bs5.torchscript.pt", "dw-ll_ucoco_384.onnx", "dw-ll_ucoco.onnx"], {"default": "dw-ll_ucoco_384_bs5.torchscript.pt"})
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, detect_hand, detect_body, detect_face, resolution_upscale_by, bbox_detector, pose_estimator):
        obj = DWPreprocessor_wrapper(detect_hand, detect_body, detect_face, upscale_factor=resolution_upscale_by, bbox_detector=bbox_detector, pose_estimator=pose_estimator)
        return (obj, )

```
