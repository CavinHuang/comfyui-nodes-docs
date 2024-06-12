---
tags:
- CLIP
- Loader
- ModelIO
---

# DualCLIPLoader
## Documentation
- Class name: `DualCLIPLoader`
- Category: `advanced/loaders`
- Output node: `False`

The DualCLIPLoader node is designed for loading two CLIP models simultaneously, facilitating operations that require the integration or comparison of features from both models.
## Input types
### Required
- **`clip_name1`**
    - Specifies the name of the first CLIP model to be loaded. This parameter is crucial for identifying and retrieving the correct model from a predefined list of available CLIP models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_name2`**
    - Specifies the name of the second CLIP model to be loaded. This parameter enables the loading of a second distinct CLIP model for comparative or integrative analysis alongside the first model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - The output is a combined CLIP model that integrates the features or functionalities of the two specified CLIP models.
    - Python dtype: `comfy.sd.CLIP`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DualCLIPLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_name1": (folder_paths.get_filename_list("clip"), ), "clip_name2": (folder_paths.get_filename_list("clip"), ),
                             }}
    RETURN_TYPES = ("CLIP",)
    FUNCTION = "load_clip"

    CATEGORY = "advanced/loaders"

    def load_clip(self, clip_name1, clip_name2):
        clip_path1 = folder_paths.get_full_path("clip", clip_name1)
        clip_path2 = folder_paths.get_full_path("clip", clip_name2)
        clip = comfy.sd.load_clip(ckpt_paths=[clip_path1, clip_path2], embedding_directory=folder_paths.get_folder_paths("embeddings"))
        return (clip,)

```
