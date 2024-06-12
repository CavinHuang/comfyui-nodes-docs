---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# Diffusers Model Loader
## Documentation
- Class name: `Diffusers Model Loader`
- Category: `WAS Suite/Loaders/Advanced`
- Output node: `False`

This node is designed to load models related to the 'diffusers' library, specifically targeting the loading of diffusion models, CLIP models, and VAEs. It facilitates the integration of these models into the workflow by providing a streamlined mechanism for their retrieval and initialization based on specified model paths.
## Input types
### Required
- **`model_path`**
    - Specifies the path to the model that needs to be loaded. This path is critical as it determines which model will be retrieved and initialized for use in the workflow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The loaded diffusion model, ready for use in generating or manipulating images.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The loaded CLIP model, which can be used for text-image matching and manipulation tasks.
    - Python dtype: `torch.nn.Module`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The loaded VAE model, which can be utilized for various image generation and manipulation tasks.
    - Python dtype: `torch.nn.Module`
- **`NAME_STRING`**
    - Comfy dtype: `STRING`
    - The name of the loaded model, providing a simple identifier for reference.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Diffusers_Loader:
    @classmethod
    def INPUT_TYPES(cls):
        paths = []
        for search_path in comfy_paths.get_folder_paths("diffusers"):
            if os.path.exists(search_path):
                paths += next(os.walk(search_path))[1]
        return {"required": {"model_path": (paths,), }}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", TEXT_TYPE)
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "NAME_STRING")
    FUNCTION = "load_checkpoint"

    CATEGORY = "WAS Suite/Loaders/Advanced"

    def load_checkpoint(self, model_path, output_vae=True, output_clip=True):
        for search_path in comfy_paths.get_folder_paths("diffusers"):
            if os.path.exists(search_path):
                paths = next(os.walk(search_path))[1]
                if model_path in paths:
                    model_path = os.path.join(search_path, model_path)
                    break

        out = comfy.diffusers_convert.load_diffusers(model_path, fp16=comfy.model_management.should_use_fp16(), output_vae=output_vae, output_clip=output_clip, embedding_directory=comfy_paths.get_folder_paths("embeddings"))
        return (out[0], out[1], out[2], os.path.basename(model_path))

```
