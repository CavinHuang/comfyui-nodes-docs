---
tags:
- Latent
- Normalization
---

# Batch Normalize (Latent)
## Documentation
- Class name: `BatchNormalizeLatent`
- Category: `latent/filters`
- Output node: `False`

This node applies batch normalization to latent representations, adjusting each latent sample's distribution towards a standard distribution, thereby stabilizing and potentially improving the generative process.
## Input types
### Required
- **`latents`**
    - The latent representations to be normalized. This input is crucial for the normalization process as it directly modifies the distribution of these latents.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`factor`**
    - A scaling factor that interpolates between the original and normalized latent representations, allowing for controlled adjustment of the normalization effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The normalized latent representations, adjusted according to the specified factor to potentially enhance generative model performance.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchNormalizeLatent:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT", ),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "batch_normalize"

    CATEGORY = "latent/filters"

    def batch_normalize(self, latents, factor):
        latents_copy = copy.deepcopy(latents)
        t = latents_copy["samples"] # [B x C x H x W]
        
        t = t.movedim(0,1) # [C x B x H x W]
        for c in range(t.size(0)):
            c_sd, c_mean = torch.std_mean(t[c], dim=None)
            
            for i in range(t.size(1)):
                i_sd, i_mean = torch.std_mean(t[c, i], dim=None)
                
                t[c, i] = (t[c, i] - i_mean) / i_sd
            
            t[c] = t[c] * c_sd + c_mean
        
        latents_copy["samples"] = torch.lerp(latents["samples"], t.movedim(1,0), factor) # [B x C x H x W]
        return (latents_copy,)

```
