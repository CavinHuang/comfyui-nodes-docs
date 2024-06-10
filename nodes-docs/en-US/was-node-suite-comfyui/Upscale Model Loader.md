---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Model Loader
## Documentation
- Class name: `Upscale Model Loader`
- Category: `WAS Suite/Loaders`
- Output node: `False`

This node is designed to load and prepare upscale models for use, ensuring they are in the correct state for upscaling tasks. It handles the intricacies of loading model state dictionaries and adjusting them if necessary, streamlining the process of getting models ready for image enhancement operations.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the upscale model to be loaded. This name is used to locate the model file within a predefined directory structure, facilitating the retrieval and loading of the model for upscaling purposes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`UPSCALE_MODEL`**
    - Comfy dtype: `UPSCALE_MODEL`
    - The loaded and prepared upscale model, ready for use in upscaling tasks. This output facilitates the enhancement of images by providing a model that has been properly configured and evaluated.
    - Python dtype: `torch.nn.Module`
- **`MODEL_NAME_TEXT`**
    - Comfy dtype: `STRING`
    - The name of the loaded upscale model, provided as text. This output is useful for identifying or referencing the model that has been loaded and prepared for use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class WAS_Upscale_Model_Loader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model_name": (comfy_paths.get_filename_list("upscale_models"), ),
                             }}
    RETURN_TYPES = ("UPSCALE_MODEL",TEXT_TYPE)
    RETURN_NAMES = ("UPSCALE_MODEL","MODEL_NAME_TEXT")
    FUNCTION = "load_model"

    CATEGORY = "WAS Suite/Loaders"

    def load_model(self, model_name):
        model_path = comfy_paths.get_full_path("upscale_models", model_name)
        sd = comfy.utils.load_torch_file(model_path)
        out = model_loading.load_state_dict(sd).eval()
        return (out,model_name)

```
