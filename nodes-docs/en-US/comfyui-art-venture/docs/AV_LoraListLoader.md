---
tags:
- LoRA
---

# Lora List Loader
## Documentation
- Class name: `AV_LoraListLoader`
- Category: `Art Venture/Loaders`
- Output node: `False`

The AVLoraListLoader node is designed for loading and stacking lists of LoRA models based on provided data and configurations. It facilitates the dynamic enhancement of models and clips by applying multiple LoRA adjustments in sequence, allowing for complex model behavior modifications through LoRA parameters.
## Input types
### Required
- **`model`**
    - The 'model' parameter represents the initial model to which LoRA adjustments will be applied. It is crucial for defining the starting point of the LoRA stacking process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - The 'clip' parameter signifies the initial clip model that will be modified alongside the main model through the LoRA adjustments. It plays a key role in the stacking process by being subject to modifications.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`data`**
    - The 'data' parameter contains the list of LoRA models to be loaded and applied, in JSON format. It is essential for specifying which LoRA models and their corresponding strengths will influence the model and clip.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`base_url`**
    - The 'base_url' parameter provides the base URL for fetching LoRA models not found locally. It aids in dynamically loading LoRA models from external sources.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the modified model after applying the specified LoRA adjustments.
    - Python dtype: `str`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Returns the modified clip model after the LoRA adjustments have been applied.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVLoraListLoader(AVLoraListStacker):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "data": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False}),
            },
            "optional": {"base_url": ("STRING", {"default": lora_cloud_front_url})},
        }

    RETURN_TYPES = ("MODEL", "CLIP")

    def load_list_lora(self, model, clip, data, base_url=lora_cloud_front_url):
        lora_params = self.parse_lora_list(data, base_url=base_url)

        if len(lora_params) == 0:
            return (model, clip)

        def recursive_load_lora(lora_params, model, clip, id, folder_paths):
            if len(lora_params) == 0:
                return model, clip

            lora_name, strength_model, strength_clip = lora_params[0]

            lora_path = folder_paths.get_full_path("loras", lora_name)
            lora_model, lora_clip = comfy.sd.load_lora_for_models(
                model, clip, comfy.utils.load_torch_file(lora_path), strength_model, strength_clip
            )

            # Call the function again with the new lora_model and lora_clip and the remaining tuples
            return recursive_load_lora(lora_params[1:], lora_model, lora_clip, id, folder_paths)

        lora_model, lora_clip = recursive_load_lora(lora_params, model, clip, id, folder_paths)

        return (lora_model, lora_clip)

```
