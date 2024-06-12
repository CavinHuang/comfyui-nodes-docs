---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Checkpoint Loader (Searge)
## Documentation
- Class name: `SeargeCheckpointLoader`
- Category: `Searge/_deprecated_/Files`
- Output node: `False`

The SeargeCheckpointLoader node is designed for loading specific checkpoints from a predefined repository. It abstracts the complexity of checkpoint loading mechanisms, providing a simplified interface for retrieving model, CLIP, and VAE components based on checkpoint names.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to load. This parameter is crucial for identifying and retrieving the correct checkpoint data, impacting the model, CLIP, and VAE components that are loaded.
    - Comfy dtype: `CHECKPOINT_NAME`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded model component from the specified checkpoint.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The loaded CLIP component from the specified checkpoint.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - The loaded VAE component from the specified checkpoint.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeCheckpointLoader:
    def __init__(self):
        self.chkp_loader = nodes.CheckpointLoaderSimple()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "ckpt_name": ("CHECKPOINT_NAME",),
        },
        }

    RETURN_TYPES = ("MODEL", "CLIP", "VAE",)
    FUNCTION = "load_checkpoint"

    CATEGORY = "Searge/_deprecated_/Files"

    def load_checkpoint(self, ckpt_name):
        return self.chkp_loader.load_checkpoint(ckpt_name)

```
