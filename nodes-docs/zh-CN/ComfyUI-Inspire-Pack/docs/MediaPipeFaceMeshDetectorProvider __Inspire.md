
# Documentation
- Class name: MediaPipeFaceMeshDetectorProvider __Inspire
- Category: InspirePack/Detector
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MediaPipeFaceMeshDetectorProvider节点旨在将MediaPipe的FaceMesh技术集成到ComfyUI框架中，实现面部特征检测功能。它作为一个提供者，可以将FaceMesh检测能力引入分割或其他图像处理流程中，从而实现高级的面部分析和处理。

# Input types
## Required
- max_faces
    - 指定在给定图像中要检测的最大人脸数量，控制检测过程的范围。
    - Comfy dtype: INT
    - Python dtype: int
- face
    - 表示是否启用以及如何配置面部特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mouth
    - 表示是否启用以及如何配置嘴部特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_eyebrow
    - 表示是否启用以及如何配置左眉毛特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_eye
    - 表示是否启用以及如何配置左眼特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_pupil
    - 表示是否启用以及如何配置左瞳孔特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_eyebrow
    - 表示是否启用以及如何配置右眉毛特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_eye
    - 表示是否启用以及如何配置右眼特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_pupil
    - 表示是否启用以及如何配置右瞳孔特征的检测。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- bbox_detector
    - 提供一个配置用于面部特征边界框检测的检测器。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: MediaPipeFaceMeshDetector
- segm_detector
    - 提供一个配置用于面部特征分割检测的检测器。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: MediaPipeFaceMeshDetector


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MediaPipeFaceMeshDetectorProvider:
    @classmethod
    def INPUT_TYPES(s):
        bool_true_widget = ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"})
        bool_false_widget = ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"})
        return {"required": {
                                "max_faces": ("INT", {"default": 10, "min": 1, "max": 50, "step": 1}),
                                "face": bool_true_widget,
                                "mouth": bool_false_widget,
                                "left_eyebrow": bool_false_widget,
                                "left_eye": bool_false_widget,
                                "left_pupil": bool_false_widget,
                                "right_eyebrow": bool_false_widget,
                                "right_eye": bool_false_widget,
                                "right_pupil": bool_false_widget,
                            }}

    RETURN_TYPES = ("BBOX_DETECTOR", "SEGM_DETECTOR")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Detector"

    def doit(self, max_faces, face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil):
        bbox_detector = MediaPipeFaceMeshDetector(face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil, max_faces, is_segm=False)
        segm_detector = MediaPipeFaceMeshDetector(face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil, max_faces, is_segm=True)

        return (bbox_detector, segm_detector)

```
