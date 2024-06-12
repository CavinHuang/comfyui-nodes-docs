---
tags:
- LatentNoise
- Noise
---

# InjectNoiseToLatent
## Documentation
- Class name: `InjectNoiseToLatent`
- Category: `KJNodes/noise`
- Output node: `False`

The InjectNoiseToLatent node is designed to modify latent representations by injecting noise into them. This process can include averaging the original and noise latents, scaling the noise by a strength factor, normalizing the noised latent, applying a mask to selectively noise parts of the latent, and optionally mixing in random noise. The node aims to enhance or alter the characteristics of the latent space for various generative tasks.
## Input types
### Required
- **`latents`**
    - The original latent representations to which noise will be added. It serves as the base for noise injection, influencing the final output by its initial characteristics.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`strength`**
    - A factor that scales the injected noise, controlling the intensity of the noise effect on the latents.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - The noise tensor to be injected into the latents, providing the variability or perturbation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`normalize`**
    - A boolean flag indicating whether to normalize the noised latent, affecting its distribution.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`average`**
    - Determines if the noise should be averaged with the original latents, offering a method to blend rather than solely add noise.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`mask`**
    - An optional mask to apply selective noise injection, allowing for targeted alterations of the latent space.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mix_randn_amount`**
    - The amount of random noise to mix into the noised latent, further introducing randomness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - An optional seed for random number generation, ensuring reproducibility when mixing random noise.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent representations after noise injection, reflecting the combined effects of the input parameters.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InjectNoiseToLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "latents":("LATENT",),  
            "strength": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 200.0, "step": 0.0001}),
            "noise":  ("LATENT",),
            "normalize": ("BOOLEAN", {"default": False}),
            "average": ("BOOLEAN", {"default": False}),
            },
            "optional":{
                "mask": ("MASK", ),
                "mix_randn_amount": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000.0, "step": 0.001}),
                "seed": ("INT", {"default": 123,"min": 0, "max": 0xffffffffffffffff, "step": 1}),
            }
            }
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "injectnoise"
    CATEGORY = "KJNodes/noise"
        
    def injectnoise(self, latents, strength, noise, normalize, average, mix_randn_amount=0, seed=None, mask=None):
        samples = latents.copy()
        if latents["samples"].shape != noise["samples"].shape:
            raise ValueError("InjectNoiseToLatent: Latent and noise must have the same shape")
        if average:
            noised = (samples["samples"].clone() + noise["samples"].clone()) / 2
        else:
            noised = samples["samples"].clone() + noise["samples"].clone() * strength
        if normalize:
            noised = noised / noised.std()
        if mask is not None:
            mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noised.shape[2], noised.shape[3]), mode="bilinear")
            mask = mask.expand((-1,noised.shape[1],-1,-1))
            if mask.shape[0] < noised.shape[0]:
                mask = mask.repeat((noised.shape[0] -1) // mask.shape[0] + 1, 1, 1, 1)[:noised.shape[0]]
            noised = mask * noised + (1-mask) * latents["samples"]
        if mix_randn_amount > 0:
            if seed is not None:
                torch.manual_seed(seed)
            rand_noise = torch.randn_like(noised)
            noised = ((1 - mix_randn_amount) * noised + mix_randn_amount *
                            rand_noise) / ((mix_randn_amount**2 + (1-mix_randn_amount)**2) ** 0.5)
        samples["samples"] = noised
        return (samples,)

```
