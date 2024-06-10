---
tags:
- Face
---

# Face Analysis Models
## Documentation
- Class name: `FaceAnalysisModels`
- Category: `FaceAnalysis`
- Output node: `False`

The FaceAnalysisModels node is designed to load and configure face analysis models based on specified libraries and providers. It abstracts the complexity of initializing face detection and recognition models, offering a streamlined way to prepare these models for further face analysis tasks.
## Input types
### Required
- **`library`**
    - Specifies the library to use for face analysis, influencing which face detection and recognition models are loaded and configured.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`provider`**
    - Determines the computational backend (e.g., CPU, CUDA) for the face analysis models, affecting performance and compatibility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`analysis_models`**
    - Comfy dtype: `ANALYSIS_MODELS`
    - Outputs a configured face analysis model, ready for performing tasks such as face detection, landmark detection, and face recognition.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FaceAnalysisModels:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "library": (INSTALLED_LIBRARIES, ),
            "provider": (["CPU", "CUDA", "DirectML", "OpenVINO", "ROCM", "CoreML"], ),
        }}

    RETURN_TYPES = ("ANALYSIS_MODELS", )
    FUNCTION = "load_models"
    CATEGORY = "FaceAnalysis"

    def load_models(self, library, provider):
        out = {}

        if library == "insightface":
            out = {
                "library": library,
                "detector": FaceAnalysis(name="buffalo_l", root=INSIGHTFACE_DIR, providers=[provider + 'ExecutionProvider',])
            }
            out["detector"].prepare(ctx_id=0, det_size=(640, 640))
        else:
            out = {
                "library": library,
                "detector": dlib.get_frontal_face_detector(),
                "shape_predict": dlib.shape_predictor(os.path.join(DLIB_DIR, "shape_predictor_68_face_landmarks.dat")),
                "face_recog": dlib.face_recognition_model_v1(os.path.join(DLIB_DIR, "dlib_face_recognition_resnet_model_v1.dat")),
            }
        

        return (out, )

```
