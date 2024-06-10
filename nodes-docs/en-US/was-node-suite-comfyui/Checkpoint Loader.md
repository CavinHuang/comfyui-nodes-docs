---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Checkpoint Loader
## Documentation
- Class name: `Checkpoint Loader`
- Category: `WAS Suite/Loaders/Advanced`
- Output node: `False`

The Checkpoint Loader node is designed for advanced loading operations, specifically to load various components such as models, CLIP, and VAE from specified checkpoints and configuration files. It facilitates the restoration of these components to their saved states, enabling the continuation of work or further manipulation.
## Input types
### Required
- **`config_name`**
    - Specifies the name of the configuration file to be used for loading. It plays a crucial role in determining the setup and parameters of the components to be loaded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`ckpt_name`**
    - Indicates the name of the checkpoint file from which the components are to be loaded. This file contains the saved state of the components.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The loaded model component.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The loaded CLIP component.
    - Python dtype: `torch.nn.Module`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The loaded VAE component.
    - Python dtype: `torch.nn.Module`
- **`NAME_STRING`**
    - Comfy dtype: `STRING`
    - The name string derived from the checkpoint file, providing an identifier for the loaded components.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactWildcardEncode](../../ComfyUI-Impact-Pack/Nodes/ImpactWildcardEncode.md)



## Source code
```python
class WAS_Checkpoint_Loader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "config_name": (comfy_paths.get_filename_list("configs"), ),
                              "ckpt_name": (comfy_paths.get_filename_list("checkpoints"), )}}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", TEXT_TYPE)
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "NAME_STRING")
    FUNCTION = "load_checkpoint"

    CATEGORY = "WAS Suite/Loaders/Advanced"

    def load_checkpoint(self, config_name, ckpt_name, output_vae=True, output_clip=True):
        config_path = comfy_paths.get_full_path("configs", config_name)
        ckpt_path = comfy_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint(config_path, ckpt_path, output_vae=True, output_clip=True, embedding_directory=comfy_paths.get_folder_paths("embeddings"))
        return (out[0], out[1], out[2], os.path.splitext(os.path.basename(ckpt_name))[0])

```
