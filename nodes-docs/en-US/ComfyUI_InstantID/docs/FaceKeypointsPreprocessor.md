---
tags:
- Face
---

# Face Keypoints Preprocessor
## Documentation
- Class name: `FaceKeypointsPreprocessor`
- Category: `InstantID`
- Output node: `False`

The FaceKeypointsPreprocessor node is designed to preprocess images by extracting facial keypoints. This process involves analyzing the input image to detect faces and compute their keypoints, which are essential for various facial analysis tasks.
## Input types
### Required
- **`faceanalysis`**
    - The 'faceanalysis' parameter is a model that has been loaded and prepared for face analysis. It is crucial for detecting faces within the image and extracting their keypoints, which are then used for further processing.
    - Comfy dtype: `FACEANALYSIS`
    - Python dtype: `FaceAnalysis`
- **`image`**
    - The 'image' parameter represents the input image to be processed. It is analyzed by the face analysis model to detect faces and extract their keypoints, which are essential for the preprocessing task.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with facial keypoints extracted. This processed image is essential for tasks that require facial feature analysis, such as facial recognition or emotion detection.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FaceKeypointsPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "faceanalysis": ("FACEANALYSIS", ),
                "image": ("IMAGE", ),
            },
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "preprocess_image"
    CATEGORY = "InstantID"

    def preprocess_image(self, faceanalysis, image):
        face_kps = extractFeatures(faceanalysis, image, extract_kps=True)

        if face_kps is None:
            face_kps = torch.zeros_like(image)
            print(f"\033[33mWARNING: no face detected, unable to extract the keypoints!\033[0m")
            #raise Exception('Face Keypoints Image: No face detected.')

        return (face_kps,)

```
