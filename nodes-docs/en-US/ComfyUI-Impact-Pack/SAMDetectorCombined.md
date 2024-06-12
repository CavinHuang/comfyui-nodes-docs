---
tags:
- SAM
---

# SAMDetector (combined)
## Documentation
- Class name: `SAMDetectorCombined`
- Category: `ImpactPack/Detector`
- Output node: `False`

The SAMDetectorCombined node is designed for generating segmentation masks by leveraging a SAM model. It combines various inputs, including image data and segmentation hints, to produce detailed masks that highlight specific areas of interest within the image. This process is crucial for tasks that require precise image analysis and manipulation, such as object detection and image editing.
## Input types
### Required
- **`sam_model`**
    - Specifies the SAM model to be used for mask generation. It plays a crucial role in determining the accuracy and quality of the output masks.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `str`
- **`segs`**
    - Represents the segmentation data that will be refined by the SAM model to produce the final mask. It's essential for guiding the mask generation process.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[torch.Tensor]`
- **`image`**
    - The input image on which the mask generation is performed. It serves as the primary data source for the detection process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`detection_hint`**
    - Provides hints to the model about the expected location and shape of the object to be masked, enhancing the precision of the detection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`dilation`**
    - Adjusts the thickness of the edges in the generated mask, allowing for finer control over the mask's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`threshold`**
    - Sets the confidence threshold for mask generation, determining which areas are included in the final mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_expansion`**
    - Controls the expansion of bounding boxes around detected objects, affecting the mask's coverage area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_hint_threshold`**
    - Determines the threshold for applying mask hints, influencing how hints are used to refine the mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask_hint_use_negative`**
    - Indicates whether negative hints are used, which can exclude certain areas from the mask, providing more control over the mask's content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a detailed mask that highlights specific areas of interest within the image, based on the provided inputs and model predictions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactSegsAndMask](../../ComfyUI-Impact-Pack/Nodes/ImpactSegsAndMask.md)
    - Segs & Mask
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)



## Source code
```python
class SAMDetectorCombined:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "sam_model": ("SAM_MODEL", ),
                        "segs": ("SEGS", ),
                        "image": ("IMAGE", ),
                        "detection_hint": (["center-1", "horizontal-2", "vertical-2", "rect-4", "diamond-4", "mask-area",
                                            "mask-points", "mask-point-bbox", "none"],),
                        "dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                        "threshold": ("FLOAT", {"default": 0.93, "min": 0.0, "max": 1.0, "step": 0.01}),
                        "bbox_expansion": ("INT", {"default": 0, "min": 0, "max": 1000, "step": 1}),
                        "mask_hint_threshold": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.01}),
                        "mask_hint_use_negative": (["False", "Small", "Outter"], )
                      }
                }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detector"

    def doit(self, sam_model, segs, image, detection_hint, dilation,
             threshold, bbox_expansion, mask_hint_threshold, mask_hint_use_negative):
        return (core.make_sam_mask(sam_model, segs, image, detection_hint, dilation,
                                   threshold, bbox_expansion, mask_hint_threshold, mask_hint_use_negative), )

```
