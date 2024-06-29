---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Load Checkpoint With Config (DEPRECATED)
## Documentation
- Class name: `CheckpointLoader`
- Category: `advanced/loaders`
- Output node: `False`

The CheckpointLoader node is designed for advanced loading operations, specifically to load model checkpoints along with their configurations. It facilitates the retrieval of model components necessary for initializing and running generative models, including configurations and checkpoints from specified directories.
## Input types
### Required
- **`config_name`**
    - Specifies the name of the configuration file to be used. This is crucial for determining the model's parameters and settings, affecting the model's behavior and performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`ckpt_name`**
    - Indicates the name of the checkpoint file to be loaded. This directly influences the state of the model being initialized, impacting its initial weights and biases.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Represents the primary model loaded from the checkpoint, ready for further operations or inference.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Provides the CLIP model component, if available and requested, loaded from the checkpoint.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - Delivers the VAE model component, if available and requested, loaded from the checkpoint.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CheckpointLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "config_name": (folder_paths.get_filename_list("configs"), ),
                              "ckpt_name": (folder_paths.get_filename_list("checkpoints"), )}}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "advanced/loaders"

    def load_checkpoint(self, config_name, ckpt_name, output_vae=True, output_clip=True):
        config_path = folder_paths.get_full_path("configs", config_name)
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        return comfy.sd.load_checkpoint(config_path, ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))

```
