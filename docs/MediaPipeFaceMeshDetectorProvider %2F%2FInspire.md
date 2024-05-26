# Documentation
- Class name: MediaPipeFaceMeshDetectorProvider
- Category: InspirePack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

MediaPipeFaceMeshDetectorProvider 节点旨在使用 MediaPipe FaceMesh 模型检测和分割图像中的面部。它提供识别和隔离面部特征的功能，例如面部轮廓、眼睛、眉毛和嘴巴。该节点的主要目标是增强图像中的面部细节，这对于涉及面部识别、动画或增强低分辨率面部图像的应用程序特别有用。

# Input types
## Required
- max_faces
    - 参数 'max_faces' 定义了检测器应在输入图像中识别的最大面部数量。它在控制检测过程的范围方面起着关键作用，并且与面部检测的性能和准确性直接相关。
    - Comfy dtype: INT
    - Python dtype: int
- face
    - 参数 'face' 指示检测器是否应在检测过程中包括整个面部区域。启用此选项确保捕获面部区域，这对于需要全面面部细节的任务是必不可少的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- mouth
    - 当启用 'mouth' 参数时，指示检测器在检测到的面部中特别识别嘴部区域。这对于需要关注嘴部动作或表情的应用程序很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_eyebrow
    - 参数 'left_eyebrow' 允许在面部特征检测中包含左眉。这对于需要详细分析面部表情或重建图像中的面部特征的应用程序特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_eye
    - 参数 'left_eye' 启用左眼的检测，这对于涉及眼球运动的详细分析或生成准确的面部特征分割的应用非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_pupil
    - 参数 'left_pupil' 用于检测面部区域中的左瞳孔。这对于需要精确眼球追踪或增强面部图像中虹膜清晰度的应用程序至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_eyebrow
    - 参数 'right_eyebrow' 指定是否应在检测中包含右眉。它有助于捕捉全范围的面部表情，对于分析或模拟详细面部运动的应用程序特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_eye
    - 参数 'right_eye' 激活右眼的检测，这对于全面的面部检测设置至关重要，允许进行详细的眼球运动分析或面部特征重建。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_pupil
    - 参数 'right_pupil' 负责检测右瞳孔，在要求眼球追踪高精度或增强面部图像中虹膜细节的应用程序中起着关键作用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- bbox_detector
    - 输出 'bbox_detector' 提供了检测到的面部的边界框坐标，这对于在图像中定位和进一步处理面部区域至关重要。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: List[Tuple[int, int, int, int]]
- segm_detector
    - 输出 'segm_detector' 提供了检测到的面部的分割掩码，允许以高精度隔离和操作面部特征。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class MediaPipeFaceMeshDetectorProvider:

    @classmethod
    def INPUT_TYPES(s):
        bool_true_widget = ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'})
        bool_false_widget = ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'})
        return {'required': {'max_faces': ('INT', {'default': 10, 'min': 1, 'max': 50, 'step': 1}), 'face': bool_true_widget, 'mouth': bool_false_widget, 'left_eyebrow': bool_false_widget, 'left_eye': bool_false_widget, 'left_pupil': bool_false_widget, 'right_eyebrow': bool_false_widget, 'right_eye': bool_false_widget, 'right_pupil': bool_false_widget}}
    RETURN_TYPES = ('BBOX_DETECTOR', 'SEGM_DETECTOR')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Detector'

    def doit(self, max_faces, face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil):
        bbox_detector = MediaPipeFaceMeshDetector(face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil, max_faces, is_segm=False)
        segm_detector = MediaPipeFaceMeshDetector(face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil, max_faces, is_segm=True)
        return (bbox_detector, segm_detector)
```