---
tags:
- Checkpoint
- Loader
- ModelIO
- ModelLoader
---

# CheckpointSave
## Documentation
- Class name: `CheckpointSave`
- Category: `advanced/model_merging`
- Output node: `True`

The CheckpointSave node is designed for saving the state of various model components, including models, CLIP, and VAE, into a checkpoint file. This functionality is crucial for preserving the training progress or configuration of models for later use or sharing.
## Input types
### Required
- **`model`**
    - The model parameter represents the primary model whose state is to be saved. It is essential for capturing the current state of the model for future restoration or analysis.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip parameter is intended for the CLIP model associated with the primary model, allowing its state to be saved alongside the main model.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - The vae parameter is for the Variational Autoencoder (VAE) model, enabling its state to be saved for future use or analysis alongside the main model and CLIP.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`filename_prefix`**
    - This parameter specifies the prefix for the filename under which the checkpoint will be saved, providing a means to organize and identify saved checkpoints.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CheckpointSave:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "clip": ("CLIP",),
                              "vae": ("VAE",),
                              "filename_prefix": ("STRING", {"default": "checkpoints/ComfyUI"}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}
    RETURN_TYPES = ()
    FUNCTION = "save"
    OUTPUT_NODE = True

    CATEGORY = "advanced/model_merging"

    def save(self, model, clip, vae, filename_prefix, prompt=None, extra_pnginfo=None):
        save_checkpoint(model, clip=clip, vae=vae, filename_prefix=filename_prefix, output_dir=self.output_dir, prompt=prompt, extra_pnginfo=extra_pnginfo)
        return {}

```
