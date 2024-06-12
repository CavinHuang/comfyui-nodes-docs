---
tags:
- IdentityImage
---

# Load InstantID Model
## Documentation
- Class name: `InstantIDModelLoader`
- Category: `InstantID`
- Output node: `False`

The InstantIDModelLoader node is designed to load and initialize the InstantID model from a specified file path. It prepares the model for further processing or analysis by loading its checkpoint and configuring it based on the file type, ensuring compatibility and readiness for InstantID operations.
## Input types
### Required
- **`instantid_file`**
    - Specifies the file path to the InstantID model to be loaded. This parameter is crucial for locating and loading the model's checkpoint for initialization and further use.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`instantid`**
    - Comfy dtype: `INSTANTID`
    - Returns the loaded and initialized InstantID model, ready for further processing or analysis within the InstantID framework.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "instantid_file": (folder_paths.get_filename_list("instantid"), )}}

    RETURN_TYPES = ("INSTANTID",)
    FUNCTION = "load_model"
    CATEGORY = "InstantID"

    def load_model(self, instantid_file):
        ckpt_path = folder_paths.get_full_path("instantid", instantid_file)

        model = comfy.utils.load_torch_file(ckpt_path, safe_load=True)

        if ckpt_path.lower().endswith(".safetensors"):
            st_model = {"image_proj": {}, "ip_adapter": {}}
            for key in model.keys():
                if key.startswith("image_proj."):
                    st_model["image_proj"][key.replace("image_proj.", "")] = model[key]
                elif key.startswith("ip_adapter."):
                    st_model["ip_adapter"][key.replace("ip_adapter.", "")] = model[key]
            model = st_model

        return (model,)

```
