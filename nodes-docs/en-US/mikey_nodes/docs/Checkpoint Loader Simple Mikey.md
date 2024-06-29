---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Checkpoint Loader Simple (Mikey)
## Documentation
- Class name: `Checkpoint Loader Simple Mikey`
- Category: `Mikey/Loaders`
- Output node: `False`

This node is designed to simplify the process of loading model checkpoints for further use in machine learning tasks. It abstracts away the complexities involved in locating, loading, and configuring checkpoints, making it easier for users to integrate pre-trained models into their workflows.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to be loaded. This parameter is crucial as it determines which checkpoint file is accessed and loaded for use.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded model object, ready for use in various machine learning tasks.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model associated with the loaded checkpoint, if applicable and requested.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE model associated with the loaded checkpoint, if applicable and requested.
    - Python dtype: `torch.nn.Module`
- **`ckpt_name`**
    - Comfy dtype: `STRING`
    - The name of the loaded checkpoint, useful for reference or further processing.
    - Python dtype: `str`
- **`ckpt_hash`**
    - Comfy dtype: `STRING`
    - A hash value representing the loaded checkpoint, useful for verification or identification purposes.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CheckpointLoaderSimpleMikey:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "STRING", "STRING")
    RETURN_NAMES = ("model", "clip", "vae", "ckpt_name", "ckpt_hash")
    FUNCTION = "load_checkpoint"

    CATEGORY = "Mikey/Loaders"

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True, unique_id=None, extra_pnginfo=None, prompt=None):
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        #print(ckpt_path)
        hash = get_file_hash(ckpt_path)
        ckpt_name = os.path.basename(ckpt_name)
        #prompt.get(str(unique_id))['inputs']['output_ckpt_hash'] = hash
        #prompt.get(str(unique_id))['inputs']['output_ckpt_name'] = ckpt_name
        return out[:3] + (ckpt_name, hash)

```
