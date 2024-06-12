---
tags:
- Image
- Segmentation
---

# Simple Detector (SEGS/pipe)
## Documentation
- Class name: `ImpactSimpleDetectorSEGSPipe`
- Category: `ImpactPack/Detector`
- Output node: `False`

This node is designed to perform detection tasks on images, utilizing segmentation models to identify and process specific features or objects within those images. It abstracts the complexity of segmentation and detection algorithms, providing a straightforward interface for segmenting images and detecting objects or features based on specified criteria.
## Input types
### Required
- **`detailer_pipe`**
    - Specifies the pipeline for detailing the detection process, enhancing the precision of detected segments.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `str`
- **`image`**
    - The input image to be processed for segmentation and detection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`bbox_threshold`**
    - The threshold value for bounding box detection, controlling the sensitivity of the detection process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_dilation`**
    - Determines the dilation level of bounding boxes, affecting the size and coverage of detected segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - Controls the cropping factor for the detected segments, influencing the area around the detected features that is included in the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`drop_size`**
    - Specifies the minimum size for detected segments, filtering out smaller detections.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sub_threshold`**
    - The threshold for sub-segment detection, refining the detection process within the already detected segments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sub_dilation`**
    - Determines the dilation level for sub-segments, adjusting the coverage within detected segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sub_bbox_expansion`**
    - Controls the expansion of bounding boxes for sub-segments, affecting the area covered by each sub-segment detection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sam_mask_hint_threshold`**
    - The threshold for mask hinting in SAM models, influencing the selection of segments based on their relevance to the SAM model's criteria.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`post_dilation`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - Produces segmented parts of the image based on the detection criteria, including detailed information about each segment.
    - Python dtype: `List[Tuple[numpy.ndarray, dict]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SimpleDetectorForEachPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "detailer_pipe": ("DETAILER_PIPE", ),
                        "image": ("IMAGE", ),

                        "bbox_threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                        "bbox_dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),

                        "crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 100, "step": 0.1}),
                        "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 10}),

                        "sub_threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                        "sub_dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                        "sub_bbox_expansion": ("INT", {"default": 0, "min": 0, "max": 1000, "step": 1}),

                        "sam_mask_hint_threshold": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.01}),
                      },
                "optional": {
                        "post_dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                      }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detector"

    def doit(self, detailer_pipe, image, bbox_threshold, bbox_dilation, crop_factor, drop_size,
             sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, post_dilation=0):

        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: SimpleDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')

        model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative = detailer_pipe

        return SimpleDetectorForEach.detect(bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size,
                                            sub_threshold, sub_dilation, sub_bbox_expansion,
                                            sam_mask_hint_threshold, post_dilation=post_dilation, sam_model_opt=sam_model_opt, segm_detector_opt=segm_detector_opt,
                                            detailer_hook=detailer_hook)

```
