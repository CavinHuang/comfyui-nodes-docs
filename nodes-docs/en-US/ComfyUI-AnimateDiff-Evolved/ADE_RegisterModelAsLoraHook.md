---
tags:
- LoRA
---

# Register Model as LoRA Hook 🎭🅐🅓
## Documentation
- Class name: `ADE_RegisterModelAsLoraHook`
- Category: `Animate Diff 🎭🅐🅓/conditioning/register lora hooks`
- Output node: `False`

This node is designed to register a model as a LoRA hook within the AnimateDiff framework, enabling dynamic modification and control of model behavior during the generation process. It facilitates the integration of LoRA (Low-Rank Adaptation) techniques with models, allowing for enhanced customization and fine-tuning of model outputs based on specific conditions or inputs.
## Input types
### Required
- **`model`**
    - The model parameter represents the target model to which the LoRA hook will be applied. It is crucial for defining the scope and context of the LoRA adaptation, affecting how the model's behavior is modified during the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `Union[ModelPatcher, ModelPatcherAndInjector]`
- **`clip`**
    - The clip parameter specifies the CLIP model involved in the process, if any, providing context for where LoRA adaptations may be applied alongside the primary model.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`ckpt_name`**
    - The ckpt_name parameter indicates the checkpoint name for loading the model's state, essential for initializing the model with specific pre-trained weights or configurations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - This parameter controls the intensity of the LoRA modifications applied to the model. It allows for fine-tuning the impact of LoRA on the model's behavior, enabling precise adjustments to the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Similar to strength_model, this parameter adjusts the intensity of LoRA modifications but specifically for the CLIP model involved in the process. It enables separate control over the adaptation strength for different components of the generation framework.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model with LoRA hooks applied, reflecting the dynamic adaptations specified through the input parameters.
    - Python dtype: `ModelPatcher`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model with LoRA hooks applied, if a CLIP model was involved in the process. It indicates the application of LoRA modifications to the CLIP component.
    - Python dtype: `CLIP`
- **`lora_hook`**
    - Comfy dtype: `LORA_HOOK`
    - The LoRA hook that has been registered and applied to the model and/or CLIP, encapsulating the specific adaptations made.
    - Python dtype: `LoraHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskableSDModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "strength_clip": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_model_as_lora"

    def load_model_as_lora(self, model: ModelPatcher, clip: CLIP, ckpt_name: str, strength_model: float, strength_clip: float):
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        model_loaded = out[0]
        clip_loaded = out[1]

        lora_hook = LoraHook(lora_name=ckpt_name)
        lora_hook_group = LoraHookGroup()
        lora_hook_group.add(lora_hook)
        model_lora, clip_lora = load_model_as_hooked_lora_for_models(model=model, clip=clip,
                                                                     model_loaded=model_loaded, clip_loaded=clip_loaded,
                                                                     lora_hook=lora_hook,
                                                                     strength_model=strength_model, strength_clip=strength_clip)
        return (model_lora, clip_lora, lora_hook_group)

```
