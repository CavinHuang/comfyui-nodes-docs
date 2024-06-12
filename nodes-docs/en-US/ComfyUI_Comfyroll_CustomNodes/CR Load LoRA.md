---
tags:
- LoRA
---

# 💊 CR Load LoRA
## Documentation
- Class name: `CR Load LoRA`
- Category: `🧩 Comfyroll Studio/✨ Essential/💊 LoRA`
- Output node: `False`

This node is designed to dynamically load and apply Learning Rate Annealing (LoRA) adjustments to models and clips based on specified parameters or defaults. It supports conditional loading based on the presence of LoRA parameters, handling of default LoRAs, and iteration through a list of LoRAs to find a match for application. The node aims to enhance model performance or behavior by adjusting learning rates in a flexible and scheduled manner.
## Input types
### Required
- **`model`**
    - The model to which the LoRA adjustments will be applied. It's crucial for defining the base upon which the LoRA modifications will take effect.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip to which the LoRA adjustments will be applied, alongside the model. It plays a key role in the context of video or image processing tasks.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`switch`**
    - A switch to enable or disable the application of LoRA adjustments. This allows for conditional application based on specific criteria.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_name`**
    - The name of the LoRA to be loaded and applied. This parameter is key to identifying which specific LoRA adjustments to apply.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - A floating-point value indicating the strength of the LoRA adjustments to be applied to the model. It affects the intensity of the learning rate modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - A floating-point value indicating the strength of the LoRA adjustments to be applied to the clip. It affects the intensity of the learning rate modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model after the LoRA adjustments have been applied. It represents the modified version of the input model.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The clip after the LoRA adjustments have been applied. It represents the modified version of the input clip.
    - Python dtype: `torch.nn.Module`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation regarding the LoRA adjustments and their application.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [ModelSamplingDiscrete](../../Comfy/Nodes/ModelSamplingDiscrete.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [ToDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipe.md)



## Source code
```python
class CR_LoraLoader:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
    
        file_list = folder_paths.get_filename_list("loras")
        file_list.insert(0, "None")
        
        return {"required": { "model": ("MODEL",),
                              "clip": ("CLIP", ),
                              "switch": (["On","Off"],),
                              "lora_name": (file_list, ),
                              "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL", "CLIP", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "show_help", )
    FUNCTION = "load_lora"
    CATEGORY = icons.get("Comfyroll/LoRA")

    def load_lora(self, model, clip, switch, lora_name, strength_model, strength_clip):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/LoRA-Nodes#cr-load-lora"
        if strength_model == 0 and strength_clip == 0:
            return (model, clip, show_help, )

        if switch == "Off" or  lora_name == "None":
            return (model, clip, show_help, )

        lora_path = folder_paths.get_full_path("loras", lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                del self.loaded_lora

        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)

        model_lora, clip_lora = comfy.sd.load_lora_for_models(model, clip, lora, strength_model, strength_clip)
        return (model_lora, clip_lora, show_help, )

```
