---
tags:
- LatentNoise
- Noise
---

# InjectNoiseToLatent
## Documentation
- Class name: `easy injectNoiseToLatent`
- Category: `EasyUse/Latent`
- Output node: `False`

The `injectNoiseToLatent` node is designed to modify latent representations by injecting noise, allowing for the generation of varied outputs from a given input. It supports operations such as averaging or scaling the noise before injection, normalization of the resulting noisy latent, and conditional application of noise based on a mask, facilitating nuanced control over the noise injection process.
## Input types
### Required
- **`strength`**
    - Specifies the strength of the noise to be injected into the latent space, affecting the intensity of the modification.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`normalize`**
    - Determines whether the noised latent should be normalized, impacting the distribution of the resulting latent values.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`average`**
    - Controls whether the original and noised latents are averaged, blending the input and noise for a potentially smoother result.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pipe_to_noise`**
    - An optional pipeline input that can provide noise settings and samples, offering an alternative source of noise.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`image_to_latent`**
    - An optional image input that, if provided, will be converted to a latent representation for noise injection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`latent`**
    - The primary latent input to which noise will be added. If not provided, an attempt will be made to use an alternative source.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`noise`**
    - The noise to be injected into the latent. This can be provided directly or sourced from the `pipe_to_noise` input.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`mask`**
    - An optional mask that can be applied to selectively inject noise into parts of the latent space, allowing for localized modifications.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mix_randn_amount`**
    - Specifies the amount of random noise to mix into the noised latent, introducing additional randomness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent representation after noise injection, which may exhibit variations depending on the applied noise and settings.
    - Python dtype: `dict`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class injectNoiseToLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "strength": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 200.0, "step": 0.0001}),
            "normalize": ("BOOLEAN", {"default": False}),
            "average": ("BOOLEAN", {"default": False}),
        },
            "optional": {
                "pipe_to_noise": ("PIPE_LINE",),
                "image_to_latent": ("IMAGE",),
                "latent": ("LATENT",),
                "noise": ("LATENT",),
                "mask": ("MASK",),
                "mix_randn_amount": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000.0, "step": 0.001}),
                # "seed": ("INT", {"default": 123, "min": 0, "max": 0xffffffffffffffff, "step": 1}),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "inject"
    CATEGORY = "EasyUse/Latent"

    def inject(self,strength, normalize, average, pipe_to_noise=None, noise=None, image_to_latent=None, latent=None, mix_randn_amount=0, mask=None):

        vae = pipe_to_noise["vae"] if pipe_to_noise is not None else pipe_to_noise["vae"]
        batch_size = pipe_to_noise["loader_settings"]["batch_size"] if pipe_to_noise is not None and "batch_size" in pipe_to_noise["loader_settings"] else 1
        if noise is None and pipe_to_noise is not None:
            noise = pipe_to_noise["samples"]
        elif noise is None:
            raise Exception("InjectNoiseToLatent: No noise provided")

        if image_to_latent is not None and vae is not None:
            samples = {"samples": vae.encode(image_to_latent[:, :, :, :3])}
            latents = RepeatLatentBatch().repeat(samples, batch_size)[0]
        elif latent is not None:
            latents = latent
        else:
            raise Exception("InjectNoiseToLatent: No input latent provided")

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
            mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])),
                                                   size=(noised.shape[2], noised.shape[3]), mode="bilinear")
            mask = mask.expand((-1, noised.shape[1], -1, -1))
            if mask.shape[0] < noised.shape[0]:
                mask = mask.repeat((noised.shape[0] - 1) // mask.shape[0] + 1, 1, 1, 1)[:noised.shape[0]]
            noised = mask * noised + (1 - mask) * latents["samples"]
        if mix_randn_amount > 0:
            # if seed is not None:
            #     torch.manual_seed(seed)
            rand_noise = torch.randn_like(noised)
            noised = ((1 - mix_randn_amount) * noised + mix_randn_amount *
                      rand_noise) / ((mix_randn_amount ** 2 + (1 - mix_randn_amount) ** 2) ** 0.5)
        samples["samples"] = noised
        return (samples,)

```
