---
tags:
- Conditioning
---

# Set Unmasked Cond 🎭🅐🅓
## Documentation
- Class name: `ADE_ConditioningSetUnmaskedAndCombine`
- Category: `Animate Diff 🎭🅐🅓/conditioning/single cond ops`
- Output node: `False`

This node specializes in the advanced manipulation of conditioning data for generative models, specifically focusing on unmasking and combining different sets of conditioning inputs. It enables the enhancement or modification of generative processes by applying sophisticated conditioning transformations.
## Input types
### Required
- **`cond`**
    - The primary conditioning input that serves as the base for transformations. It plays a crucial role in determining the initial state or context for the generative process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`cond_DEFAULT`**
    - An additional conditioning input intended to be combined with the primary conditioning input. This input typically represents default or supplementary information that modifies or enhances the base conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
### Optional
- **`opt_lora_hook`**
    - An optional parameter that allows for the application of Lora hooks to the conditioning inputs, providing a mechanism for further customization and control over the conditioning process.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The result of combining and unmasking the provided conditioning inputs, representing a modified or enhanced conditioning state for use in generative models.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetUnmaskedAndCombineHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cond": ("CONDITIONING",),
                "cond_DEFAULT": ("CONDITIONING",),
            },
            "optional": {
                "opt_lora_hook": ("LORA_HOOK",),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/single cond ops"
    FUNCTION = "append_and_combine"

    def append_and_combine(self, cond, cond_DEFAULT,
                           opt_lora_hook: LoraHookGroup=None):
        (final_conditioning,) = set_unmasked_and_combine_conds(conds=[cond], new_conds=[cond_DEFAULT],
                                                                        opt_lora_hook=opt_lora_hook)
        return (final_conditioning,)

```
