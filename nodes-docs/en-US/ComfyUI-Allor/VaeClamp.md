---
tags:
- DataClamp
---

# VaeClamp
## Documentation
- Class name: `VaeClamp`
- Category: `clamp`
- Output node: `False`

The VaeClamp node is designed to pass through Variational Autoencoder (VAE) models without modification. It serves as a utility within a pipeline to ensure compatibility or enforce constraints without altering the VAE model itself.
## Input types
### Required
- **`vae`**
    - The 'vae' input is a Variational Autoencoder (VAE) model that this node takes as input and returns unaltered. It is essential for maintaining the integrity of the VAE model within a processing pipeline.
    - Comfy dtype: `VAE`
    - Python dtype: `comfy.sd.VAE`
## Output types
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the unmodified Variational Autoencoder (VAE) model passed into the node.
    - Python dtype: `comfy.sd.VAE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VaeClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "vae": ("VAE",),
            }
        }

    RETURN_TYPES = ("VAE",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, vae):
        return (vae,)

```
