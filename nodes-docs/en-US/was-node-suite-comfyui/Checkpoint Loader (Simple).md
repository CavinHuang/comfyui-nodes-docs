---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Checkpoint Loader (Simple)
## Documentation
- Class name: `Checkpoint Loader (Simple)`
- Category: `WAS Suite/Loaders`
- Output node: `False`

This node is designed to load checkpoints for models, specifically focusing on a simplified process that requires only the checkpoint name. It aims to streamline the loading of model states for further use or analysis, making it accessible even without specifying configuration details.
## Input types
### Required
- **`ckpt_name`**
    - The name of the checkpoint to be loaded. This parameter is crucial as it identifies the specific checkpoint file from which the model's state will be restored.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The loaded model state.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The loaded CLIP model component, if applicable.
    - Python dtype: `torch.nn.Module`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The loaded VAE model component, if applicable.
    - Python dtype: `torch.nn.Module`
- **`NAME_STRING`**
    - Comfy dtype: `STRING`
    - The name string derived from the checkpoint, providing an identifier for the loaded model.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [CLIPSetLastLayer](../../Comfy/Nodes/CLIPSetLastLayer.md)
    - Reroute
    - [CR Apply LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply LoRA Stack.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)



## Source code
```python
class WAS_Checkpoint_Loader_Simple:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ckpt_name": (comfy_paths.get_filename_list("checkpoints"), ),
                             }}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", TEXT_TYPE)
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "NAME_STRING")
    FUNCTION = "load_checkpoint"

    CATEGORY = "WAS Suite/Loaders"

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = comfy_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=comfy_paths.get_folder_paths("embeddings"))
        return (out[0], out[1], out[2], os.path.splitext(os.path.basename(ckpt_name))[0])

```
