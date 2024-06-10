---
tags:
- CLIP
- Loader
- ModelIO
---

# Load CLIP Vision
## Documentation
- Class name: `CLIPVisionLoader`
- Category: `loaders`
- Output node: `False`

The CLIPVisionLoader node is designed for loading CLIP Vision models from specified paths. It abstracts the complexities of locating and initializing CLIP Vision models, making them readily available for further processing or inference tasks.
## Input types
### Required
- **`clip_name`**
    - Specifies the name of the CLIP Vision model to be loaded. This name is used to locate the model file within a predefined directory structure.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - The loaded CLIP Vision model, ready for use in encoding images or performing other vision-related tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - IPAdapterApply
    - IPAdapterApplyFaceID
    - [IPAdapter](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapter.md)
    - [IPAdapterEncoder](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapterEncoder.md)
    - [CLIPVisionEncode](../../Comfy/Nodes/CLIPVisionEncode.md)
    - ToIPAdapterPipe //Inspire
    - Reroute
    - [AV_IPAdapter](../../comfyui-art-venture/Nodes/AV_IPAdapter.md)



## Source code
```python
class CLIPVisionLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_name": (folder_paths.get_filename_list("clip_vision"), ),
                             }}
    RETURN_TYPES = ("CLIP_VISION",)
    FUNCTION = "load_clip"

    CATEGORY = "loaders"

    def load_clip(self, clip_name):
        clip_path = folder_paths.get_full_path("clip_vision", clip_name)
        clip_vision = comfy.clip_vision.load(clip_path)
        return (clip_vision,)

```
