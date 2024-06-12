---
tags:
- VAE
---

# VAE Loader
## Documentation
- Class name: `AV_VAELoader`
- Category: `Art Venture/Loaders`
- Output node: `False`

The AV_VAELoader node is designed to load VAE models with an optional override feature, allowing users to specify an alternative VAE model for loading. This functionality enhances flexibility in model selection and usage within the Art Venture framework.
## Input types
### Required
- **`vae_name`**
    - The name of the VAE model to be loaded. This serves as the default model to load unless an override is specified.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`vae_override`**
    - Allows specifying an alternative VAE model to load. If the specified model is not found, the default or intended VAE model is loaded instead, providing a flexible approach to model selection.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`vae`**
    - Comfy dtype: `VAE`
    - The loaded VAE model, ready for use within the system. This output enables further operations or transformations using the model.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVVAELoader(VAELoader):
    @classmethod
    def INPUT_TYPES(s):
        inputs = VAELoader.INPUT_TYPES()
        inputs["optional"] = {"vae_override": ("STRING", {"default": "None"})}
        return inputs

    CATEGORY = "Art Venture/Loaders"

    def load_vae(self, vae_name, vae_override="None"):
        if vae_override != "None":
            if vae_override not in folder_paths.get_filename_list("vae"):
                print(f"Warning: Not found VAE model {vae_override}. Use {vae_name} instead.")
            else:
                vae_name = vae_override

        return super().load_vae(vae_name)

```
