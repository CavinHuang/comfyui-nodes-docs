---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# CheckpointLoaderSimple (dirty)
## Documentation
- Class name: `CheckpointLoaderSimple (dirty)`
- Category: `Bmad/api/dirty loaders`
- Output node: `False`

The CheckpointLoaderSimple (dirty) node is designed to streamline the process of loading model checkpoints in a less conventional or 'dirty' manner. It simplifies the checkpoint loading process by automatically finding and utilizing the appropriate checkpoint file based on a given name, facilitating easier and quicker model initialization for various applications.
## Input types
### Required
- **`ckpt_name`**
    - The 'ckpt_name' parameter specifies the name of the checkpoint file to be loaded. This node automates the process of finding the matching filename, making it easier to load models without needing to specify the exact file path.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The 'model' output represents the loaded model from the specified checkpoint, ready for further use or analysis.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The 'clip' output provides the CLIP model associated with the loaded checkpoint, if available and requested.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - The 'vae' output delivers the VAE model linked with the loaded checkpoint, if available and requested.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DirtyCheckpointLoaderSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"ckpt_name": ("STRING", {"default": ""})}}

    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_name = DirtyLoaderUtils.find_matching_filename(
            ckpt_name, folder_paths.get_filename_list("checkpoints"))

        loader = nodes.CheckpointLoaderSimple()
        return loader.load_checkpoint(ckpt_name, output_vae, output_clip)

```
