---
tags:
- Segmentation
---

# ISNet Loader
## Documentation
- Class name: `ISNetLoader`
- Category: `Art Venture/Segmentation`
- Output node: `False`

The ISNetLoader node is designed for loading ISNet models, allowing for the selection of a specific model by name or overriding it with an alternative model if specified. This functionality supports dynamic model loading for image segmentation tasks within the Art Venture/Segmentation category, enhancing flexibility in model management and deployment.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the ISNet model to be loaded. This parameter enables the selection of a model from a predefined list of available ISNet models, facilitating targeted model loading based on specific requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_override`**
    - Allows for the specification of an alternative ISNet model to be loaded, overriding the default model selection. This parameter provides flexibility in model usage, accommodating changes or updates in model preferences without altering the core configuration.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`isnet_model`**
    - Comfy dtype: `ISNET_MODEL`
    - Returns the loaded ISNet model, ready for use in image segmentation tasks. This output facilitates the direct application of the model to relevant image processing workflows.
    - Python dtype: `ISNetBase or ISNetDIS`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ISNetLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (folder_paths.get_filename_list("isnet"),),
                "model_override": ("STRING", {"default": "None"}),
            },
        }

    RETURN_TYPES = ("ISNET_MODEL",)
    FUNCTION = "load_isnet"
    CATEGORY = "Art Venture/Segmentation"

    def load_isnet(self, model_name, model_override="None"):
        if model_override != "None":
            if model_override not in folder_paths.get_filename_list("isnet"):
                logger.warning(f"Model override {model_override} not found. Use {model_name} instead.")
            else:
                model_name = model_override

        model = load_isnet_model(model_name)
        return (model,)

```
