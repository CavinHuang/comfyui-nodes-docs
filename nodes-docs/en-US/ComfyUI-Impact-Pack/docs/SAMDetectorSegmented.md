---
tags:
- SAM
---

# SAMDetector (segmented)
## Documentation
- Class name: `SAMDetectorSegmented`
- Category: `ImpactPack/Detector`
- Output node: `False`

The SAMDetectorSegmented node is designed for generating segmented masks based on the SAM model. It processes an image along with segmentation hints and other parameters to produce a detailed mask that highlights specific areas of interest within the image.
## Input types
### Required
- **`sam_model`**
    - The SAM model used for generating the mask. It plays a crucial role in determining the areas of interest within the image based on the provided segmentation hints.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `torch.nn.Module`
- **`segs`**
    - Segmentation details that guide the mask generation process, enhancing the precision of the areas to be highlighted.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[torch.Tensor]`
- **`image`**
    - The input image to be processed. It serves as the base for mask generation, with the SAM model and segmentation hints refining the output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`detection_hint`**
    - Hints that guide the detection process, allowing for more focused and accurate mask generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`dilation`**
    - The dilation parameter adjusts the thickness of the mask's edges, allowing for finer control over the mask's boundary.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`threshold`**
    - A threshold value that determines the sensitivity of mask generation, influencing the areas that will be highlighted.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_expansion`**
    - Controls the expansion of bounding boxes, which can affect the overall size and coverage of the generated mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_hint_threshold`**
    - Sets the threshold for mask hints, influencing how hints are interpreted and applied during mask generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask_hint_use_negative`**
    - Determines whether negative hints are used, affecting the exclusion of certain areas from the mask.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`combined_mask`**
    - Comfy dtype: `MASK`
    - The combined mask output represents the aggregated result of the segmented mask generation, highlighting areas of interest across the entire image.
    - Python dtype: `torch.Tensor`
- **`batch_masks`**
    - Comfy dtype: `MASK`
    - The batch masks output provides individual segmented masks for each segment processed, offering detailed insights into specific areas of interest.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SAMDetectorSegmented:
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

    RETURN_TYPES = ("MASK", "MASK")
    RETURN_NAMES = ("combined_mask", "batch_masks")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detector"

    def doit(self, sam_model, segs, image, detection_hint, dilation,
             threshold, bbox_expansion, mask_hint_threshold, mask_hint_use_negative):
        combined_mask, batch_masks = core.make_sam_mask_segmented(sam_model, segs, image, detection_hint, dilation,
                                                                  threshold, bbox_expansion, mask_hint_threshold,
                                                                  mask_hint_use_negative)
        return (combined_mask, batch_masks, )

```
