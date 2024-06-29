---
tags:
- VAE
---

# StableCascade_StageC_VAEEncode
## Documentation
- Class name: `StableCascade_StageC_VAEEncode`
- Category: `latent/stable_cascade`
- Output node: `False`

This node is designed to encode images into a compressed latent representation using a VAE model, with an adjustable level of compression. It facilitates the transformation of visual data into a more compact form, enabling efficient processing and manipulation in latent space.
## Input types
### Required
- **`image`**
    - The image to be encoded into latent space. It serves as the visual input that the node compresses into a latent representation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The VAE model used for encoding the image. It determines the method and quality of the compression into latent space.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`compression`**
    - The level of compression applied to the image before encoding. It affects the resolution of the output latent representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`stage_c`**
    - Comfy dtype: `LATENT`
    - The compressed latent representation of the image, specifically for stage C of the cascade process.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`stage_b`**
    - Comfy dtype: `LATENT`
    - A placeholder latent representation for stage B, initialized to zeros.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StableCascade_StageC_VAEEncode:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "vae": ("VAE", ),
            "compression": ("INT", {"default": 42, "min": 4, "max": 128, "step": 1}),
        }}
    RETURN_TYPES = ("LATENT", "LATENT")
    RETURN_NAMES = ("stage_c", "stage_b")
    FUNCTION = "generate"

    CATEGORY = "latent/stable_cascade"

    def generate(self, image, vae, compression):
        width = image.shape[-2]
        height = image.shape[-3]
        out_width = (width // compression) * vae.downscale_ratio
        out_height = (height // compression) * vae.downscale_ratio

        s = comfy.utils.common_upscale(image.movedim(-1,1), out_width, out_height, "bicubic", "center").movedim(1,-1)

        c_latent = vae.encode(s[:,:,:,:3])
        b_latent = torch.zeros([c_latent.shape[0], 4, (height // 8) * 2, (width // 8) * 2])
        return ({
            "samples": c_latent,
        }, {
            "samples": b_latent,
        })

```
