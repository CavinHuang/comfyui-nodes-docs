---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# CheckpointLoader (dirty)
## Documentation
- Class name: `CheckpointLoader (dirty)`
- Category: `Bmad/api/dirty loaders`
- Output node: `False`

The CheckpointLoader (dirty) node is designed for loading model checkpoints in a flexible manner, accommodating potentially mismatched or incomplete filenames by utilizing utility functions to find the best match. It supports loading various components of a model, such as configurations and weights, to facilitate the restoration or continuation of model training and inference processes.
## Input types
### Required
- **`config_name`**
    - The 'config_name' parameter specifies the name of the configuration file for the model. It plays a crucial role in determining the model's architecture and parameters for loading, with the node employing utility functions to handle mismatches or missing extensions in the filename.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`ckpt_name`**
    - The 'ckpt_name' parameter indicates the name of the checkpoint file containing the model's weights. This parameter is essential for identifying and loading the correct model state, with utility functions aiding in resolving filename discrepancies.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Represents the loaded model with its architecture and weights restored, ready for further training or inference.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Denotes the CLIP component of the loaded model, if applicable and requested.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - Indicates the VAE component of the loaded model, if applicable and requested.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DirtyCheckpointLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "config_name": ("STRING", {"default": ""}),
            "ckpt_name": ("STRING", {"default": ""})
        }}

    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_checkpoint(self, config_name, ckpt_name, output_vae=True, output_clip=True):
        ckpt_name = DirtyLoaderUtils.find_matching_filename(
            ckpt_name, folder_paths.get_filename_list("checkpoints"))

        config_name = DirtyLoaderUtils.find_matching_filename(
            config_name, folder_paths.get_filename_list("checkpoints"))

        loader = nodes.CheckpointLoader()
        return loader.load_checkpoint(config_name, ckpt_name, output_vae, output_clip)

```
