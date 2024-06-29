---
tags:
- Image
- Segmentation
---

# SEGM Detector (SEGS)
## Documentation
- Class name: `SegmDetectorSEGS`
- Category: `ImpactPack/Detector`
- Output node: `False`

This node is designed to process images through segmentation models to detect and segment objects within the images. It applies various operations such as thresholding and dilation to refine the segmentation masks, and optionally crops the images based on the detected segments. The node aims to facilitate detailed object analysis within images by providing segmented regions along with their corresponding metadata.
## Input types
### Required
- **`segm_detector`**
    - Specifies the segmentation detector to be used for detecting and segmenting objects within the image. It is crucial for defining the detection capabilities and accuracy of the node.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `object`
- **`image`**
    - The input image to be processed. This image is analyzed by the segmentation model to identify and segment objects.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`threshold`**
    - A threshold value used to determine the sensitivity of object detection. Higher values result in fewer detections with higher confidence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dilation`**
    - An integer value specifying the amount of dilation to apply to the segmentation masks, enhancing the visibility and separation of detected objects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - Determines the extent to which the image is cropped around the detected segments, allowing for focused analysis on specific objects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`drop_size`**
    - Specifies the minimum size for detected objects to be considered valid. Objects smaller than this size are dropped from the results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`labels`**
    - A list of labels to filter the detected segments. Only segments with matching labels are included in the results.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
### Optional
- **`detailer_hook`**
    - An optional hook for custom post-processing of the detected segments. It allows for further refinement of the segmentation results.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `Callable`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - Provides detailed segmentation results, including the shape of the original image and a list of segmented objects with their respective masks, confidence levels, and bounding boxes.
    - Python dtype: `Tuple[numpy.ndarray, List[SEG]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactSEGSOrderedFilter](../../ComfyUI-Impact-Pack/Nodes/ImpactSEGSOrderedFilter.md)



## Source code
```python
class SegmDetectorForEach:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segm_detector": ("SEGM_DETECTOR", ),
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

    def doit(self, segm_detector, image, threshold, dilation, crop_factor, drop_size, labels=None, detailer_hook=None):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: SegmDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')

        segs = segm_detector.detect(image, threshold, dilation, crop_factor, drop_size, detailer_hook)

        if labels is not None and labels != '':
            labels = labels.split(',')
            if len(labels) > 0:
                segs, _ = segs_nodes.SEGSLabelFilter.filter(segs, labels)

        return (segs, )

```
