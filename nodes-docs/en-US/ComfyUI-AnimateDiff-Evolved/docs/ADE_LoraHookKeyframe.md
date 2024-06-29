---
tags:
- LoRA
---

# LoRA Hook Keyframe 🎭🅐🅓
## Documentation
- Class name: `ADE_LoraHookKeyframe`
- Category: `Animate Diff 🎭🅐🅓/conditioning/schedule lora hooks`
- Output node: `False`

This node is designed to create a LoRA hook keyframe, which is a mechanism for adjusting the influence of LoRA (Low-Rank Adaptation) hooks at specific points within an animation sequence. It allows for the dynamic scheduling of LoRA hooks' strength, enabling precise control over their effects throughout the animation process.
## Input types
### Required
- **`strength_model`**
    - Specifies the strength of the LoRA hook at the keyframe, influencing how strongly the hook will affect the model's behavior at this point in the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Determines the starting point of the keyframe's effect as a percentage of the total animation length, allowing for the timing of the LoRA hook's influence to be precisely controlled.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Guarantees a minimum number of steps for which the keyframe's effect will be applied, ensuring that the LoRA hook's influence is maintained for at least this duration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`prev_hook_kf`**
    - An optional previous LoRA hook keyframe group to which the new keyframe will be added, enabling the chaining of multiple keyframes for complex animation effects.
    - Comfy dtype: `LORA_HOOK_KEYFRAMES`
    - Python dtype: `LoraHookKeyframeGroup`
## Output types
- **`HOOK_KF`**
    - Comfy dtype: `LORA_HOOK_KEYFRAMES`
    - Returns a group of LoRA hook keyframes, including the newly created keyframe, facilitating the management and application of multiple keyframes within an animation.
    - Python dtype: `LoraHookKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreateLoraHookKeyframe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
            },
            "optional": {
                "prev_hook_kf": ("LORA_HOOK_KEYFRAMES",),
            }
        }
    
    RETURN_TYPES = ("LORA_HOOK_KEYFRAMES",)
    RETURN_NAMES = ("HOOK_KF",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/schedule lora hooks"
    FUNCTION = "create_hook_keyframe"

    def create_hook_keyframe(self, strength_model: float, start_percent: float, guarantee_steps: float,
                             prev_hook_kf: LoraHookKeyframeGroup=None):
        if prev_hook_kf:
            prev_hook_kf = prev_hook_kf.clone()
        else:
            prev_hook_kf = LoraHookKeyframeGroup()
        keyframe = LoraHookKeyframe(strength=strength_model, start_percent=start_percent, guarantee_steps=guarantee_steps)
        prev_hook_kf.add(keyframe)
        return (prev_hook_kf,)

```
