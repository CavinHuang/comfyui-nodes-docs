---
tags:
- Loader
---

# PhotoMakerLoader
## Documentation
- Class name: `PhotoMakerLoader`
- Category: `_for_testing/photomaker`
- Output node: `False`

The PhotoMakerLoader node is designed to load a specific photomaker model by name, facilitating the integration and utilization of photomaker capabilities within a broader system.
## Input types
### Required
- **`photomaker_model_name`**
    - Specifies the name of the photomaker model to be loaded. This parameter is crucial for identifying and retrieving the correct model from a predefined list of available models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`photomaker`**
    - Comfy dtype: `PHOTOMAKER`
    - Returns an instance of the photomaker model loaded with the specified model's state. This enables the application of photomaker functionalities to input data.
    - Python dtype: `PhotoMakerIDEncoder`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PhotoMakerLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "photomaker_model_name": (folder_paths.get_filename_list("photomaker"), )}}

    RETURN_TYPES = ("PHOTOMAKER",)
    FUNCTION = "load_photomaker_model"

    CATEGORY = "_for_testing/photomaker"

    def load_photomaker_model(self, photomaker_model_name):
        photomaker_model_path = folder_paths.get_full_path("photomaker", photomaker_model_name)
        photomaker_model = PhotoMakerIDEncoder()
        data = comfy.utils.load_torch_file(photomaker_model_path, safe_load=True)
        if "id_encoder" in data:
            data = data["id_encoder"]
        photomaker_model.load_state_dict(data)
        return (photomaker_model,)

```
