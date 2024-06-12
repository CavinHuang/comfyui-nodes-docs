---
tags:
- LoRA
---

# LoraLoaderModelOnly
## Documentation
- Class name: `LoraLoaderModelOnly`
- Category: `loaders`
- Output node: `False`

This node specializes in loading a LoRA model without requiring a CLIP model, focusing on enhancing or modifying a given model based on LoRA parameters. It allows for the dynamic adjustment of the model's strength through LoRA parameters, facilitating fine-tuned control over the model's behavior.
## Input types
### Required
- **`model`**
    - The model to which LoRA adjustments will be applied. It serves as the base for modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - The name of the LoRA file to be loaded. This specifies which LoRA adjustments to apply to the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Determines the intensity of the LoRA adjustments applied to the model. A higher value indicates stronger modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with LoRA adjustments applied, reflecting changes in model behavior or capabilities.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - IPAdapterApplyFaceID
    - [LoraLoaderModelOnly](../../Comfy/Nodes/LoraLoaderModelOnly.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)



## Source code
```python
class LoraLoaderModelOnly(LoraLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "lora_name": (folder_paths.get_filename_list("loras"), ),
                              "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "load_lora_model_only"

    def load_lora_model_only(self, model, lora_name, strength_model):
        return (self.load_lora(model, None, lora_name, strength_model, 0)[0],)

```
