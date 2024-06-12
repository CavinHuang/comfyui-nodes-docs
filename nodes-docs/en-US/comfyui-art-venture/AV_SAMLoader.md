---
tags:
- SAM
---

# SAM Loader
## Documentation
- Class name: `AV_SAMLoader`
- Category: `Art Venture/Segmentation`
- Output node: `False`

The AV_SAMLoader node is designed for loading SAM (Segmentation-Aware Models) specifically tailored for Art Venture's segmentation tasks. It facilitates the dynamic loading of SAM models based on the model name, ensuring that the appropriate segmentation model is utilized for image processing tasks.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the SAM model to be loaded. This parameter is crucial for identifying and loading the correct model for segmentation tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sam_model`**
    - Comfy dtype: `AV_SAM_MODEL`
    - Returns the loaded SAM model, ready for segmentation tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SAMLoader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": (folder_paths.get_filename_list("sams"),),
            }
        }

    RETURN_TYPES = ("AV_SAM_MODEL",)
    RETURN_NAMES = ("sam_model",)
    FUNCTION = "load_model"
    CATEGORY = "Art Venture/Segmentation"

    def load_model(self, model_name):
        modelname = folder_paths.get_full_path("sams", model_name)

        state_dict = comfy.utils.load_torch_file(modelname)
        encoder_size = state_dict["image_encoder.patch_embed.proj.bias"].shape[0]

        if encoder_size == 1280:
            model_kind = "vit_h"
        elif encoder_size == 1024:
            model_kind = "vit_l"
        else:
            model_kind = "vit_b"

        sam = sam_model_registry[model_kind]()
        sam.load_state_dict(state_dict)

        return (sam,)

```
