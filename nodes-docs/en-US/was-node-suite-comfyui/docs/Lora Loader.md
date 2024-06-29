---
tags:
- LoRA
---

# Lora Loader
## Documentation
- Class name: `Lora Loader`
- Category: `WAS Suite/Loaders`
- Output node: `False`

The LoraLoader node is designed to dynamically load and apply LoRA (Low-Rank Adaptation) adjustments to given models and CLIP instances, enhancing their capabilities or altering their behavior based on specified LoRA parameters and strengths.
## Input types
### Required
- **`model`**
    - The model to which the LoRA adjustments will be applied. It's crucial for defining the base architecture that will be enhanced or modified.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The CLIP instance to which the LoRA adjustments will be applied, allowing for modifications in its behavior or performance.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - The name of the LoRA file containing the adjustments to be applied. It determines the specific LoRA modifications that will be loaded and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Defines the intensity of the LoRA adjustments applied to the model. It influences how significantly the model's behavior is altered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Defines the intensity of the LoRA adjustments applied to the CLIP instance. It influences how significantly the CLIP's behavior is altered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model with applied LoRA adjustments, reflecting enhanced or altered capabilities.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP instance with applied LoRA adjustments, reflecting modifications in behavior or performance.
    - Python dtype: `torch.nn.Module`
- **`NAME_STRING`**
    - Comfy dtype: `STRING`
    - The name of the LoRA file applied, providing a reference to the specific adjustments made.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - Reroute
    - [VideoLinearCFGGuidance](../../Comfy/Nodes/VideoLinearCFGGuidance.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [Lora Loader](../../was-node-suite-comfyui/Nodes/Lora Loader.md)
    - [ModelSamplingDiscrete](../../Comfy/Nodes/ModelSamplingDiscrete.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)



## Source code
```python
class WAS_Lora_Loader:
    def __init__(self):
        self.loaded_lora = None;

    @classmethod
    def INPUT_TYPES(s):
        file_list = comfy_paths.get_filename_list("loras")
        file_list.insert(0, "None")
        return {"required": { "model": ("MODEL",),
                              "clip": ("CLIP", ),
                              "lora_name": (file_list, ),
                              "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL", "CLIP", TEXT_TYPE)
    RETURN_NAMES = ("MODEL", "CLIP", "NAME_STRING")
    FUNCTION = "load_lora"

    CATEGORY = "WAS Suite/Loaders"

    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        if strength_model == 0 and strength_clip == 0:
            return (model, clip)

        lora_path = comfy_paths.get_full_path("loras", lora_name)
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

        model_lora, clip_lora = comfy.sd.load_lora_for_models(model, clip, lora, strength_model, strength_clip)
        return (model_lora, clip_lora, os.path.splitext(os.path.basename(lora_name))[0])

```
