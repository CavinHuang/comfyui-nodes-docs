---
tags:
- Latent
- LatentBlend
---

# Latent Blend
## Documentation
- Class name: `LatentBlend`
- Category: `_for_testing`
- Output node: `False`

The LatentBlend node is designed to blend two sets of latent samples together, based on a specified blend factor and mode. It allows for the creation of new, hybrid samples by combining features from both input sets in a controlled manner.
## Input types
### Required
- **`samples1`**
    - The first set of latent samples to be blended. It serves as the base for the blending operation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`samples2`**
    - The second set of latent samples to be blended with the first set. It contributes to the new, hybrid samples created by the blend operation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`blend_factor`**
    - A float value that determines the proportion of the first set of samples in the final blend. A higher value gives more weight to the first set, while a lower value favors the second set.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a set of blended latent samples, combining features from both input sets according to the blend factor and mode.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - NNLatentUpscale
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - Mute / Bypass Repeater (rgthree)



## Source code
```python
class LatentBlend:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "samples1": ("LATENT",),
            "samples2": ("LATENT",),
            "blend_factor": ("FLOAT", {
                "default": 0.5,
                "min": 0,
                "max": 1,
                "step": 0.01
            }),
        }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "blend"

    CATEGORY = "_for_testing"

    def blend(self, samples1, samples2, blend_factor:float, blend_mode: str="normal"):

        samples_out = samples1.copy()
        samples1 = samples1["samples"]
        samples2 = samples2["samples"]

        if samples1.shape != samples2.shape:
            samples2.permute(0, 3, 1, 2)
            samples2 = comfy.utils.common_upscale(samples2, samples1.shape[3], samples1.shape[2], 'bicubic', crop='center')
            samples2.permute(0, 2, 3, 1)

        samples_blended = self.blend_mode(samples1, samples2, blend_mode)
        samples_blended = samples1 * blend_factor + samples_blended * (1 - blend_factor)
        samples_out["samples"] = samples_blended
        return (samples_out,)

    def blend_mode(self, img1, img2, mode):
        if mode == "normal":
            return img2
        else:
            raise ValueError(f"Unsupported blend mode: {mode}")

```
