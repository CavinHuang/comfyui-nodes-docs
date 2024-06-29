---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# unCLIP Checkpoint Loader
## Documentation
- Class name: `unCLIP Checkpoint Loader`
- Category: `WAS Suite/Loaders`
- Output node: `False`

The unCLIP Checkpoint Loader node is designed for loading checkpoints specifically tailored for the unCLIP model. It facilitates the retrieval and initialization of model components such as the CLIP model, VAE, and CLIP vision, ensuring they are correctly configured and ready for use in various applications.
## Input types
### Required
- **`ckpt_name`**
    - The 'ckpt_name' parameter specifies the name of the checkpoint to be loaded. It is crucial for identifying the correct file within the 'checkpoints' directory, enabling the node to fetch and load the model's state.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - Represents the loaded model, ready for further processing or inference.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP component of the loaded checkpoint, prepared for text and image understanding tasks.
    - Python dtype: `torch.nn.Module`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The VAE (Variational Autoencoder) component, useful for generative tasks.
    - Python dtype: `torch.nn.Module`
- **`CLIP_VISION`**
    - Comfy dtype: `CLIP_VISION`
    - The CLIP vision component, optimized for visual understanding tasks.
    - Python dtype: `torch.nn.Module`
- **`NAME_STRING`**
    - Comfy dtype: `STRING`
    - The name of the checkpoint, extracted from the 'ckpt_name' parameter, providing a string identifier for the loaded checkpoint.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_unCLIP_Checkpoint_Loader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ckpt_name": (comfy_paths.get_filename_list("checkpoints"), ),
                             }}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "CLIP_VISION", "STRING")
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "CLIP_VISION", "NAME_STRING")
    FUNCTION = "load_checkpoint"

    CATEGORY = "WAS Suite/Loaders"

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = comfy_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, output_clipvision=True, embedding_directory=comfy_paths.get_folder_paths("embeddings"))
        return (out[0], out[1], out[2], out[3], os.path.splitext(os.path.basename(ckpt_name))[0])

```
