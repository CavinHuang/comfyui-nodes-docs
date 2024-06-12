---
tags:
- Checkpoint
- Loader
- ModelIO
- ModelLoader
---

# ImageOnlyCheckpointSave
## Documentation
- Class name: `ImageOnlyCheckpointSave`
- Category: `_for_testing`
- Output node: `True`

This node specializes in saving model checkpoints specifically for image-based applications, incorporating additional components like CLIP vision and VAE models. It allows for the customization of the checkpoint's filename prefix and optionally includes prompt and extra PNG information for enhanced flexibility and metadata storage.
## Input types
### Required
- **`model`**
    - The primary model whose state is to be saved as a checkpoint. It is central to the checkpoint creation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip_vision`**
    - The CLIP vision model to be included in the checkpoint, enabling enhanced image understanding capabilities.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - The VAE model to be included in the checkpoint, facilitating image generation or manipulation tasks.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`filename_prefix`**
    - A customizable prefix for the checkpoint filename, allowing for organized storage and easy identification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageOnlyCheckpointSave(comfy_extras.nodes_model_merging.CheckpointSave):
    CATEGORY = "_for_testing"

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "clip_vision": ("CLIP_VISION",),
                              "vae": ("VAE",),
                              "filename_prefix": ("STRING", {"default": "checkpoints/ComfyUI"}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}

    def save(self, model, clip_vision, vae, filename_prefix, prompt=None, extra_pnginfo=None):
        comfy_extras.nodes_model_merging.save_checkpoint(model, clip_vision=clip_vision, vae=vae, filename_prefix=filename_prefix, output_dir=self.output_dir, prompt=prompt, extra_pnginfo=extra_pnginfo)
        return {}

```
