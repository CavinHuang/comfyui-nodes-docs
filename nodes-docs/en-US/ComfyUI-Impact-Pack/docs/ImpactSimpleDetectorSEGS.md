---
tags:
- Image
- Segmentation
---

# Simple Detector (SEGS)
## Documentation
- Class name: `ImpactSimpleDetectorSEGS`
- Category: `ImpactPack/Detector`
- Output node: `False`

The ImpactSimpleDetectorSEGS node is designed to perform segmentation detection on images, identifying and isolating specific segments within an image. This node applies advanced segmentation models to analyze images, detect distinct segments based on visual content, and output detailed segmentation information, facilitating further image analysis or processing tasks.
## Input types
### Required
- **`bbox_detector`**
    - Specifies the bounding box detector used for initial detection before segmentation. It's crucial for identifying areas of interest within the image that will be further processed for segmentation.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `str`
- **`image`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`bbox_threshold`**
    - A threshold value for the bounding box detection phase, determining the sensitivity of detecting potential areas of interest.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_dilation`**
    - Specifies the dilation level applied to the bounding boxes detected, affecting the area considered for segmentation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - Determines how much the detected segments are cropped around the bounding boxes, influencing the focus area for segmentation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`drop_size`**
    - Defines the minimum size for segments to be considered valid, filtering out smaller, potentially irrelevant segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sub_threshold`**
    - A secondary threshold used for finer segmentation within the initially detected areas, refining the segmentation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sub_dilation`**
    - The dilation level applied during the secondary segmentation phase, further adjusting the clarity of segment boundaries.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sub_bbox_expansion`**
    - Specifies how much the bounding boxes are expanded during the secondary segmentation phase, allowing for more comprehensive segment detection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sam_mask_hint_threshold`**
    - A threshold value used in conjunction with SAM models to refine segmentation based on semantic cues.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`post_dilation`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`sam_model_opt`**
    - unknown
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `unknown`
- **`segm_detector_opt`**
    - unknown
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `unknown`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output segmentation details, including the shapes and characteristics of the detected segments, enabling further analysis or modification.
    - Python dtype: `Tuple[torch.Tensor, List[Any]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactMakeTileSEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactMakeTileSEGS.md)
    - [ImpactControlNetApplySEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactControlNetApplySEGS.md)
    - [SegsToCombinedMask](../../ComfyUI-Impact-Pack/Nodes/SegsToCombinedMask.md)



## Source code
```python
class SimpleDetectorForEach:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "bbox_detector": ("BBOX_DETECTOR", ),
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
                        "sam_model_opt": ("SAM_MODEL", ),
                        "segm_detector_opt": ("SEGM_DETECTOR", ),
                      }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detector"

    @staticmethod
    def detect(bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size,
               sub_threshold, sub_dilation, sub_bbox_expansion,
               sam_mask_hint_threshold, post_dilation=0, sam_model_opt=None, segm_detector_opt=None,
               detailer_hook=None):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: SimpleDetectorForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')

        if segm_detector_opt is not None and hasattr(segm_detector_opt, 'bbox_detector') and segm_detector_opt.bbox_detector == bbox_detector:
            # Better segm support for YOLO-World detector
            segs = segm_detector_opt.detect(image, sub_threshold, sub_dilation, crop_factor, drop_size, detailer_hook=detailer_hook)
        else:
            segs = bbox_detector.detect(image, bbox_threshold, bbox_dilation, crop_factor, drop_size, detailer_hook=detailer_hook)

            if sam_model_opt is not None:
                mask = core.make_sam_mask(sam_model_opt, segs, image, "center-1", sub_dilation,
                                          sub_threshold, sub_bbox_expansion, sam_mask_hint_threshold, False)
                segs = core.segs_bitwise_and_mask(segs, mask)
            elif segm_detector_opt is not None:
                segm_segs = segm_detector_opt.detect(image, sub_threshold, sub_dilation, crop_factor, drop_size, detailer_hook=detailer_hook)
                mask = core.segs_to_combined_mask(segm_segs)
                segs = core.segs_bitwise_and_mask(segs, mask)

        segs = core.dilate_segs(segs, post_dilation)

        return (segs,)

    def doit(self, bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size,
             sub_threshold, sub_dilation, sub_bbox_expansion,
             sam_mask_hint_threshold, post_dilation=0, sam_model_opt=None, segm_detector_opt=None):

        return SimpleDetectorForEach.detect(bbox_detector, image, bbox_threshold, bbox_dilation, crop_factor, drop_size,
                                            sub_threshold, sub_dilation, sub_bbox_expansion,
                                            sam_mask_hint_threshold, post_dilation=post_dilation,
                                            sam_model_opt=sam_model_opt, segm_detector_opt=segm_detector_opt)

```
