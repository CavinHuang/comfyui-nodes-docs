---
tags:
- Image
- Segmentation
---

# BBOX Detector (SEGS)
## Documentation
- Class name: `BboxDetectorSEGS`
- Category: `ImpactPack/Detector`
- Output node: `False`

The BboxDetectorSEGS node is designed to detect bounding boxes around objects within images, leveraging segmentation techniques to enhance the accuracy and detail of the detection process. It combines the capabilities of bounding box detection with segmentation to provide a more comprehensive understanding of the objects' shapes and boundaries.
## Input types
### Required
- **`bbox_detector`**
    - Specifies the bounding box detector model to be used for detecting objects within the image. It plays a crucial role in the initial detection phase before segmentation is applied.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `object`
- **`image`**
    - The input images or frames on which object detection and segmentation are to be performed. This is the primary data that the node operates on.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`threshold`**
    - A threshold value for bounding box detection, determining the sensitivity of the detector to potential objects within the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dilation`**
    - Specifies the dilation applied to the detected bounding boxes, allowing for adjustments in the size of the bounding area around detected objects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - Determines the extent to which the area around the detected object is included in the crop, affecting the context provided around the detected object.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`drop_size`**
    - Sets the minimum size for detected objects, filtering out objects smaller than this size to focus on more significant detections.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`labels`**
    - Optional labels to filter the detected objects, allowing for selective segmentation based on specified categories.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[List[str]]`
### Optional
- **`detailer_hook`**
    - An optional hook for detailed processing or modifications of the detection and segmentation process, providing a way to customize the output.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `Optional[Callable]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output of the node includes segmentation information derived from the detected bounding boxes, providing detailed insights into the objects' shapes and boundaries.
    - Python dtype: `List[Dict[str, Any]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [DetailerForEach](../../ComfyUI-Impact-Pack/Nodes/DetailerForEach.md)
    - [SAMDetectorCombined](../../ComfyUI-Impact-Pack/Nodes/SAMDetectorCombined.md)
    - [ImpactSegsAndMask](../../ComfyUI-Impact-Pack/Nodes/ImpactSegsAndMask.md)
    - Segs & Mask
    - [ImpactSEGSOrderedFilter](../../ComfyUI-Impact-Pack/Nodes/ImpactSEGSOrderedFilter.md)



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
