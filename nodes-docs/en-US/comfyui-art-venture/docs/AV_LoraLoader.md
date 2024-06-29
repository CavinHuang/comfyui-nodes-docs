---
tags:
- LoRA
---

# Lora Loader
## Documentation
- Class name: `AV_LoraLoader`
- Category: `Art Venture/Loaders`
- Output node: `False`

The AV_LoraLoader node is designed to load and apply LoRA (Low-Rank Adaptation) models to given models and CLIP instances, optionally overriding the default LoRA model with a specified one and enabling or disabling the loading process. This functionality enhances model customization and flexibility in processing, allowing for dynamic adjustments and optimizations based on specific requirements or preferences.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model to which the LoRA adjustments will be applied, serving as the base for modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip parameter signifies the CLIP model that will be adjusted alongside the main model, allowing for synchronized enhancements in processing capabilities.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - Specifies the name of the LoRA model to be loaded and applied, enabling targeted modifications to the base model and CLIP instance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Specifies the strength of the LoRA adjustment to be applied to the model, allowing for fine-tuned control over the adaptation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Specifies the strength of the LoRA adjustment to be applied to the CLIP model, enabling precise customization of the enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`lora_override`**
    - Allows for the specification of an alternative LoRA model to override the default, providing flexibility in model customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`enabled`**
    - A boolean flag that determines whether the LoRA loading and application process should be executed, offering control over the modification workflow.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the modified neural network model with applied LoRA adjustments, reflecting the enhancements or customizations made.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Returns the modified CLIP model with applied LoRA adjustments, showcasing the enhancements or customizations made to processing capabilities.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Lora Loader](../../was-node-suite-comfyui/Nodes/Lora Loader.md)
    - [CLIPTextEncode (BlenderNeko Advanced + NSP)](../../was-node-suite-comfyui/Nodes/CLIPTextEncode (BlenderNeko Advanced + NSP).md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class AVLoraLoader(LoraLoader):
    @classmethod
    def INPUT_TYPES(s):
        inputs = LoraLoader.INPUT_TYPES()
        inputs["optional"] = {
            "lora_override": ("STRING", {"default": "None"}),
            "enabled": ("BOOLEAN", {"default": True}),
        }
        return inputs

    CATEGORY = "Art Venture/Loaders"

    def load_lora(self, model, clip, lora_name, *args, lora_override="None", enabled=True, **kwargs):
        if not enabled:
            return (model, clip)

        if lora_override != "None":
            if lora_override not in folder_paths.get_filename_list("loras"):
                print(f"Warning: Not found Lora model {lora_override}. Use {lora_name} instead.")
            else:
                lora_name = lora_override

        return super().load_lora(model, clip, lora_name, *args, **kwargs)

```
