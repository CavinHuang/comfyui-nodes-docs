---
tags:
- LoRA
---

# Set LoRA Hook Keyframes 🎭🅐🅓
## Documentation
- Class name: `ADE_SetLoraHookKeyframe`
- Category: `Animate Diff 🎭🅐🅓/conditioning`
- Output node: `False`

This node is designed to assign a set of LoRA hook keyframes to a specific LoRA hook group. It enables the customization and dynamic adjustment of LoRA hook behaviors over the animation timeline, facilitating precise control over the model's response at different stages of the animation process.
## Input types
### Required
- **`lora_hook`**
    - The LoRA hook group to which the keyframes will be applied. This parameter is crucial for identifying the target group of hooks that will receive the new keyframe settings.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
- **`hook_kf`**
    - The set of LoRA hook keyframes to be assigned to the specified LoRA hook group. This parameter defines the timing, strength, and other characteristics of the LoRA hooks over the animation timeline.
    - Comfy dtype: `LORA_HOOK_KEYFRAMES`
    - Python dtype: `LoraHookKeyframeGroup`
## Output types
- **`lora_hook`**
    - Comfy dtype: `LORA_HOOK`
    - The updated LoRA hook group with the new set of keyframes applied. This output reflects the changes made to the LoRA hooks, incorporating the specified keyframe settings.
    - Python dtype: `LoraHookGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SetLoraHookKeyframes:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "lora_hook": ("LORA_HOOK",), 
                "hook_kf": ("LORA_HOOK_KEYFRAMES",),
            }
        }
    
    RETURN_TYPES = ("LORA_HOOK",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "set_hook_keyframes"

    def set_hook_keyframes(self, lora_hook: LoraHookGroup, hook_kf: LoraHookKeyframeGroup):
        new_lora_hook = lora_hook.clone()
        new_lora_hook.set_keyframes_on_hooks(hook_kf=hook_kf)
        return (new_lora_hook,)

```
