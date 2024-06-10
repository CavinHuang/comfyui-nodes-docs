---
tags:
- LoRA
---

# LoraLoader (dirty)
## Documentation
- Class name: `LoraLoader (dirty)`
- Category: `Bmad/api/dirty loaders`
- Output node: `False`

The LoraLoader node is designed to dynamically load and apply LoRA (Low-Rank Adaptation) adjustments to models and CLIP instances based on specified parameters. It facilitates the customization of model behavior and performance by integrating LoRA modifications, which can enhance or alter the model's capabilities without requiring retraining.
## Input types
### Required
- **`model`**
    - The model to which LoRA adjustments will be applied. It is central to the node's operation as it determines the base model that will be modified.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The CLIP instance to which LoRA adjustments will be applied. This parameter allows for the customization of CLIP models alongside the primary model.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - The name of the LoRA file containing the adjustments to be applied. This parameter specifies which LoRA modifications will be integrated into the model and CLIP instance.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
- **`strength_model`**
    - The strength of the LoRA adjustments applied to the model. This parameter controls the intensity of the modifications, affecting the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - The strength of the LoRA adjustments applied to the CLIP instance. This parameter controls the intensity of the modifications, affecting the CLIP's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with LoRA adjustments applied. This output reflects the integration of LoRA modifications into the original model, enhancing or altering its capabilities.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The modified CLIP instance with LoRA adjustments applied. This output reflects the integration of LoRA modifications into the original CLIP, enhancing or altering its capabilities.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - Reroute
    - [VideoLinearCFGGuidance](../../Comfy/Nodes/VideoLinearCFGGuidance.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [ModelSamplingDiscrete](../../Comfy/Nodes/ModelSamplingDiscrete.md)
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)
    - KSampler //Inspire
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)



## Source code
```python
class DirtyLoraLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",),
                             "clip": ("CLIP",),
                             "lora_name": ("STRING", {"default": ""}),
                             "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             }}

    RETURN_TYPES = ("MODEL", "CLIP")
    FUNCTION = "load_lora"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        lora_name = DirtyLoaderUtils.find_matching_filename(
            lora_name, folder_paths.get_filename_list("loras"))

        loader = nodes.LoraLoader()
        return loader.load_lora(model, clip, lora_name, strength_model, strength_clip)

```
