---
tags:
- Image
- Segmentation
---

# BBOX Detector (combined)
## Documentation
- Class name: `BboxDetectorCombined_v2`
- Category: `ImpactPack/Detector`
- Output node: `False`

This node combines bounding box detection with segmentation mask creation and optional dilation, providing a comprehensive solution for object detection and segmentation in images. It leverages a bounding box model to detect objects and generate segmentation masks, which can then be optionally dilated for improved coverage or specificity.
## Input types
### Required
- **`bbox_detector`**
    - Specifies the bounding box model to be used for object detection. It plays a crucial role in identifying objects within the image and generating initial bounding boxes.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `str`
- **`image`**
    - The input image on which object detection and segmentation are to be performed. It serves as the primary data source for the detection process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - A threshold value to filter detected objects based on confidence scores. It helps in eliminating detections with low confidence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dilation`**
    - Determines the extent to which the segmentation masks are dilated. This can enhance the mask's coverage over the detected objects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output segmentation mask representing detected objects. It combines all individual object masks into a single mask layer.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BboxDetectorCombined(SegmDetectorCombined):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "bbox_detector": ("BBOX_DETECTOR", ),
                        "image": ("IMAGE", ),
                        "threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                        "dilation": ("INT", {"default": 4, "min": -512, "max": 512, "step": 1}),
                      }
                }

    def doit(self, bbox_detector, image, threshold, dilation):
        mask = bbox_detector.detect_combined(image, threshold, dilation)

        if mask is None:
            mask = torch.zeros((image.shape[2], image.shape[1]), dtype=torch.float32, device="cpu")

        return (mask.unsqueeze(0),)

```
