---
tags:
- LoRA
---

# Lora Loader (Searge)
## Documentation
- Class name: `SeargeLoraLoader`
- Category: `Searge/_deprecated_/Files`
- Output node: `False`

The SeargeLoraLoader node is designed to load and apply LoRA (Low-Rank Adaptation) modifications to models and CLIPs. It facilitates the dynamic adjustment of model behaviors by applying specific LoRA modifications, which are identified by their names and strengths, to the base models and CLIPs. This process allows for fine-tuning and customization of model outputs based on the applied LoRAs.
## Input types
### Required
- **`model`**
    - The base model to which the LoRA modifications will be applied. It serves as the foundation for the LoRA adjustments.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The CLIP model to which the LoRA modifications will be applied, allowing for adjustments in how the CLIP model processes or interprets data.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - The name of the LoRA modification to apply, which identifies the specific LoRA file or setting to be used for the adjustment.
    - Comfy dtype: `LORA_NAME`
    - Python dtype: `str`
- **`strength_model`**
    - The strength of the LoRA modification applied to the model, determining the intensity of the adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - The strength of the LoRA modification applied to the CLIP, determining the intensity of the adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model after applying the specified LoRA modifications, reflecting the adjustments made.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model after applying the specified LoRA modifications, reflecting the adjustments made.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeargeLoraLoader:
    def __init__(self):
        self.lora_loader = nodes.LoraLoader()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL",),
            "clip": ("CLIP",),
            "lora_name": ("LORA_NAME",),
            "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
        },
        }

    RETURN_TYPES = ("MODEL", "CLIP",)
    FUNCTION = "load_lora"

    CATEGORY = "Searge/_deprecated_/Files"

    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        return self.lora_loader.load_lora(model, clip, lora_name, strength_model, strength_clip)

```
