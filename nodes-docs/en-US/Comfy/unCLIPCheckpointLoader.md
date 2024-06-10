---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# unCLIPCheckpointLoader
## Documentation
- Class name: `unCLIPCheckpointLoader`
- Category: `loaders`
- Output node: `False`

The unCLIPCheckpointLoader node is designed for loading checkpoints specifically tailored for unCLIP models. It facilitates the retrieval and initialization of models, CLIP vision modules, and VAEs from a specified checkpoint, streamlining the setup process for further operations or analyses.
## Input types
### Required
- **`ckpt_name`**
    - The 'ckpt_name' parameter specifies the name of the checkpoint to be loaded. It is crucial for identifying and retrieving the correct checkpoint file from a predefined directory of checkpoints, thereby determining the models and configurations to be initialized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Represents the primary model loaded from the checkpoint.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Represents the CLIP module loaded from the checkpoint, if available.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - Represents the VAE module loaded from the checkpoint, if available.
    - Python dtype: `torch.nn.Module`
- **`clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - Represents the CLIP vision module loaded from the checkpoint, if available.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class unCLIPCheckpointLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                             }}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "CLIP_VISION")
    FUNCTION = "load_checkpoint"

    CATEGORY = "loaders"

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, output_clipvision=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        return out

```
