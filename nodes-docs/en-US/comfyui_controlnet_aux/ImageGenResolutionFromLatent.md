---
tags:
- ImageResolution
- ImageTransformation
---

# Generation Resolution From Latent
## Documentation
- Class name: `ImageGenResolutionFromLatent`
- Category: `ControlNet Preprocessors`
- Output node: `False`

This node is designed to calculate the generation resolution for images based on the dimensions of a given latent representation. It extracts the height and width from the latent's shape and scales them to determine the appropriate resolution for image generation.
## Input types
### Required
- **`latent`**
    - The latent representation from which the image generation resolution will be derived. The latent's shape is used to calculate the desired output dimensions by scaling its height and width.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`IMAGE_GEN_WIDTH (INT)`**
    - Comfy dtype: `INT`
    - The calculated width for image generation, derived from the latent's dimensions and scaled appropriately.
    - Python dtype: `int`
- **`IMAGE_GEN_HEIGHT (INT)`**
    - Comfy dtype: `INT`
    - The calculated height for image generation, derived from the latent's dimensions and scaled appropriately.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
class ImageGenResolutionFromLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": { "latent": ("LATENT", ) }
        }
    
    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("IMAGE_GEN_WIDTH (INT)", "IMAGE_GEN_HEIGHT (INT)")
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors"

    def execute(self, latent):
        _, _, H, W = latent["samples"].shape
        return (W * 8, H * 8)

```
