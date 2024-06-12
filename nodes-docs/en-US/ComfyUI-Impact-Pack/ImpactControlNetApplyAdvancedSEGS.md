---
tags:
- ControlNet
---

# ControlNetApplyAdvanced (SEGS)
## Documentation
- Class name: `ImpactControlNetApplyAdvancedSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

This node applies an advanced control network to SEGS (segmentation masks) with additional parameters for fine-tuning the application process. It allows for the dynamic adjustment of the control network's influence over the segmentation masks, enabling more precise and context-sensitive modifications.
## Input types
### Required
- **`segs`**
    - The segmentation masks to which the control network will be applied. It's crucial for defining the areas of interest for modification.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Size, List[SEG]]`
- **`control_net`**
    - The control network used to modify the segmentation masks. It determines the nature of the modifications applied to the segs.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNet`
- **`strength`**
    - A scalar value that adjusts the intensity of the control network's effect on the segmentation masks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - The starting percentage of the control network's effect, allowing for gradual application from a certain point.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - The ending percentage of the control network's effect, enabling the control network's influence to taper off.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`segs_preprocessor`**
    - An optional preprocessor for the segmentation masks before applying the control network. It can be used for initial adjustments.
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Python dtype: `Optional[Preprocessor]`
- **`control_image`**
    - An optional image that can be used alongside the control network to further guide the modifications applied to the segmentation masks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Image]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The modified segmentation masks after the application of the control network, reflecting the adjustments made.
    - Python dtype: `Tuple[Size, List[SEG]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ControlNetApplyAdvancedSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "segs": ("SEGS",),
                    "control_net": ("CONTROL_NET",),
                    "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                    "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})
                    },
                "optional": {
                    "segs_preprocessor": ("SEGS_PREPROCESSOR",),
                    "control_image": ("IMAGE",)
                    }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, control_net, strength, start_percent, end_percent, segs_preprocessor=None, control_image=None):
        new_segs = []

        for seg in segs[1]:
            control_net_wrapper = core.ControlNetAdvancedWrapper(control_net, strength, start_percent, end_percent, segs_preprocessor,
                                                                 seg.control_net_wrapper, original_size=segs[0], crop_region=seg.crop_region,
                                                                 control_image=control_image)
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, control_net_wrapper)
            new_segs.append(new_seg)

        return ((segs[0], new_segs), )

```
