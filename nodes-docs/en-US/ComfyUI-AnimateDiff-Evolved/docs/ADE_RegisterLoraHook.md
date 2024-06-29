---
tags:
- LoRA
---

# Register LoRA Hook 🎭🅐🅓
## Documentation
- Class name: `ADE_RegisterLoraHook`
- Category: `Animate Diff 🎭🅐🅓/conditioning/register lora hooks`
- Output node: `False`

This node is designed to register LoRA hooks within the AnimateDiff framework, enabling the dynamic modification of model behavior for enhanced animation and image manipulation capabilities.
## Input types
### Required
- **`model`**
    - The model to which LoRA hooks will be applied, serving as the foundation for dynamic behavior modification.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher or ModelPatcherAndInjector`
- **`clip`**
    - The CLIP model that may be optionally modified alongside the primary model, allowing for synchronized adjustments.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`lora_name`**
    - The identifier for the specific LoRA hook to be applied, determining the nature of the behavior modification.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Defines the intensity of the LoRA hook's effect on the model, allowing for fine-tuned control over behavior modification.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Specifies the intensity of the LoRA hook's effect on the CLIP model, enabling precise adjustments to its behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model with the LoRA hook applied, ready for enhanced animation and image manipulation tasks.
    - Python dtype: `ModelPatcher or ModelPatcherAndInjector`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The optionally modified CLIP model, adjusted in tandem with the primary model for synchronized enhancements.
    - Python dtype: `CLIP`
- **`lora_hook`**
    - Comfy dtype: `LORA_HOOK`
    - The registered LoRA hook, encapsulating the specified modifications for application to the model.
    - Python dtype: `LoraHookGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskableLoraLoader:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "lora_name": (folder_paths.get_filename_list("loras"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "strength_clip": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_lora"

    def load_lora(self, model: Union[ModelPatcher, ModelPatcherAndInjector], clip: CLIP, lora_name: str, strength_model: float, strength_clip: float):
        if strength_model == 0 and strength_clip == 0:
            return (model, clip)
        
        lora_path = folder_paths.get_full_path("loras", lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                temp = self.loaded_lora
                self.loaded_lora = None
                del temp
        
        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)

        lora_hook = LoraHook(lora_name=lora_name)
        lora_hook_group = LoraHookGroup()
        lora_hook_group.add(lora_hook)
        model_lora, clip_lora = load_hooked_lora_for_models(model=model, clip=clip, lora=lora, lora_hook=lora_hook,
                                                            strength_model=strength_model, strength_clip=strength_clip)
        return (model_lora, clip_lora, lora_hook_group)

```
