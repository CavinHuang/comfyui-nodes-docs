---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# DiffusersLoader
## Documentation
- Class name: `DiffusersLoader`
- Category: `advanced/loaders/deprecated`
- Output node: `False`

The DiffusersLoader node is designed for loading models from the diffusers library, specifically handling the loading of UNet, CLIP, and VAE models based on provided model paths. It facilitates the integration of these models into the ComfyUI framework, enabling advanced functionalities such as text-to-image generation, image manipulation, and more.
## Input types
### Required
- **`model_path`**
    - Specifies the path to the model to be loaded. This path is crucial as it determines which model will be utilized for subsequent operations, affecting the output and capabilities of the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded UNet model, which is part of the output tuple. This model is essential for image synthesis and manipulation tasks within the ComfyUI framework.
    - Python dtype: `comfy.sd.UNet`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The loaded CLIP model, included in the output tuple if requested. This model enables advanced text and image understanding and manipulation capabilities.
    - Python dtype: `comfy.sd.CLIP`
- **`vae`**
    - Comfy dtype: `VAE`
    - The loaded VAE model, included in the output tuple if requested. This model is crucial for tasks involving latent space manipulation and image generation.
    - Python dtype: `comfy.sd.VAE`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DiffusersLoader:
    @classmethod
    def INPUT_TYPES(cls):
        paths = []
        for search_path in folder_paths.get_folder_paths("diffusers"):
            if os.path.exists(search_path):
                for root, subdir, files in os.walk(search_path, followlinks=True):
                    if "model_index.json" in files:
                        paths.append(os.path.relpath(root, start=search_path))

        return {"required": {"model_path": (paths,), }}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "advanced/loaders/deprecated"

    def load_checkpoint(self, model_path, output_vae=True, output_clip=True):
        for search_path in folder_paths.get_folder_paths("diffusers"):
            if os.path.exists(search_path):
                path = os.path.join(search_path, model_path)
                if os.path.exists(path):
                    model_path = path
                    break

        return comfy.diffusers_load.load_diffusers(model_path, output_vae=output_vae, output_clip=output_clip, embedding_directory=folder_paths.get_folder_paths("embeddings"))

```
