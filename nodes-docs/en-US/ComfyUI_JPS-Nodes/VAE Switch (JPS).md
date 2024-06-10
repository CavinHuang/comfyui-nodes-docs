---
tags:
- VAE
---

# VAE Switch (JPS)
## Documentation
- Class name: `VAE Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The VAE Switch node is designed to select and output one of several provided Variational Autoencoder (VAE) models based on an integer selection input. It facilitates dynamic switching between different VAE models within a pipeline, allowing for flexible model selection during runtime.
## Input types
### Required
- **`select`**
    - Determines which VAE model to output, with each integer value corresponding to a specific VAE model input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`vae_i`**
    - Represents a generic VAE model input that can be selected for output. The index 'i' can range from 1 to 5, allowing for dynamic selection among multiple VAE models.
    - Comfy dtype: `VAE`
    - Python dtype: `object`
## Output types
- **`vae_out`**
    - Comfy dtype: `VAE`
    - The selected VAE model based on the 'select' input.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VAE_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("VAE",)
    RETURN_NAMES = ("vae_out",)
    FUNCTION = "get_vae"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "vae_1": ("VAE",),
                "vae_2": ("VAE",),
                "vae_3": ("VAE",),
                "vae_4": ("VAE",),
                "vae_5": ("VAE",),
            }
        }

    def get_vae(self,select,vae_1=None,vae_2=None,vae_3=None,vae_4=None,vae_5=None,):
        
        vae_out = vae_1

        if (select == 2):
            vae_out = vae_2
        elif (select == 3):
            vae_out = vae_3
        elif (select == 4):
            vae_out = vae_4
        elif (select == 5):
            vae_out = vae_5

        return (vae_out,)

```
