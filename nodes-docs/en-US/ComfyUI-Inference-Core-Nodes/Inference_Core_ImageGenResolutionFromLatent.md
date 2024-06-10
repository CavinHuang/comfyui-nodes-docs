---
tags:
- ImageResolution
- ImageTransformation
---

# [Inference.Core] Generation Resolution From Latent
## Documentation
- Class name: `Inference_Core_ImageGenResolutionFromLatent`
- Category: `ControlNet Preprocessors`
- Output node: `False`

This node is designed to calculate the generation resolution for images based on the latent space representation. It extracts the height and width from the latent samples and scales them to determine the optimal resolution for image generation.
## Input types
### Required
- **`latent`**
    - The latent representation from which the image's generation resolution is derived. It affects the output by determining the base dimensions that are scaled to compute the final image resolution.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`IMAGE_GEN_WIDTH (INT)`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`IMAGE_GEN_HEIGHT (INT)`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


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
