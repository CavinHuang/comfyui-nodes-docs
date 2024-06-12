---
tags:
- Conditioning
---

# Set Props and Combine Cond 🎭🅐🅓
## Documentation
- Class name: `ADE_ConditioningSetMaskAndCombine`
- Category: `Animate Diff 🎭🅐🅓/conditioning/single cond ops`
- Output node: `False`

This node specializes in the advanced manipulation of conditioning data for generative models, specifically focusing on the application and combination of masks and additional conditioning layers. It enables the enhancement or modification of existing conditioning through the application of masks, strength adjustments, and the integration of new conditioning data, thereby allowing for more precise control over the generative process.
## Input types
### Required
- **`cond`**
    - The original conditioning data to be enhanced or modified. It serves as the base upon which additional conditioning layers and masks are applied, directly influencing the final output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CustomType[CONDITIONING]`
- **`cond_ADD`**
    - Additional conditioning data to be combined with the original conditioning. This layer is applied on top of the existing conditioning, allowing for the introduction of new features or modifications.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CustomType[CONDITIONING]`
- **`strength`**
    - A scalar value that determines the intensity of the mask application on the conditioning. It controls how strongly the additional conditioning and masks affect the original data.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Specifies the area within the conditioning data where modifications are targeted, without mentioning a specific type.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`opt_mask`**
    - An optional mask that can be applied to the conditioning data. It allows for selective enhancement or modification of specific areas within the conditioning.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`opt_lora_hook`**
    - An optional LoraHookGroup that can be applied for further manipulation of the conditioning data. It provides additional flexibility in modifying the conditioning.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`opt_timesteps`**
    - Optional timesteps for conditional manipulation. This parameter allows for the application of modifications at specific points in the generative process.
    - Comfy dtype: `TIMESTEPS_COND`
    - Python dtype: `TimestepsCond`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The enhanced or modified conditioning data, resulting from the application of additional conditioning layers, masks, and adjustments.
    - Python dtype: `CustomType[CONDITIONING]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetMaskAndCombineHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cond": ("CONDITIONING",),
                "cond_ADD": ("CONDITIONING",),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (COND_CONST._LIST_COND_AREA,),
            },
            "optional": {
                "opt_mask": ("MASK", ),
                "opt_lora_hook": ("LORA_HOOK",),
                "opt_timesteps": ("TIMESTEPS_COND",)
            }
        }
    
    RETURN_TYPES = ("CONDITIONING",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/single cond ops"
    FUNCTION = "append_and_combine"

    def append_and_combine(self, conditioning, conditioning_ADD,
                           strength: float, set_cond_area: str,
                           opt_mask: Tensor=None, opt_lora_hook: LoraHookGroup=None, opt_timesteps: TimestepsCond=None):
        (final_conditioning,) = set_mask_and_combine_conds(conds=[conditioning], new_conds=[conditioning_ADD],
                                                                    strength=strength, set_cond_area=set_cond_area,
                                                                    opt_mask=opt_mask, opt_lora_hook=opt_lora_hook, opt_timesteps=opt_timesteps)
        return (final_conditioning,)

```
