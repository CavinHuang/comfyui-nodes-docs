---
tags:
- Latent
- Normalization
---

# LatentNormalizeShuffle
## Documentation
- Class name: `LatentNormalizeShuffle`
- Category: `latent/filters`
- Output node: `False`

This node is designed to normalize and shuffle the latent representations of images, ensuring they are prepared for further processing or generation tasks. It adjusts the latent vectors to have a standard distribution and rearranges them to introduce variability, optimizing the input for diverse image generation outcomes.
## Input types
### Required
- **`latents`**
    - The 'latents' input represents the latent representations of images to be normalized and shuffled. This process ensures that the data is standardized and randomized, which is crucial for achieving varied and high-quality image generation results.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`flatten`**
    - The 'flatten' input specifies whether the latent representations should be flattened as part of the normalization process, affecting the structure of the data for subsequent operations.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
- **`normalize`**
    - The 'normalize' input determines whether the latent representations undergo normalization, adjusting their scale and distribution for consistent processing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`shuffle`**
    - The 'shuffle' input indicates whether the latent representations should be shuffled, introducing randomness and variability into the dataset for enhanced diversity in generation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output 'latent' are the normalized and shuffled latent representations, ready for use in subsequent image generation tasks. This ensures that the input data is optimally prepared for producing diverse and high-quality images.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentNormalizeShuffle:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT", ),
                "flatten": ("INT", {"default": 0, "min": 0, "max": 16}),
                "normalize": ("BOOLEAN", {"default": True}),
                "shuffle": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "batch_normalize"

    CATEGORY = "latent/filters"

    def batch_normalize(self, latents, flatten, normalize, shuffle):
        latents_copy = copy.deepcopy(latents)
        t = latents_copy["samples"] # [B x C x H x W]
        
        if flatten > 0:
            d = flatten * 2 + 1
            channels = t.shape[1]
            kernel = gaussian_kernel(d, 1, device=t.device).repeat(channels, 1, 1).unsqueeze(1)
            t_blurred = torch.nn.functional.conv2d(t, kernel, padding='same', groups=channels)
            t = t - t_blurred
        
        if normalize:
            for b in range(t.shape[0]):
                for c in range(4):
                    t_sd, t_mean = torch.std_mean(t[b,c])
                    t[b,c] = (t[b,c] - t_mean) / t_sd
        
        if shuffle:
            t_shuffle = []
            for i in (1,2,3,0):
                t_shuffle.append(t[:,i])
            t = torch.stack(t_shuffle, dim=1)
        
        latents_copy["samples"] = t
        return (latents_copy,)

```
