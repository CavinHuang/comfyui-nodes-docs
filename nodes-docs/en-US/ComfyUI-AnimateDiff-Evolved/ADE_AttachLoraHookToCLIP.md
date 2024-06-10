---
tags:
- LoRA
---

# Set CLIP LoRA Hook 🎭🅐🅓
## Documentation
- Class name: `ADE_AttachLoraHookToCLIP`
- Category: `Animate Diff 🎭🅐🅓/conditioning`
- Output node: `False`

This node is designed to attach a LoRA hook to a CLIP model, enhancing its functionality by integrating additional computational layers or modifications. It serves as a customization point for the CLIP model, allowing for tailored adjustments that can influence the model's behavior or outputs.
## Input types
### Required
- **`clip`**
    - The CLIP model to which the LoRA hook will be attached. This parameter is crucial as it determines the base model that will be modified.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`lora_hook`**
    - The LoRA hook to be attached to the CLIP model. This hook represents the modifications or enhancements to be applied, playing a key role in customizing the model's functionality.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
## Output types
- **`hook_CLIP`**
    - Comfy dtype: `CLIP`
    - The modified CLIP model with the LoRA hook attached, representing the enhanced version of the original model.
    - Python dtype: `CLIPWithHooks`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SetClipLoraHook:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "clip": ("CLIP",),
                "lora_hook": ("LORA_HOOK",),
            }
        }
    
    RETURN_TYPES = ("CLIP",)
    RETURN_NAMES = ("hook_CLIP",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "apply_lora_hook"

    def apply_lora_hook(self, clip: CLIP, lora_hook: LoraHookGroup):
        new_clip = CLIPWithHooks(clip)
        new_clip.set_desired_hooks(lora_hooks=lora_hook)
        return (new_clip, )

```
