---
tags:
- VAE
---

# VAE Input Switch
## Documentation
- Class name: `VAE Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node is designed to switch between two VAE (Variational Autoencoder) models based on a boolean condition. It facilitates dynamic model selection within workflows, enabling conditional logic to dictate the choice of VAE model for subsequent operations.
## Input types
### Required
- **`vae_a`**
    - The first VAE model option for the switch. This model is selected if the boolean condition is true.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`vae_b`**
    - The second VAE model option for the switch. This model is chosen if the boolean condition is false.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`boolean`**
    - A boolean condition that determines which VAE model (vae_a or vae_b) is selected for output. True selects vae_a, and false selects vae_b.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`vae`**
    - Comfy dtype: `VAE`
    - The selected VAE model based on the boolean condition. This output can then be used in subsequent nodes that require a VAE model.
    - Python dtype: `VAE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_VAE_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "vae_a": ("VAE",),
                "vae_b": ("VAE",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("VAE",)
    FUNCTION = "vae_switch"

    CATEGORY = "WAS Suite/Logic"

    def vae_switch(self, vae_a, vae_b, boolean=True):

        if boolean:
            return (vae_a, )
        else:
            return (vae_b, )

```
