---
tags:
- LatentNoise
- Noise
---

# Inject Noise
## Documentation
- Class name: `BNK_InjectNoise`
- Category: `latent/noise`
- Output node: `False`

The `InjectNoise` node is designed to augment latent representations with noise, offering a mechanism to introduce variability and potentially enhance the generation quality of models. It supports the injection of custom noise and the application of a mask to selectively apply noise, thereby providing a versatile tool for manipulating latent spaces.
## Input types
### Required
- **`latents`**
    - The primary latent representation to which noise will be added. This parameter is crucial for defining the base structure that the noise will modify.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`strength`**
    - Determines the intensity of the noise applied to the latents. A higher value results in more pronounced noise effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`noise`**
    - An optional parameter allowing for the injection of custom noise into the latent representation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[Dict[str, torch.Tensor]]`
- **`mask`**
    - An optional mask that can be applied to selectively introduce noise to specific areas of the latent representation.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent representation after noise injection, potentially with selective application based on an optional mask.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InjectNoise:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "latents":("LATENT",),
            
            "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 200.0, "step": 0.01}),
            },
            "optional":{
                "noise":  ("LATENT",),
                "mask": ("MASK", ),
            }}
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "inject_noise"

    CATEGORY = "latent/noise"
        
    def inject_noise(self, latents, strength, noise=None, mask=None):
        s = latents.copy()
        if noise is None:
            return (s,)
        if latents["samples"].shape != noise["samples"].shape:
            print("warning, shapes in InjectNoise not the same, ignoring")
            return (s,)
        noised = s["samples"].clone() + noise["samples"].clone() * strength
        if mask is not None:
            mask = prepare_mask(mask, noised.shape)
            noised = mask * noised + (1-mask) * latents["samples"]
        s["samples"] = noised
        return (s,)

```
