---
tags:
- IPAdapter
- IPAdapterLoader
---

# IPAdapter Model Loader
## Documentation
- Class name: `IPAdapterModelLoader`
- Category: `ipadapter/loaders`
- Output node: `False`

The IPAdapterModelLoader node is designed to load IPAdapter models from a specified directory, facilitating the integration and application of these models within the IPAdapter framework.
## Input types
### Required
- **`ipadapter_file`**
    - Specifies the file path of the IPAdapter model to be loaded. This parameter is crucial for identifying and loading the correct model file for use in the IPAdapter framework.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - Represents the loaded IPAdapter model, ready for integration and use within the IPAdapter framework.
    - Python dtype: `IPAdapterModel`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - IPAdapterApply
    - IPAdapterApplyFaceID
    - IPAdapterApplyEncoded
    - ToIPAdapterPipe //Inspire
    - Reroute
    - [AV_IPAdapter](../../comfyui-art-venture/Nodes/AV_IPAdapter.md)



## Source code
```python
class IPAdapterModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ipadapter_file": (folder_paths.get_filename_list("ipadapter"), )}}

    RETURN_TYPES = ("IPADAPTER",)
    FUNCTION = "load_ipadapter_model"
    CATEGORY = "ipadapter/loaders"

    def load_ipadapter_model(self, ipadapter_file):
        ipadapter_file = folder_paths.get_full_path("ipadapter", ipadapter_file)
        return (ipadapter_model_loader(ipadapter_file),)

```
