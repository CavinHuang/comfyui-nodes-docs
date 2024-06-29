---
tags:
- Image
- Segmentation
---

# UltralyticsDetector (Pipe)
## Documentation
- Class name: `easy ultralyticsDetectorPipe`
- Category: `EasyUse/Fix`
- Output node: `False`

This node is designed to integrate Ultralytics object detection models into a pipeline, facilitating the detection of bounding boxes and segmentation masks for objects within images. It leverages Ultralytics' YOLO models to analyze image content and identify objects, providing detailed spatial information that can be used for further image processing or analysis.
## Input types
### Required
- **`model_name`**
    - Specifies the model to be used for detection, allowing for dynamic selection based on available Ultralytics YOLO models. This flexibility supports various detection needs by accommodating different model strengths and capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`bbox_threshold`**
    - Determines the confidence threshold for bounding box detections, filtering out detections with confidence scores below this value to ensure result relevance and accuracy.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_dilation`**
    - Adjusts the size of the detected bounding boxes by dilating or contracting them, enabling fine-tuning of object boundaries for subsequent processing steps.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`bbox_crop_factor`**
    - Controls the extent to which the bounding box is enlarged or shrunk, providing a mechanism to include more or less context around detected objects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`bbox_segm_pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs a pipeline configuration tailored for object detection, including model parameters and detection settings, ready for integration into broader image processing workflows.
    - Python dtype: `Tuple[List[str], float, float, float, List[str]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ultralyticsDetectorForDetailerFix:
    @classmethod
    def INPUT_TYPES(s):
        bboxs = ["bbox/" + x for x in folder_paths.get_filename_list("ultralytics_bbox")]
        segms = ["segm/" + x for x in folder_paths.get_filename_list("ultralytics_segm")]
        return {"required":
                    {"model_name": (bboxs + segms,),
                    "bbox_threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "bbox_dilation": ("INT", {"default": 10, "min": -512, "max": 512, "step": 1}),
                    "bbox_crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 10, "step": 0.1}),
                    }
                }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("bbox_segm_pipe",)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Fix"

    def doit(self, model_name, bbox_threshold, bbox_dilation, bbox_crop_factor):
        if 'UltralyticsDetectorProvider' not in ALL_NODE_CLASS_MAPPINGS:
            raise Exception(f"[ERROR] To use UltralyticsDetectorProvider, you need to install 'Impact Pack'")
        cls = ALL_NODE_CLASS_MAPPINGS['UltralyticsDetectorProvider']
        bbox_detector, segm_detector = cls().doit(model_name)
        pipe = (bbox_detector, bbox_threshold, bbox_dilation, bbox_crop_factor, segm_detector)
        return (pipe,)

```
