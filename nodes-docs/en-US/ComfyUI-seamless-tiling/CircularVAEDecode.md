---
tags:
- VAE
---

# Circular VAE Decode (tile)
## Documentation
- Class name: `CircularVAEDecode`
- Category: `latent`
- Output node: `False`

The CircularVAEDecode node is designed to decode latent representations into images, with an added functionality to apply circular tiling effects. This node allows for the generation of seamless images by modifying the VAE model to support circular asymmetry in the tiling process.
## Input types
### Required
- **`samples`**
    - The latent representation to be decoded into an image. It is crucial for generating the final output image.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`vae`**
    - The VAE model used for decoding the latent representation. It is essential for the transformation process.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`tiling`**
    - Specifies the type of circular tiling to apply, enabling seamless image generation in various orientations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded image, potentially with circular tiling applied, based on the input latent representation and tiling settings.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CircularVAEDecode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "samples": ("LATENT",),
                "vae": ("VAE",),
                "tiling": (["enable", "x_only", "y_only", "disable"],)
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "decode"

    CATEGORY = "latent"

    def decode(self, samples, vae, tiling):
        vae_copy = copy.deepcopy(vae)
        
        if tiling == "enable":
            make_circular_asymm(vae_copy.first_stage_model, True, True)
        elif tiling == "x_only":
            make_circular_asymm(vae_copy.first_stage_model, True, False)
        elif tiling == "y_only":
            make_circular_asymm(vae_copy.first_stage_model, False, True)
        else:
            make_circular_asymm(vae_copy.first_stage_model, False, False)
        
        result = (vae_copy.decode(samples["samples"]),)
        return result

```
