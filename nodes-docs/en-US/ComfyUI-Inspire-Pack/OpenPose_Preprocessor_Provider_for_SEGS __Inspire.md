---
tags:
- SEGSPrep
- Segmentation
---

# OpenPose Preprocessor Provider (SEGS)
## Documentation
- Class name: `OpenPose_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessor for SEGS (semantic segmentation) using OpenPose, enabling the detection and processing of human hands, bodies, and faces within images. It allows for the adjustment of detection features and image resolution scaling to prepare images for further processing or analysis.
## Input types
### Required
- **`detect_hand`**
    - Enables or disables the detection of hands in the image, affecting the node's ability to identify and process hand-related features.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`detect_body`**
    - Enables or disables the detection of bodies in the image, influencing the node's capability to recognize and process body-related features.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`detect_face`**
    - Enables or disables the detection of faces in the image, impacting the node's ability to identify and process face-related features.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`resolution_upscale_by`**
    - Adjusts the resolution of the image by a specified upscale factor, affecting the clarity and detail of the processed image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Provides a preprocessed image object ready for semantic segmentation tasks, specifically tailored for SEGS applications.
    - Python dtype: `OpenPose_Preprocessor_wrapper`
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
