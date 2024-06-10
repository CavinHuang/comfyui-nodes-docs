---
tags:
- ImpactPack
- Segmentation
---

# Picker (SEGS)
## Documentation
- Class name: `ImpactSEGSPicker`
- Category: `ImpactPack/Util`
- Output node: `True`

The ImpactSEGSPicker node is designed to select and refine segmentation elements based on user-defined criteria, enhancing the precision of image segmentation outputs. It allows for the customization of segmentation results by applying selection logic to identify and retain only the relevant segments, potentially incorporating fallback options for image processing.
## Input types
### Required
- **`picks`**
    - Specifies the indices of the segmentation elements to be selected, allowing for the customization of the output by retaining only the desired segments.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`segs`**
    - The input segmentation elements to be processed and refined based on the selection criteria.
    - Comfy dtype: `SEGS`
    - Python dtype: `tuple`
### Optional
- **`fallback_image_opt`**
    - An optional fallback image to be used for segment processing in cases where the original segment data is insufficient.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The refined set of segmentation elements after applying the selection and processing logic.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSPicker:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "picks": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": False}),
                    "segs": ("SEGS",),
                    },
                "optional": {
                     "fallback_image_opt": ("IMAGE", ),
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("SEGS", )

    OUTPUT_NODE = True

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, picks, segs, fallback_image_opt=None, unique_id=None):
        if fallback_image_opt is not None:
            segs = core.segs_scale_match(segs, fallback_image_opt.shape)

        # generate candidates image
        cands = []
        for seg in segs[1]:
            if seg.cropped_image is not None:
                cropped_image = seg.cropped_image
            elif fallback_image_opt is not None:
                # take from original image
                cropped_image = crop_image(fallback_image_opt, seg.crop_region)
            else:
                cropped_image = empty_pil_tensor()

            mask_array = seg.cropped_mask.copy()
            mask_array[mask_array < 0.3] = 0.3
            mask_array = mask_array[None, ..., None]
            cropped_image = cropped_image * mask_array

            cands.append(cropped_image)

        impact.impact_server.segs_picker_map[unique_id] = cands

        # pass only selected
        pick_ids = set()

        for pick in picks.split(","):
            try:
                pick_ids.add(int(pick)-1)
            except Exception:
                pass

        new_segs = []
        for i in pick_ids:
            if 0 <= i < len(segs[1]):
                new_segs.append(segs[1][i])

        return ((segs[0], new_segs),)

```
