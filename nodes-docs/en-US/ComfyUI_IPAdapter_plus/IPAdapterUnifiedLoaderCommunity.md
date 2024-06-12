---
tags:
- IPAdapter
- IPAdapterLoader
---

# IPAdapter Unified Loader Community
## Documentation
- Class name: `IPAdapterUnifiedLoaderCommunity`
- Category: `ipadapter/loaders`
- Output node: `False`

The IPAdapterUnifiedLoaderCommunity node is designed to facilitate the loading of community-specific models into the IPAdapter framework. It allows for the customization and extension of model capabilities by incorporating community-driven presets and configurations.
## Input types
### Required
- **`model`**
    - Specifies the model to be loaded, serving as a key identifier within the IPAdapter framework.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`preset`**
    - Defines the preset configuration to be applied to the model, focusing on community-specific enhancements or modifications.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`ipadapter`**
    - Optional parameter to specify an existing IPAdapter instance for further customization or modification.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the loaded model, ready for integration and use within the IPAdapter framework.
    - Python dtype: `str`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - Returns an IPAdapter instance, potentially modified or customized based on the input parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterUnifiedLoaderCommunity(IPAdapterUnifiedLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL", ),
            "preset": (['Composition',], ),
        },
        "optional": {
            "ipadapter": ("IPADAPTER", ),
        }}

    CATEGORY = "ipadapter/loaders"

```
