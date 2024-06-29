---
tags:
- LoRA
---

# Register Model as LoRA Hook (MO) 🎭🅐🅓
## Documentation
- Class name: `ADE_RegisterModelAsLoraHookModelOnly`
- Category: `Animate Diff 🎭🅐🅓/conditioning/register lora hooks`
- Output node: `False`

This node specializes in registering a model as a LoRA hook with a focus on model-only modifications. It enables the integration of LoRA (Low-Rank Adaptation) techniques into a specific model, enhancing its adaptability and performance for specific tasks without affecting other components.
## Input types
### Required
- **`model`**
    - The model to be adapted using LoRA techniques. It serves as the primary target for the application of low-rank adaptations, aiming to enhance its performance or adaptability for specific tasks.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`ckpt_name`**
    - The name of the checkpoint to apply LoRA configurations from. This parameter specifies which set of LoRA adaptations to use, guiding the customization of the model's behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - A floating-point value that determines the intensity of the LoRA adaptation on the model. It modulates how significantly the LoRA parameters influence the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model after applying the specified LoRA adaptations. This output reflects the enhanced or customized version of the model, tailored through the LoRA technique.
    - Python dtype: `ModelPatcher`
- **`lora_hook`**
    - Comfy dtype: `LORA_HOOK`
    - A reference to the LoRA hook that has been integrated into the model. This output provides access to the LoRA adaptations applied, facilitating further manipulations or analyses.
    - Python dtype: `LoraHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskableSDModelLoaderModelOnly(MaskableSDModelLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }
    
    RETURN_TYPES = ("MODEL", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_model_as_lora_model_only"

    def load_model_as_lora_model_only(self, model: ModelPatcher, ckpt_name: str, strength_model: float):
        model_lora, clip_lora, lora_hook = self.load_model_as_lora(model=model, clip=None, ckpt_name=ckpt_name,
                                                                   strength_model=strength_model, strength_clip=0)
        return (model_lora, lora_hook)

```
