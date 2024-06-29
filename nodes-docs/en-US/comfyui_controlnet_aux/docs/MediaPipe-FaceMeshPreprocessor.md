---
tags:
- MediaPipeFaceMesh
- Segmentation
---

# MediaPipe Face Mesh
## Documentation
- Class name: `MediaPipe-FaceMeshPreprocessor`
- Category: `ControlNet Preprocessors/Faces and Poses Estimators`
- Output node: `False`

The MediaPipe Face Mesh Preprocessor node is designed for detecting and processing facial features in images using the MediaPipe library. It focuses on identifying faces and their key landmarks with configurable accuracy and performance settings, making it suitable for applications requiring facial analysis.
## Input types
### Required
- **`image`**
    - The input image to be processed for face detection and landmark annotation. This parameter is essential for the node to perform its facial analysis tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray or PIL.Image.Image`
### Optional
- **`max_faces`**
    - Specifies the maximum number of faces to detect in an image. This parameter allows for control over the detection process, ensuring that the algorithm focuses on a manageable number of faces for further processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_confidence`**
    - Determines the minimum confidence level for a face to be considered detected. This threshold helps in filtering out detections that are less likely to be accurate, ensuring that only faces with a high probability of being correctly identified are processed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - The resolution at which the input image is processed. This parameter can affect the detection accuracy and performance of the face mesh preprocessor.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image annotated with detected facial landmarks. This includes key points and contours for facial features such as eyes, eyebrows, nose, and mouth, enabling detailed facial analysis.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Media_Pipe_Face_Mesh_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            max_faces=("INT", {"default": 10, "min": 1, "max": 50, "step": 1}), #Which image has more than 50 detectable faces?
            min_confidence=("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01})
        )
        
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "detect"

    CATEGORY = "ControlNet Preprocessors/Faces and Poses Estimators"

    def detect(self, image, max_faces, min_confidence, resolution=512):
        #Ref: https://github.com/Fannovel16/comfy_controlnet_preprocessors/issues/70#issuecomment-1677967369
        install_deps()
        from controlnet_aux.mediapipe_face import MediapipeFaceDetector
        return (common_annotator_call(MediapipeFaceDetector(), image, max_faces=max_faces, min_confidence=min_confidence, resolution=resolution), )

```
