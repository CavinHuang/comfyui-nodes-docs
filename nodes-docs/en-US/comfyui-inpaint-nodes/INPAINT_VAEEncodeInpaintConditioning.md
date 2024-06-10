---
tags:
- Conditioning
---

# VAE Encode & Inpaint Conditioning
## Documentation
- Class name: `INPAINT_VAEEncodeInpaintConditioning`
- Category: `inpaint`
- Output node: `False`

This node is designed for encoding and conditioning in the context of inpainting tasks, leveraging a Variational Autoencoder (VAE) to process and transform image pixels and masks into a format suitable for inpainting. It encapsulates the functionality to encode both positive and negative conditioning alongside generating latent representations for inpainting and sampling.
## Input types
### Required
- **`positive`**
    - Represents the positive conditioning input, crucial for guiding the inpainting process in a desired direction.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`negative`**
    - Serves as the negative conditioning input, used to steer the inpainting away from undesired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`vae`**
    - The Variational Autoencoder (VAE) model used for encoding the image pixels into a latent space representation.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`pixels`**
    - The image pixels to be inpainted, serving as the primary data for the encoding and conditioning process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`mask`**
    - The mask indicating areas to inpaint, essential for focusing the inpainting process on specific regions of the image.
    - Comfy dtype: `MASK`
    - Python dtype: `MASK`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The encoded and conditioned positive output, ready for inpainting.
    - Python dtype: `CONDITIONING`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The encoded and conditioned negative output, prepared for the inpainting process.
    - Python dtype: `CONDITIONING`
- **`latent_inpaint`**
    - Comfy dtype: `LATENT`
    - A latent representation specifically tailored for inpainting, including samples and a noise mask.
    - Python dtype: `dict`
- **`latent_samples`**
    - Comfy dtype: `LATENT`
    - The latent samples generated during the encoding process, useful for further inpainting tasks.
    - Python dtype: `LATENT`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VAEEncodeInpaintConditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "vae": ("VAE",),
                "pixels": ("IMAGE",),
                "mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent_inpaint", "latent_samples")
    FUNCTION = "encode"
    CATEGORY = "inpaint"

    def encode(self, positive, negative, vae, pixels, mask):
        positive, negative, latent = nodes.InpaintModelConditioning().encode(
            positive, negative, pixels, vae, mask
        )
        latent_inpaint = dict(
            samples=positive[0][1]["concat_latent_image"],
            noise_mask=latent["noise_mask"].round(),
        )
        return (positive, negative, latent_inpaint, latent)

```
