---
tags:
- MediaPipeFaceMesh
- Segmentation
---

# MediaPipeFaceMesh Detector Provider
## Documentation
- Class name: `MediaPipeFaceMeshDetectorProvider __Inspire`
- Category: `InspirePack/Detector`
- Output node: `False`

The MediaPipeFaceMeshDetectorProvider node is designed to facilitate the detection of facial landmarks using MediaPipe's FaceMesh technology within the ComfyUI framework. It serves as a provider for integrating FaceMesh detection capabilities into segmentation or other image processing pipelines, enabling advanced facial analysis and manipulation.
## Input types
### Required
- **`max_faces`**
    - Specifies the maximum number of faces to detect in the given image, controlling the scope of the detection process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`face`**
    - Indicates the presence and configuration of the face feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`mouth`**
    - Indicates the presence and configuration of the mouth feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`left_eyebrow`**
    - Indicates the presence and configuration of the left eyebrow feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`left_eye`**
    - Indicates the presence and configuration of the left eye feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`left_pupil`**
    - Indicates the presence and configuration of the left pupil feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`right_eyebrow`**
    - Indicates the presence and configuration of the right eyebrow feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`right_eye`**
    - Indicates the presence and configuration of the right eye feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`right_pupil`**
    - Indicates the presence and configuration of the right pupil feature for detection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`bbox_detector`**
    - Comfy dtype: `BBOX_DETECTOR`
    - Provides a detector configured for bounding box detection of facial features.
    - Python dtype: `MediaPipeFaceMeshDetector`
- **`segm_detector`**
    - Comfy dtype: `SEGM_DETECTOR`
    - Provides a detector configured for segmentation detection of facial features.
    - Python dtype: `MediaPipeFaceMeshDetector`
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
