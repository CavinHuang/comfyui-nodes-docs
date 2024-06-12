---
tags:
- LoRA
---

# Register LoRA Hook (Model Only) 🎭🅐🅓
## Documentation
- Class name: `ADE_RegisterLoraHookModelOnly`
- Category: `Animate Diff 🎭🅐🅓/conditioning/register lora hooks`
- Output node: `False`

This node is designed to register a model as a LoRA (Low-Rank Adaptation) hook, focusing exclusively on the model without involving any CLIP models. It enables the modification and enhancement of a model's behavior through LoRA techniques, providing a streamlined approach for integrating LoRA hooks into models for advanced customization and performance tuning.
## Input types
### Required
- **`model`**
    - The model to be registered with the LoRA hook. It is the primary target for the LoRA adaptation, determining the scope and impact of the applied modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `Union[ModelPatcher, ModelPatcherAndInjector]`
- **`lora_name`**
    - The name of the LoRA configuration to apply. This specifies the particular LoRA adaptation settings and parameters to be used, guiding the customization process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - A floating-point value indicating the strength of the LoRA adaptation on the model. This parameter controls the intensity of the applied LoRA modifications, allowing for fine-tuned adjustments to the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model after being registered with the LoRA hook. This output reflects the modified state of the model, showcasing the effects of the LoRA adaptation.
    - Python dtype: `ModelPatcher`
- **`lora_hook`**
    - Comfy dtype: `LORA_HOOK`
    - The LoRA hook that has been registered with the model. This output represents the LoRA adaptation mechanism applied, facilitating further customization and performance tuning.
    - Python dtype: `LoraHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskableLoraLoaderModelOnly(MaskableLoraLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "lora_name": (folder_paths.get_filename_list("loras"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_lora_model_only"

    def load_lora_model_only(self, model: ModelPatcher, lora_name: str, strength_model: float):
        model_lora, clip_lora, lora_hook = self.load_lora(model=model, clip=None, lora_name=lora_name,
                                                          strength_model=strength_model, strength_clip=0)
        return (model_lora, lora_hook)

```
