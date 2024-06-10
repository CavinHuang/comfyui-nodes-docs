---
tags:
- ImpactPack
- Segmentation
---

# SEGSToImageList
## Documentation
- Class name: `SEGSToImageList`
- Category: `ImpactPack/Util`
- Output node: `False`

The SEGSToImageList node is designed to convert segmentation data into a list of images. It optionally adjusts the scale of segmentation data to match a fallback image and extracts cropped images from the segmentation data, providing a flexible way to handle segmentation outputs for further processing or visualization.
## Input types
### Required
- **`segs`**
    - The primary input containing segmentation data. It is essential for the operation as it holds the segments to be converted into images.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Any, List[SEG]]`
### Optional
- **`fallback_image_opt`**
    - An optional image used to match the scale of segmentation data. If provided, it ensures that the segmentation data is appropriately scaled to align with the fallback image's dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A list of images extracted from the segmentation data. Each image corresponds to a cropped area from the original segmentation, potentially adjusted for scale.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSToImageList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "segs": ("SEGS", ),
                     },
                "optional": {
                     "fallback_image_opt": ("IMAGE", ),
                    }
                }

    RETURN_TYPES = ("IMAGE",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, fallback_image_opt=None):
        results = list()

        if fallback_image_opt is not None:
            segs = core.segs_scale_match(segs, fallback_image_opt.shape)

        for seg in segs[1]:
            if seg.cropped_image is not None:
                cropped_image = to_tensor(seg.cropped_image)
            elif fallback_image_opt is not None:
                # take from original image
                cropped_image = to_tensor(crop_image(fallback_image_opt, seg.crop_region))
            else:
                cropped_image = empty_pil_tensor()

            results.append(cropped_image)

        if len(results) == 0:
            results.append(empty_pil_tensor())

        return (results,)

```
