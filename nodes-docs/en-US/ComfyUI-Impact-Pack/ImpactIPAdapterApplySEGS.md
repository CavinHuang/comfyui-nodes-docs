---
tags:
- IPAdapter
---

# IPAdapterApply (SEGS)
## Documentation
- Class name: `ImpactIPAdapterApplySEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

This node applies an IP Adapter to SEGS (segmentation elements), enhancing or modifying them based on a set of parameters and a reference image. It is designed to work within the context of image processing, particularly in adjusting and refining segmentation results through advanced control mechanisms.
## Input types
### Required
- **`segs`**
    - The segmentation elements to be processed, providing the basis for the adaptation process.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[Tuple[Any, List[SEG]]]`
- **`ipadapter_pipe`**
    - A pipeline of IP Adapter configurations, dictating how the segmentation elements are to be modified.
    - Comfy dtype: `IPADAPTER_PIPE`
    - Python dtype: `List[Dict[str, Any]]`
- **`weight`**
    - A weight factor influencing the adaptation strength.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Noise level to be applied during the adaptation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Specifies the type of weight application in the adaptation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - Defines the starting point within the segmentation elements for the adaptation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_at`**
    - Defines the ending point within the segmentation elements for the adaptation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`unfold_batch`**
    - Determines whether the adaptation process should unfold across batches.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`faceid_v2`**
    - Indicates whether to use an updated version of face identification in the adaptation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`weight_v2`**
    - A secondary weight factor for the adaptation, potentially for an updated adaptation mechanism.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`context_crop_factor`**
    - A factor determining the extent of the context crop around the segmentation elements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`reference_image`**
    - The reference image against which the segmentation elements are adapted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`combine_embeds`**
    - Method for combining embeddings in the adaptation process, defaulting to 'concat'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`neg_image`**
    - An optional negative image to be considered during the adaptation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The adapted segmentation elements, reflecting the applied modifications.
    - Python dtype: `List[Tuple[Any, List[SEG]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterApplySEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "segs": ("SEGS",),
                    "ipadapter_pipe": ("IPADAPTER_PIPE",),
                    "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                    "noise": ("FLOAT", {"default": 0.4, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "weight_type": (["original", "linear", "channel penalty"], {"default": 'channel penalty'}),
                    "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_at": ("FLOAT", {"default": 0.9, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "unfold_batch": ("BOOLEAN", {"default": False}),
                    "faceid_v2": ("BOOLEAN", {"default": False}),
                    "weight_v2": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                    "context_crop_factor": ("FLOAT", {"default": 1.2, "min": 1.0, "max": 100, "step": 0.1}),
                    "reference_image": ("IMAGE",),
                    },
                "optional": {
                    "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                    "neg_image": ("IMAGE",),
                    },
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, ipadapter_pipe, weight, noise, weight_type, start_at, end_at, unfold_batch, faceid_v2, weight_v2, context_crop_factor, reference_image, combine_embeds="concat", neg_image=None):

        if len(ipadapter_pipe) == 4:
            print(f"[Impact Pack] IPAdapterApplySEGS: Installed Inspire Pack is outdated.")
            raise Exception("Inspire Pack is outdated.")

        new_segs = []

        h, w = segs[0]

        if reference_image.shape[2] != w or reference_image.shape[1] != h:
            reference_image = tensor_resize(reference_image, w, h)
        
        for seg in segs[1]:
            # The context_crop_region sets how much wider the IPAdapter context will reflect compared to the crop_region, not the bbox
            context_crop_region = make_crop_region(w, h, seg.crop_region, context_crop_factor)
            cropped_image = crop_image(reference_image, context_crop_region)

            control_net_wrapper = core.IPAdapterWrapper(ipadapter_pipe, weight, noise, weight_type, start_at, end_at, unfold_batch, weight_v2, cropped_image, neg_image=neg_image, prev_control_net=seg.control_net_wrapper, combine_embeds=combine_embeds)
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, control_net_wrapper)
            new_segs.append(new_seg)

        return ((segs[0], new_segs), )

```
