---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Load LDSR Model
## Documentation
- Class name: `LDSRModelLoader`
- Category: `Flowty LDSR`
- Output node: `False`

The LDSRModelLoader node is designed to load and prepare LDSR (Low-Dimensional Super-Resolution) models for use, specifically focusing on selecting and initializing models for image upscaling tasks.
## Input types
### Required
- **`model`**
    - Specifies the model to be loaded for the upscaling task. The choice of model can influence the quality and characteristics of the upscaling result.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`upscale_model`**
    - Comfy dtype: `UPSCALE_MODEL`
    - Returns the loaded and CPU-transferred LDSR model ready for image upscaling tasks.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [LDSRUpscale](../../ComfyUI-Flowty-LDSR/Nodes/LDSRUpscale.md)



## Source code
```python
class LDSRModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        model_list = get_filename_list("upscale_models")
        candidates = [name for name in model_list if 'last.ckpt' in name]
        if len(candidates) > 0:
            default_path = candidates[0]
        else:
            default_path = 'last.ckpt'

        return {
            "required": {
                "model": (model_list, {'default': default_path}),
            }
        }

    RETURN_TYPES = ("UPSCALE_MODEL",)
    FUNCTION = "load"

    CATEGORY = "Flowty LDSR"

    def load(self, model):
        model_path = get_full_path("upscale_models", model)
        model = LDSR.load_model_from_path(model_path)
        model['model'].cpu()
        return (model, )

```
