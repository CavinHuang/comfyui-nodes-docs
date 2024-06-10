---
tags:
- LoRA
---

# Combine LoRA Hooks [2] 🎭🅐🅓
## Documentation
- Class name: `ADE_CombineLoraHooks`
- Category: `Animate Diff 🎭🅐🅓/conditioning/combine lora hooks`
- Output node: `False`

This node is designed to aggregate multiple LoRA Hook Groups into a single, unified LoRA Hook Group. It facilitates the combination of various LoRA hooks, allowing for more complex and nuanced model conditioning by integrating different modifications or enhancements provided by each individual hook.
## Input types
### Required
### Optional
- **`lora_hook_A`**
    - Represents the first LoRA Hook Group to be combined. It plays a crucial role in the aggregation process, contributing its modifications or enhancements to the resulting unified LoRA Hook Group.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`lora_hook_B`**
    - Represents the second LoRA Hook Group to be combined. It contributes its unique modifications or enhancements to the unified LoRA Hook Group, enriching the overall conditioning effect.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
## Output types
- **`lora_hook`**
    - Comfy dtype: `LORA_HOOK`
    - The output is a unified LoRA Hook Group that combines the modifications or enhancements of the input LoRA Hook Groups. This aggregated hook facilitates more complex model conditioning.
    - Python dtype: `LoraHookGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CombineLoraHooks:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "lora_hook_A": ("LORA_HOOK",),
                "lora_hook_B": ("LORA_HOOK",),
            }
        }
    
    RETURN_TYPES = ("LORA_HOOK",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/combine lora hooks"
    FUNCTION = "combine_lora_hooks"

    def combine_lora_hooks(self, lora_hook_A: LoraHookGroup=None, lora_hook_B: LoraHookGroup=None):
        candidates = [lora_hook_A, lora_hook_B]
        return (LoraHookGroup.combine_all_lora_hooks(candidates),)

```
