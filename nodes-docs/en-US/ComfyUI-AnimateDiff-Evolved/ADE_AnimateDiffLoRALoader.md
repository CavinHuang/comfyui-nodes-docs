---
tags:
- AnimateDiff
- Animation
---

# Load AnimateDiff LoRA 🎭🅐🅓
## Documentation
- Class name: `ADE_AnimateDiffLoRALoader`
- Category: `Animate Diff 🎭🅐🅓`
- Output node: `False`

The ADE_AnimateDiffLoRALoader node is designed to load motion LoRA (Locally Recurrent Architecture) configurations for use in animation processes. It facilitates the selection and application of specific motion LoRA settings, enhancing the control and customization of animation dynamics.
## Input types
### Required
- **`lora_name`**
    - Specifies the name of the motion LoRA to be loaded. It is crucial for identifying the specific LoRA configuration to apply.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - Determines the strength of the motion LoRA effect. This parameter allows for fine-tuning the intensity of the motion applied, affecting the animation's overall dynamics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`prev_motion_lora`**
    - Optional. Represents the previous motion LoRA configuration. If provided, it enables the chaining or layering of motion LoRA effects for more complex animations.
    - Comfy dtype: `MOTION_LORA`
    - Python dtype: `MotionLoraList`
## Output types
- **`motion_lora`**
    - Comfy dtype: `MOTION_LORA`
    - Returns the updated motion LoRA configuration, incorporating the selected LoRA settings and strength. This output is essential for subsequent animation steps.
    - Python dtype: `MotionLoraList`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)
    - [ADE_AnimateDiffLoRALoader](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoRALoader.md)



## Source code
```python
class AnimateDiffLoraLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "lora_name": (get_available_motion_loras(),),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}),
            },
            "optional": {
                "prev_motion_lora": ("MOTION_LORA",),
            }
        }
    
    RETURN_TYPES = ("MOTION_LORA",)
    CATEGORY = "Animate Diff 🎭🅐🅓"
    FUNCTION = "load_motion_lora"

    def load_motion_lora(self, lora_name: str, strength: float, prev_motion_lora: MotionLoraList=None):
        if prev_motion_lora is None:
            prev_motion_lora = MotionLoraList()
        else:
            prev_motion_lora = prev_motion_lora.clone()
        # check if motion lora with name exists
        lora_path = get_motion_lora_path(lora_name)
        if not Path(lora_path).is_file():
            raise FileNotFoundError(f"Motion lora with name '{lora_name}' not found.")
        # create motion lora info to be loaded in AnimateDiff Loader
        lora_info = MotionLoraInfo(name=lora_name, strength=strength)
        prev_motion_lora.add_lora(lora_info)

        return (prev_motion_lora,)

```
