---
tags:
- LoRA
---

# Load Lora
## Documentation
- Class name: `Load Lora`
- Category: `WAS Suite/Loaders`
- Output node: `False`

The Load Lora node is designed to dynamically enhance the capabilities of machine learning models by applying LoRA (Low-Rank Adaptation) adjustments. It allows for the fine-tuning of model and clip parameters through the application of pre-trained LoRA adjustments, thereby enabling more precise control over the model's behavior and outputs without the need for extensive retraining.
## Input types
### Required
- **`model`**
    - The original machine learning model to which LoRA adjustments will be applied. It serves as the foundation for the enhancement process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip parameter works alongside the model to receive LoRA adjustments, allowing for a coordinated enhancement of both components.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - The name of the LoRA adjustment file to be applied. This parameter specifies which pre-trained LoRA adjustments are to be used for enhancing the model and clip.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Determines the intensity of the LoRA adjustments applied to the model. It allows for fine-tuning the impact of LoRA on the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Specifies the intensity of the LoRA adjustments applied to the clip parameter, enabling precise control over its enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The enhanced version of the model after the application of LoRA adjustments, reflecting the improved capabilities and fine-tuning achieved.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The enhanced version of the clip parameter after the application of LoRA adjustments, showcasing the precise control and improvement.
    - Python dtype: `torch.nn.Module`
- **`NAME_STRING`**
    - Comfy dtype: `STRING`
    - The name of the LoRA adjustment applied, providing a reference to the specific enhancements made.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [PatchModelAddDownscale](../../Comfy/Nodes/PatchModelAddDownscale.md)
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



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
