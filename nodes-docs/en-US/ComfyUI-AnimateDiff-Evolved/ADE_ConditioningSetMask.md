---
tags:
- Conditioning
---

# Set Props on Cond 🎭🅐🅓
## Documentation
- Class name: `ADE_ConditioningSetMask`
- Category: `Animate Diff 🎭🅐🅓/conditioning/single cond ops`
- Output node: `False`

This node is designed to apply a mask to conditioning data, adjusting the area and strength of the conditioning based on specified parameters. It enables the dynamic modification of conditioning inputs to better align with desired outcomes, such as focusing on or excluding specific areas within the data.
## Input types
### Required
- **`cond_ADD`**
    - The conditioning data to be added or modified. This parameter is essential for introducing new contexts or content into the existing conditioning framework.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Tensor`
- **`strength`**
    - Defines the intensity of the mask's effect on the conditioning data, allowing for fine-tuned control over the modification's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Determines whether the mask's effect is applied to the default area or the bounds of the mask, providing flexibility in targeting specific regions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`opt_mask`**
    - An optional mask that specifies the areas of the conditioning data to be modified, offering additional control over which parts of the conditioning are affected.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
- **`opt_lora_hook`**
    - An optional parameter that allows for the application of Lora hooks to the conditioning, further customizing the conditioning process.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`opt_timesteps`**
    - Optional timesteps conditioning, enabling temporal adjustments to the conditioning data.
    - Comfy dtype: `TIMESTEPS_COND`
    - Python dtype: `TimestepsCond`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data, reflecting the applied mask and adjustments, including any additional conditioning data added.
    - Python dtype: `Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetMaskHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
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
    FUNCTION = "append_and_hook"

    def append_and_hook(self, cond_ADD,
                        strength: float, set_cond_area: str,
                        opt_mask: Tensor=None, opt_lora_hook: LoraHookGroup=None, opt_timesteps: TimestepsCond=None):
        (final_conditioning,) = set_mask_conds(conds=[cond_ADD],
                                               strength=strength, set_cond_area=set_cond_area,
                                               opt_mask=opt_mask, opt_lora_hook=opt_lora_hook, opt_timesteps=opt_timesteps)
        return (final_conditioning,) 

```
