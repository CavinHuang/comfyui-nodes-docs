---
tags:
- Sampling
---

# TwoSamplersForMask
## Documentation
- Class name: `TwoSamplersForMask`
- Category: `ImpactPack/Sampler`
- Output node: `False`

This node applies two distinct sampling processes to a latent image using a mask. Initially, it applies an inverse mask to the latent image with one sampler, then applies the original mask with another sampler, effectively blending two different sampling effects based on the mask's pattern.
## Input types
### Required
- **`latent_image`**
    - The latent representation of an image to be processed. It serves as the base for applying the sampling effects.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`base_sampler`**
    - A sampler that applies its effect to the areas of the latent image not covered by the mask.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `KSAMPLER`
- **`mask_sampler`**
    - A sampler that applies its effect specifically to the areas of the latent image covered by the mask.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `KSAMPLER`
- **`mask`**
    - A binary mask determining the areas of the latent image to be affected by the mask_sampler.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent image after applying the two sampling processes.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TwoSamplersForMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "latent_image": ("LATENT", ),
                     "base_sampler": ("KSAMPLER", ),
                     "mask_sampler": ("KSAMPLER", ),
                     "mask": ("MASK", )
                     },
                }

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Sampler"

    def doit(self, latent_image, base_sampler, mask_sampler, mask):
        inv_mask = torch.where(mask != 1.0, torch.tensor(1.0), torch.tensor(0.0))

        latent_image['noise_mask'] = inv_mask
        new_latent_image = base_sampler.sample(latent_image)

        new_latent_image['noise_mask'] = mask
        new_latent_image = mask_sampler.sample(new_latent_image)

        del new_latent_image['noise_mask']

        return (new_latent_image, )

```
