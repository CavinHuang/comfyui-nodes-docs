---
tags:
- LoRA
---

# Combine LoRA Hooks [8] 🎭🅐🅓
## Documentation
- Class name: `ADE_CombineLoraHooksEight`
- Category: `Animate Diff 🎭🅐🅓/conditioning/combine lora hooks`
- Output node: `False`

This node is designed to combine up to eight LoRA hooks into a single, unified LoRA hook group. It facilitates the integration of multiple LoRA hook modifications, allowing for more complex and nuanced adjustments to model behavior in generative tasks.
## Input types
### Required
### Optional
- **`lora_hook_A`**
    - Represents the first LoRA hook group to be combined. It plays a foundational role in the aggregation process, setting the initial conditions for the combined LoRA hook group.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_B`**
    - Serves as the second LoRA hook group to be combined. Its inclusion allows for the expansion of the combined LoRA hook group's capabilities and modifications.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_C`**
    - Acts as the third LoRA hook group in the combination process. It contributes additional modifications, further enriching the combined LoRA hook group's functionality.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_D`**
    - Represents the fourth LoRA hook group to be combined. It adds to the diversity of modifications within the combined LoRA hook group.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_E`**
    - Serves as the fifth LoRA hook group in the combination. It enhances the combined LoRA hook group by introducing more nuanced adjustments.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_F`**
    - Acts as the sixth LoRA hook group to be combined. Its inclusion broadens the scope of modifications available in the combined LoRA hook group.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_G`**
    - Represents the seventh LoRA hook group in the combination process. It adds further complexity and depth to the combined LoRA hook group's adjustments.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_H`**
    - Serves as the eighth and final LoRA hook group to be combined. It completes the aggregation, maximizing the potential modifications and adjustments within the combined LoRA hook group.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
## Output types
- **`lora_hook`**
    - Comfy dtype: `LORA_HOOK`
    - The result of combining up to eight LoRA hooks into a single, unified LoRA hook group. This combined group is capable of applying a comprehensive set of modifications to model behavior.
    - Python dtype: `LoraHookGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CombineLoraHookEightOptional:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "lora_hook_A": ("LORA_HOOK",),
                "lora_hook_B": ("LORA_HOOK",),
                "lora_hook_C": ("LORA_HOOK",),
                "lora_hook_D": ("LORA_HOOK",),
                "lora_hook_E": ("LORA_HOOK",),
                "lora_hook_F": ("LORA_HOOK",),
                "lora_hook_G": ("LORA_HOOK",),
                "lora_hook_H": ("LORA_HOOK",),
            }
        }

    RETURN_TYPES = ("LORA_HOOK",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/combine lora hooks"
    FUNCTION = "combine_lora_hooks"

    def combine_lora_hooks(self,
                           lora_hook_A: LoraHookGroup=None, lora_hook_B: LoraHookGroup=None,
                           lora_hook_C: LoraHookGroup=None, lora_hook_D: LoraHookGroup=None,
                           lora_hook_E: LoraHookGroup=None, lora_hook_F: LoraHookGroup=None,
                           lora_hook_G: LoraHookGroup=None, lora_hook_H: LoraHookGroup=None):
        candidates = [lora_hook_A, lora_hook_B, lora_hook_C, lora_hook_D,
                      lora_hook_E, lora_hook_F, lora_hook_G, lora_hook_H]
        return (LoraHookGroup.combine_all_lora_hooks(candidates),)

```
