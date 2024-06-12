---
tags:
- MediaPipeFaceMesh
- Segmentation
---

# MediaPipe FaceMesh Preprocessor Provider (SEGS)
## Documentation
- Class name: `MediaPipe_FaceMesh_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessor for SEGS (semantic segmentation) tasks, specifically utilizing MediaPipe's FaceMesh technology to detect facial features and landmarks. It is designed to enhance the input data for SEGS models by applying face mesh detection, allowing for more accurate and detailed segmentation of facial regions.
## Input types
### Required
- **`max_faces`**
    - Specifies the maximum number of faces to detect in the input image. This parameter helps in optimizing the detection process for images with multiple faces.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_confidence`**
    - Sets the minimum confidence threshold for detecting faces. Faces with a confidence score below this threshold will not be considered, ensuring that only faces detected with sufficient certainty are processed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution_upscale_by`**
    - Determines the factor by which the input image's resolution is upscaled before face mesh detection. Upscaling can improve the detection of facial features in lower-resolution images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Returns a preprocessor object configured for SEGS tasks, specifically tailored for facial feature detection using MediaPipe's FaceMesh technology.
    - Python dtype: `object`
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
