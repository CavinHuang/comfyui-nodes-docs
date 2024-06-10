---
tags:
- IPAdapter
- RegionalImageProcessing
---

# IPAdapter Regional Conditioning
## Documentation
- Class name: `IPAdapterRegionalConditioning`
- Category: `ipadapter/params`
- Output node: `False`

The IPAdapterRegionalConditioning node is designed to apply regional conditioning to images using IPAdapter techniques. It focuses on enhancing or altering specific regions of an image based on given conditions, potentially including alternative conditions, unconditional inputs, and various weighting and masking strategies. This node plays a crucial role in customizing image processing tasks by allowing for detailed control over how different areas of an image are treated, making it essential for tasks that require precise adjustments or enhancements.
## Input types
### Required
- **`image`**
    - The image to which regional conditioning will be applied, serving as the primary subject for the conditioning process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_weight`**
    - Defines the weight of the image in the conditioning process, influencing the balance between the image and the conditioning effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`prompt_weight`**
    - Specifies the weight of the prompt in the conditioning process, affecting the influence of textual conditions on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`start_at`**
    - Indicates the starting point in the process where the conditioning begins to take effect, allowing for phased application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Defines the ending point in the process where the conditioning ceases, enabling precise control over the duration of the effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask`**
    - unknown
    - Comfy dtype: `MASK`
    - Python dtype: `unknown`
- **`positive`**
    - A set of positive conditions under which the regional conditioning is applied, guiding the enhancements or adjustments.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`negative`**
    - A set of negative conditions that the regional conditioning aims to mitigate or alter, providing a counterbalance to the positive conditions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
## Output types
- **`IPADAPTER_PARAMS`**
    - Comfy dtype: `IPADAPTER_PARAMS`
    - The parameters configured for the IPAdapter, detailing how the image and conditions are processed together.
    - Python dtype: `dict`
- **`POSITIVE`**
    - Comfy dtype: `CONDITIONING`
    - The modified set of positive conditions after the conditioning process, reflecting the applied enhancements.
    - Python dtype: `list`
- **`NEGATIVE`**
    - Comfy dtype: `CONDITIONING`
    - The modified set of negative conditions after the conditioning process, reflecting the mitigated or altered aspects.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterRegionalConditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            #"set_cond_area": (["default", "mask bounds"],),
            "image": ("IMAGE",),
            "image_weight": ("FLOAT", { "default": 1.0, "min": -1.0, "max": 3.0, "step": 0.05 }),
            "prompt_weight": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 10.0, "step": 0.05 }),
            "weight_type": (WEIGHT_TYPES, ),
            "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
            "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
        }, "optional": {
            "mask": ("MASK",),
            "positive": ("CONDITIONING",),
            "negative": ("CONDITIONING",),
        }}

    RETURN_TYPES = ("IPADAPTER_PARAMS", "CONDITIONING", "CONDITIONING", )
    RETURN_NAMES = ("IPADAPTER_PARAMS", "POSITIVE", "NEGATIVE")
    FUNCTION = "conditioning"

    CATEGORY = "ipadapter/params"

    def conditioning(self, image, image_weight, prompt_weight, weight_type, start_at, end_at, mask=None, positive=None, negative=None):
        set_area_to_bounds = False #if set_cond_area == "default" else True

        if mask is not None:
            if positive is not None:
                positive = conditioning_set_values(positive, {"mask": mask, "set_area_to_bounds": set_area_to_bounds, "mask_strength": prompt_weight})
            if negative is not None:
                negative = conditioning_set_values(negative, {"mask": mask, "set_area_to_bounds": set_area_to_bounds, "mask_strength": prompt_weight})

        ipadapter_params = {
            "image": [image],
            "attn_mask": [mask],
            "weight": [image_weight],
            "weight_type": [weight_type],
            "start_at": [start_at],
            "end_at": [end_at],
        }
        
        return (ipadapter_params, positive, negative, )

```
