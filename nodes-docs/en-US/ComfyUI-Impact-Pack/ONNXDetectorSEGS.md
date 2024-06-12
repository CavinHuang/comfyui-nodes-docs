---
tags:
- Image
- Segmentation
---

# ONNX Detector (SEGS/legacy) - use BBOXDetector
## Documentation
- Class name: `ONNXDetectorSEGS`
- Category: `ImpactPack/Detector`
- Output node: `False`

This node is designed to utilize an ONNX model for detecting and segmenting objects within images. It leverages deep learning techniques to analyze image data and output segmented regions, making it suitable for applications requiring precise object localization and segmentation.
## Input types
### Required
- **`bbox_detector`**
    - The bounding box detector model used for detection. It plays a critical role in identifying regions of interest within the image, which are then processed for segmentation.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `core.BBoxDetector`
- **`image`**
    - The input image to be processed. This image is analyzed by the detector model to identify and segment objects within it.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`threshold`**
    - A threshold value for detection confidence. Objects with confidence scores above this threshold are considered detected and segmented.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dilation`**
    - Specifies the dilation factor for the segmented regions. This can be used to expand or contract the segmented areas, affecting the final segmentation output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - A factor that determines how much to crop around the detected objects. It affects the size of the output segmented regions by defining the margin around detected objects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`drop_size`**
    - The minimum size of objects to be considered in the segmentation. Objects smaller than this size are ignored, affecting the granularity of the segmentation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`labels`**
    - Optional labels to filter the detected objects. Only objects with these labels will be included in the segmentation output.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
### Optional
- **`detailer_hook`**
    - An optional hook for custom post-processing of the detected objects. It allows for additional customization of the segmentation process.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `Callable`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output segmented regions of the image. These regions are the result of the detector model's detection and segmentation process, providing detailed localization of objects within the image.
    - Python dtype: `Tuple[Shape, List[SEG]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BboxDetectorForEach:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "bbox_detector": ("BBOX_DETECTOR", ),
                        "image": ("IMAGE", ),
                        "threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                        "dilation": ("INT", {"default": 10, "min": -512, "max": 512, "step": 1}),
                        "crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 100, "step": 0.1}),
                        "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 10}),
                        "labels": ("STRING", {"multiline": True, "default": "all", "placeholder": "List the types of segments to be allowed, separated by commas"}),
                      },
                "optional": {"detailer_hook": ("DETAILER_HOOK",), }
                }

    RETURN_TYPES = ("SEGS", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detector"

    def doit(self, bbox_detector, image, threshold, dilation, crop_factor, drop_size, labels=None, detailer_hook=None):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: BboxDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')

        segs = bbox_detector.detect(image, threshold, dilation, crop_factor, drop_size, detailer_hook)

        if labels is not None and labels != '':
            labels = labels.split(',')
            if len(labels) > 0:
                segs, _ = segs_nodes.SEGSLabelFilter.filter(segs, labels)

        return (segs, )

```
