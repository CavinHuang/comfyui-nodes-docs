---
tags:
- SEGSPrep
- Segmentation
---

# DWPreprocessor Provider (SEGS)
## Documentation
- Class name: `DWPreprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

The DWPreprocessor Provider for SEGS is designed to preprocess images for segmentation tasks by detecting various elements such as hands, body, and face, and adjusting image resolution. It utilizes bounding box detectors and pose estimators to enhance the input data for better segmentation results.
## Input types
### Required
- **`detect_hand`**
    - Enables or disables hand detection in the preprocessing step, affecting the focus and accuracy of the segmentation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`detect_body`**
    - Enables or disables body detection, influencing the segmentation process by identifying body outlines.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`detect_face`**
    - Activates or deactivates face detection, impacting the segmentation by highlighting facial features.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`resolution_upscale_by`**
    - Adjusts the resolution of the input image by a specified upscale factor, enhancing the detail level for segmentation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_detector`**
    - Specifies the bounding box detector model to use, affecting the precision of element detection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pose_estimator`**
    - Determines the pose estimator model to employ, enhancing the segmentation with accurate pose information.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Provides a preprocessed input tailored for segmentation tasks, incorporating detected elements and resolution adjustments.
    - Python dtype: `object`
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
