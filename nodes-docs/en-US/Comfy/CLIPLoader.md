---
tags:
- CLIP
- Loader
- ModelIO
---

# Load CLIP
## Documentation
- Class name: `CLIPLoader`
- Category: `advanced/loaders`
- Output node: `False`

The CLIPLoader node is designed for loading CLIP models, supporting different types such as stable diffusion and stable cascade. It abstracts the complexities of loading and configuring CLIP models for use in various applications, providing a streamlined way to access these models with specific configurations.
## Input types
### Required
- **`clip_name`**
    - Specifies the name of the CLIP model to be loaded. This name is used to locate the model file within a predefined directory structure.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`type`**
    - Determines the type of CLIP model to load, offering options between 'stable_diffusion' and 'stable_cascade'. This affects how the model is initialized and configured.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - The loaded CLIP model, ready for use in downstream tasks or further processing.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_name": (folder_paths.get_filename_list("clip"), ),
                              "type": (["stable_diffusion", "stable_cascade"], ),
                             }}
    RETURN_TYPES = ("CLIP",)
    FUNCTION = "load_clip"

    CATEGORY = "advanced/loaders"

    def load_clip(self, clip_name, type="stable_diffusion"):
        clip_type = comfy.sd.CLIPType.STABLE_DIFFUSION
        if type == "stable_cascade":
            clip_type = comfy.sd.CLIPType.STABLE_CASCADE

        clip_path = folder_paths.get_full_path("clip", clip_name)
        clip = comfy.sd.load_clip(ckpt_paths=[clip_path], embedding_directory=folder_paths.get_folder_paths("embeddings"), clip_type=clip_type)
        return (clip,)

```
