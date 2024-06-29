---
tags:
- Image
- Segmentation
---

# ONNXDetectorProvider
## Documentation
- Class name: `ONNXDetectorProvider`
- Category: `ImpactPack`
- Output node: `False`

The ONNXDetectorProvider node is designed to load and provide access to ONNX models for object detection. It serves as a bridge between the ONNX model files and the detection functionality, enabling the use of pre-trained ONNX models for detecting objects within images.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the ONNX model to be loaded. This parameter is crucial for identifying and accessing the correct model file for object detection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`bbox_detector`**
    - Comfy dtype: `BBOX_DETECTOR`
    - Provides an object detector initialized with the specified ONNX model. This detector is capable of identifying bounding boxes around objects within images.
    - Python dtype: `core.ONNXDetector`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ONNXDetectorProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model_name": (folder_paths.get_filename_list("onnx"), )}}

    RETURN_TYPES = ("BBOX_DETECTOR", )
    FUNCTION = "load_onnx"

    CATEGORY = "ImpactPack"

    def load_onnx(self, model_name):
        model = folder_paths.get_full_path("onnx", model_name)
        return (core.ONNXDetector(model), )

```
