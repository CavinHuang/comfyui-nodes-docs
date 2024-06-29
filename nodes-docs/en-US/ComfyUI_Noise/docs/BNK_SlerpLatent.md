---
tags:
- Latent
---

# Slerp Latents
## Documentation
- Class name: `BNK_SlerpLatent`
- Category: `latent`
- Output node: `False`

The BNK_SlerpLatent node performs spherical linear interpolation (SLERP) between two latent spaces, allowing for smooth transitions and interpolations between different latent representations. It can optionally apply a mask to selectively interpolate parts of the latent spaces.
## Input types
### Required
- **`latents1`**
    - The first set of latent representations to interpolate from. It serves as the starting point for the interpolation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`factor`**
    - A scalar factor determining the interpolation's progress between the two latent spaces. A factor of 0 returns the first latent space, while a factor of 1 returns the second.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`latents2`**
    - The second set of latent representations to interpolate towards. This optional parameter allows for interpolation between two distinct latent spaces.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[Dict[str, torch.Tensor]]`
- **`mask`**
    - An optional mask to apply during interpolation, enabling selective blending of the latent spaces based on the mask's pattern.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The interpolated latent representation, smoothly blending between the two input latent spaces according to the specified factor and optional mask.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentSlerp:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents1":("LATENT",),
                "factor": ("FLOAT", {"default": .5, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
            "optional" :{
                "latents2":("LATENT",),
                "mask": ("MASK", ),
            }}
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "slerp_latents"

    CATEGORY = "latent"
        
    def slerp_latents(self, latents1, factor, latents2=None, mask=None):
        s = latents1.copy()
        if latents2 is None:
            return (s,)
        if latents1["samples"].shape != latents2["samples"].shape:
            print("warning, shapes in LatentSlerp not the same, ignoring")
            return (s,)
        slerped = slerp(factor, latents1["samples"].clone(), latents2["samples"].clone())
        if mask is not None:
            mask = prepare_mask(mask, slerped.shape)
            slerped = mask * slerped + (1-mask) * latents1["samples"]
        s["samples"] = slerped
        return (s,)

```
