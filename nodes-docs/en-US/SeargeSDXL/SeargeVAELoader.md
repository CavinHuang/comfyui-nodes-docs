---
tags:
- VAE
---

# VAE Loader (Searge)
## Documentation
- Class name: `SeargeVAELoader`
- Category: `Searge/_deprecated_/Files`
- Output node: `False`

The SeargeVAELoader node is designed for loading pre-trained VAE models by name, facilitating the integration of these models into the processing pipeline for various tasks such as image generation or manipulation.
## Input types
### Required
- **`vae_name`**
    - Specifies the name of the VAE model to be loaded, serving as a key to retrieve the corresponding pre-trained model.
    - Comfy dtype: `VAE_NAME`
    - Python dtype: `str`
## Output types
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the loaded VAE model, ready for use in downstream tasks such as encoding or decoding images.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeVAELoader:
    def __init__(self):
        self.vae_loader = nodes.VAELoader()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "vae_name": ("VAE_NAME",),
        },
        }

    RETURN_TYPES = ("VAE",)
    FUNCTION = "load_vae"

    CATEGORY = "Searge/_deprecated_/Files"

    def load_vae(self, vae_name):
        return self.vae_loader.load_vae(vae_name)

```
