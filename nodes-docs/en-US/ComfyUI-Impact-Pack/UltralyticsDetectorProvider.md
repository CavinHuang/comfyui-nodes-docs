---
tags:
- Image
- Segmentation
---

# UltralyticsDetectorProvider
## Documentation
- Class name: `UltralyticsDetectorProvider`
- Category: `ImpactPack`
- Output node: `False`

This node is designed to load and provide access to detection models, facilitating object detection tasks by leveraging models trained with the Ultralytics framework.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the model to be loaded, which is crucial for identifying and accessing the correct model file for object detection tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`bbox_detector`**
    - Comfy dtype: `BBOX_DETECTOR`
    - Provides an object detector that identifies bounding boxes around detected objects in images.
    - Python dtype: `torch.nn.Module`
- **`segm_detector`**
    - Comfy dtype: `SEGM_DETECTOR`
    - Offers a segmentation model capable of delineating the precise shape of objects by classifying each pixel of the image.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [BboxDetectorSEGS](../../ComfyUI-Impact-Pack/Nodes/BboxDetectorSEGS.md)
    - [ToDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipe.md)
    - [ImpactSimpleDetectorSEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactSimpleDetectorSEGS.md)
    - Reroute
    - [ImpactSimpleDetectorSEGS_for_AD](../../ComfyUI-Impact-Pack/Nodes/ImpactSimpleDetectorSEGS_for_AD.md)
    - [SegmDetectorSEGS](../../ComfyUI-Impact-Pack/Nodes/SegmDetectorSEGS.md)
    - [ToDetailerPipeSDXL](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipeSDXL.md)



## Source code
```python
class UltralyticsDetectorProvider:
    @classmethod
    def INPUT_TYPES(s):
        bboxs = ["bbox/"+x for x in folder_paths.get_filename_list("ultralytics_bbox")]
        segms = ["segm/"+x for x in folder_paths.get_filename_list("ultralytics_segm")]
        return {"required": {"model_name": (bboxs + segms, )}}
    RETURN_TYPES = ("BBOX_DETECTOR", "SEGM_DETECTOR")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack"

    def doit(self, model_name):
        model_path = folder_paths.get_full_path("ultralytics", model_name)
        model = subcore.load_yolo(model_path)

        if model_name.startswith("bbox"):
            return subcore.UltraBBoxDetector(model), core.NO_SEGM_DETECTOR()
        else:
            return subcore.UltraBBoxDetector(model), subcore.UltraSegmDetector(model)

```
