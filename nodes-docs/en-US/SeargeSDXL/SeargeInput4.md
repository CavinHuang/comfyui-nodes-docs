---
tags:
- Searge
---

# Model Names
## Documentation
- Class name: `SeargeInput4`
- Category: `Searge/_deprecated_/UI/Inputs`
- Output node: `False`

SeargeInput4 is designed to manage and process model names within the system, facilitating the selection and application of different AI models for various tasks. It abstracts the complexity of handling model identifiers, ensuring seamless integration and operation across different components.
## Input types
### Required
- **`base_model`**
    - Specifies the base model to be used, impacting the selection process and ultimately influencing the outcomes of the tasks performed by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`refiner_model`**
    - Specifies the refiner model to be used, impacting the selection process and ultimately influencing the outcomes of the tasks performed by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_model`**
    - Specifies the VAE model to be used, impacting the selection process and ultimately influencing the outcomes of the tasks performed by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`main_upscale_model`**
    - Specifies the main upscale model to be used, impacting the selection process and ultimately influencing the outcomes of the tasks performed by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`support_upscale_model`**
    - Specifies the support upscale model to be used, impacting the selection process and ultimately influencing the outcomes of the tasks performed by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model`**
    - Specifies the LORA model to be used, impacting the selection process and ultimately influencing the outcomes of the tasks performed by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`model_settings`**
    - Optional settings for the models that can further customize the processing and application of the models.
    - Comfy dtype: `MODEL_SETTINGS`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`model_names`**
    - Comfy dtype: `MODEL_NAMES`
    - Returns the processed model names, ready for use in subsequent operations, indicating successful handling and preparation of model identifiers.
    - Python dtype: `Dict[str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeInput4:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "base_model": (folder_paths.get_filename_list("checkpoints"),),
            "refiner_model": (folder_paths.get_filename_list("checkpoints"),),
            "vae_model": (folder_paths.get_filename_list("vae"),),
            "main_upscale_model": (folder_paths.get_filename_list("upscale_models"),),
            "support_upscale_model": (folder_paths.get_filename_list("upscale_models"),),
            "lora_model": (folder_paths.get_filename_list("loras"),),
        },
            "optional": {
                "model_settings": ("MODEL_SETTINGS",),
            },
        }

    RETURN_TYPES = ("MODEL_NAMES",)
    RETURN_NAMES = ("model_names",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/UI/Inputs"

    def mux(self, base_model, refiner_model, vae_model, main_upscale_model, support_upscale_model, lora_model,
            model_settings=None):

        if model_settings is None:
            model_names = {}
        else:
            model_names = model_settings

        model_names["base_model"] = base_model
        model_names["refiner_model"] = refiner_model
        model_names["vae_model"] = vae_model
        model_names["main_upscale_model"] = main_upscale_model
        model_names["support_upscale_model"] = support_upscale_model
        model_names["lora_model"] = lora_model

        return (model_names,)

```
