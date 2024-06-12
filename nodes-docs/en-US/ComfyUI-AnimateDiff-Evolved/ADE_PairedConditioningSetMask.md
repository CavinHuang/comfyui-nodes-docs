---
tags:
- Conditioning
---

# Set Props on Conds 🎭🅐🅓
## Documentation
- Class name: `ADE_PairedConditioningSetMask`
- Category: `Animate Diff 🎭🅐🅓/conditioning`
- Output node: `False`

The ADE_PairedConditioningSetMask node is designed to apply masking and conditioning adjustments to a pair of conditioning inputs. It utilizes additional parameters such as strength, set condition area, and optional elements like masks, Lora hooks, and timestep conditions to fine-tune the conditioning process, aiming to enhance or modify the generated content's attributes according to the specified adjustments.
## Input types
### Required
- **`positive_ADD`**
    - Specifies the positive conditioning input to be adjusted. It plays a crucial role in defining the attributes or features to be enhanced or modified in the generated content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`negative_ADD`**
    - Specifies the negative conditioning input to be adjusted. It is essential for defining the attributes or features to be diminished or altered in the opposite manner to the positive conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`strength`**
    - Determines the intensity of the conditioning adjustment. A higher value indicates a stronger effect on the conditioning inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Defines the area of the conditioning inputs to be affected by the adjustments. It allows for targeted modifications within the conditioning inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `COND_CONST._LIST_COND_AREA`
### Optional
- **`opt_mask`**
    - An optional mask that can be applied to the conditioning inputs for more precise adjustments.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
- **`opt_lora_hook`**
    - An optional Lora hook that can be applied for additional conditioning transformations.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`opt_timesteps`**
    - Optional timesteps condition that allows for temporal adjustments to the conditioning inputs.
    - Comfy dtype: `TIMESTEPS_COND`
    - Python dtype: `TimestepsCond`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The adjusted positive conditioning output after applying the specified adjustments.
    - Python dtype: `CONDITIONING`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The adjusted negative conditioning output after applying the specified adjustments.
    - Python dtype: `CONDITIONING`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PairedConditioningSetMaskHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive_ADD": ("CONDITIONING", ),
                "negative_ADD": ("CONDITIONING", ),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (COND_CONST._LIST_COND_AREA,),
            },
            "optional": {
                "opt_mask": ("MASK", ),
                "opt_lora_hook": ("LORA_HOOK",),
                "opt_timesteps": ("TIMESTEPS_COND",)
            }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("positive", "negative")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "append_and_hook"

    def append_and_hook(self, positive_ADD, negative_ADD,
                        strength: float, set_cond_area: str,
                        opt_mask: Tensor=None, opt_lora_hook: LoraHookGroup=None, opt_timesteps: TimestepsCond=None):
        final_positive, final_negative = set_mask_conds(conds=[positive_ADD, negative_ADD],
                                                        strength=strength, set_cond_area=set_cond_area,
                                                        opt_mask=opt_mask, opt_lora_hook=opt_lora_hook, opt_timesteps=opt_timesteps)
        return (final_positive, final_negative)

```
