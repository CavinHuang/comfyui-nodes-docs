---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Image Only Checkpoint Loader (img2vid model)
## Documentation
- Class name: `ImageOnlyCheckpointLoader`
- Category: `loaders/video_models`
- Output node: `False`

This node specializes in loading checkpoints specifically for image-based models within video generation workflows. It efficiently retrieves and configures the necessary components from a given checkpoint, focusing on image-related aspects of the model.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to load. This parameter is crucial for identifying and retrieving the correct checkpoint file from a predefined list of available checkpoints.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the main model loaded from the checkpoint, configured for image processing within video generation contexts.
    - Python dtype: `torch.nn.Module`
- **`clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - Provides the CLIP vision component extracted from the checkpoint, tailored for image understanding and feature extraction.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - Delivers the Variational Autoencoder (VAE) component, essential for image manipulation and generation tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [VideoLinearCFGGuidance](../../Comfy/Nodes/VideoLinearCFGGuidance.md)
    - Reroute
    - [StableZero123_Conditioning](../../Comfy/Nodes/StableZero123_Conditioning.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - workflow/front



## Source code
```python
class ImageOnlyCheckpointLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                             }}
    RETURN_TYPES = ("MODEL", "CLIP_VISION", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "loaders/video_models"

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=False, output_clipvision=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        return (out[0], out[3], out[2])

```
