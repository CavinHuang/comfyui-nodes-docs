---
tags:
- ControlNet
---

# ControlNetApply (SEGS)
## Documentation
- Class name: `ImpactControlNetApplySEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

This node applies a control network to segmentation data (SEGS), adjusting the segmentation according to the control network's parameters and potentially an additional control image. It's designed to modify segmentation outputs based on specified controls, enhancing or altering the segmentation results in a targeted manner.
## Input types
### Required
- **`segs`**
    - The segmentation data to be modified. It's the primary input over which the control network's effects are applied.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Tuple[Any, List[SEG]]]`
- **`control_net`**
    - The control network to apply to the segmentation data. It defines how the segmentation should be adjusted.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNetWrapper`
- **`strength`**
    - A scalar value that determines the intensity of the control network's effect on the segmentation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`segs_preprocessor`**
    - An optional preprocessor for the segmentation data before applying the control network.
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Python dtype: `Optional[SEGS_PREPROCESSOR]`
- **`control_image`**
    - An optional image that can influence the control network's application to the segmentation data.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The modified segmentation data after applying the control network.
    - Python dtype: `Tuple[Tuple[Any, List[SEG]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [DetailerForEachDebugPipe](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebugPipe.md)
    - [ImpactControlNetApplySEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactControlNetApplySEGS.md)



## Source code
```python
class ControlNetApplySEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "segs": ("SEGS",),
                    "control_net": ("CONTROL_NET",),
                    "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                    },
                "optional": {
                    "segs_preprocessor": ("SEGS_PREPROCESSOR",),
                    "control_image": ("IMAGE",)
                    }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, control_net, strength, segs_preprocessor=None, control_image=None):
        new_segs = []

        for seg in segs[1]:
            control_net_wrapper = core.ControlNetWrapper(control_net, strength, segs_preprocessor, seg.control_net_wrapper,
                                                         original_size=segs[0], crop_region=seg.crop_region, control_image=control_image)
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, control_net_wrapper)
            new_segs.append(new_seg)

        return ((segs[0], new_segs), )

```
