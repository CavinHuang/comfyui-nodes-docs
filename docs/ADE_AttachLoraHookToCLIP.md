# Set CLIP LoRA Hook 🎭🅐🅓
## Documentation
- Class name: ADE_AttachLoraHookToCLIP
- Category: Animate Diff 🎭🅐🅓/conditioning
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将LoRA挂钩附加到CLIP模型上，通过集成额外的计算层或修改来增强其功能。它作为CLIP模型的定制点，允许进行定制调整以影响模型的行为或输出。

## Input types
### Required
- clip
    - 要附加LoRA挂钩的CLIP模型。此参数至关重要，因为它决定了将被修改的基础模型。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- lora_hook
    - 要附加到CLIP模型的LoRA挂钩。此挂钩代表要应用的修改或增强，在定制模型功能中起关键作用。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup

## Output types
- hook_CLIP
    - Comfy dtype: CLIP
    - 附加了LoRA挂钩的修改后CLIP模型，代表原始模型的增强版本。
    - Python dtype: CLIPWithHooks

## Usage tips
- Infra type: CPU
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