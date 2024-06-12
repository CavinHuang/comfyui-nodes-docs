---
tags:
- VAE
---

# StableCascade_SuperResolutionControlnet
## Documentation
- Class name: `StableCascade_SuperResolutionControlnet`
- Category: `_for_testing/stable_cascade`
- Output node: `False`

This node is designed for generating super-resolution control inputs for a cascading image generation process, utilizing a VAE to encode images into latent representations that are then adjusted for different stages of image resolution enhancement.
## Input types
### Required
- **`image`**
    - The input image to be processed and encoded into latent representations for super-resolution enhancement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - A variational autoencoder (VAE) model used to encode the input image into a latent space, facilitating the super-resolution process.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
## Output types
- **`controlnet_input`**
    - Comfy dtype: `IMAGE`
    - The encoded latent representation of the input image, prepared for the control network of the super-resolution process.
    - Python dtype: `torch.Tensor`
- **`stage_c`**
    - Comfy dtype: `LATENT`
    - A latent representation tailored for the initial stage of the super-resolution process.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`stage_b`**
    - Comfy dtype: `LATENT`
    - A latent representation tailored for the subsequent stage of the super-resolution process.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StableCascade_SuperResolutionControlnet:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "vae": ("VAE", ),
        }}
    RETURN_TYPES = ("IMAGE", "LATENT", "LATENT")
    RETURN_NAMES = ("controlnet_input", "stage_c", "stage_b")
    FUNCTION = "generate"

    CATEGORY = "_for_testing/stable_cascade"

    def generate(self, image, vae):
        width = image.shape[-2]
        height = image.shape[-3]
        batch_size = image.shape[0]
        controlnet_input = vae.encode(image[:,:,:,:3]).movedim(1, -1)

        c_latent = torch.zeros([batch_size, 16, height // 16, width // 16])
        b_latent = torch.zeros([batch_size, 4, height // 2, width // 2])
        return (controlnet_input, {
            "samples": c_latent,
        }, {
            "samples": b_latent,
        })

```
