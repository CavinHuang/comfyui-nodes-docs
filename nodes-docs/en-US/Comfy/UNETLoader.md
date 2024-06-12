---
tags:
- Loader
- ModelIO
- ModelLoader
---

# UNETLoader
## Documentation
- Class name: `UNETLoader`
- Category: `advanced/loaders`
- Output node: `False`

The UNETLoader node is designed for loading U-Net models by name, facilitating the use of pre-trained U-Net architectures within the system.
## Input types
### Required
- **`unet_name`**
    - Specifies the name of the U-Net model to be loaded. This name is used to locate the model within a predefined directory structure, enabling the dynamic loading of different U-Net models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the loaded U-Net model, allowing it to be utilized for further processing or inference within the system.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PatchModelAddDownscale](../../Comfy/Nodes/PatchModelAddDownscale.md)
    - Reroute



## Source code
```python
class UNETLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "unet_name": (folder_paths.get_filename_list("unet"), ),
                             }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "load_unet"

    CATEGORY = "advanced/loaders"

    def load_unet(self, unet_name):
        unet_path = folder_paths.get_full_path("unet", unet_name)
        model = comfy.sd.load_unet(unet_path)
        return (model,)

```
