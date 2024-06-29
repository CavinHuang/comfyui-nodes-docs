---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Model Loader (Searge)
## Documentation
- Class name: `SeargeUpscaleModelLoader`
- Category: `Searge/_deprecated_/Files`
- Output node: `False`

The SeargeUpscaleModelLoader node is designed to load upscale models by name, facilitating the dynamic selection and utilization of different upscaling algorithms or models within a system. It abstracts the complexities of model loading, ensuring that the appropriate upscale model is readily available for image enhancement tasks.
## Input types
### Required
- **`upscaler_name`**
    - Specifies the name of the upscaler model to be loaded. This parameter is crucial for identifying and retrieving the correct model from a predefined collection of upscale models.
    - Comfy dtype: `UPSCALER_NAME`
    - Python dtype: `str`
## Output types
- **`upscale_model`**
    - Comfy dtype: `UPSCALE_MODEL`
    - Returns the loaded upscale model, ready for use in upscaling tasks. This output is essential for subsequent image processing stages that require a specific upscaling model.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeUpscaleModelLoader:
    def __init__(self):
        self.upscale_model_loader = comfy_extras.nodes_upscale_model.UpscaleModelLoader()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "upscaler_name": ("UPSCALER_NAME",),
        },
        }

    RETURN_TYPES = ("UPSCALE_MODEL",)
    FUNCTION = "load_upscaler"

    CATEGORY = "Searge/_deprecated_/Files"

    def load_upscaler(self, upscaler_name):
        return self.upscale_model_loader.load_model(upscaler_name)

```
