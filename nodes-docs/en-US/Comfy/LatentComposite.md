---
tags:
- Latent
- LatentBlend
---

# Latent Composite
## Documentation
- Class name: `LatentComposite`
- Category: `latent`
- Output node: `False`

The LatentComposite node is designed to blend or merge two latent representations into a single output. This process is essential for creating composite images or features by combining the characteristics of the input latents in a controlled manner.
## Input types
### Required
- **`samples_to`**
    - The 'samples_to' latent representation where the 'samples_from' will be composited onto. It serves as the base for the composite operation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`samples_from`**
    - The 'samples_from' latent representation to be composited onto the 'samples_to'. It contributes its features or characteristics to the final composite output.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`x`**
    - The x-coordinate (horizontal position) where the 'samples_from' latent will be placed on the 'samples_to'. It determines the horizontal alignment of the composite.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y-coordinate (vertical position) where the 'samples_from' latent will be placed on the 'samples_to'. It determines the vertical alignment of the composite.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`feather`**
    - A boolean indicating whether the 'samples_from' latent should be resized to match the 'samples_to' before compositing. This can affect the scale and proportion of the composite result.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a composite latent representation, blending the features of both 'samples_to' and 'samples_from' latents based on the specified coordinates and resizing option.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [LatentComposite](../../Comfy/Nodes/LatentComposite.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)



## Source code
```python
class LatentComposite:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples_to": ("LATENT",),
                              "samples_from": ("LATENT",),
                              "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "feather": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "composite"

    CATEGORY = "latent"

    def composite(self, samples_to, samples_from, x, y, composite_method="normal", feather=0):
        x =  x // 8
        y = y // 8
        feather = feather // 8
        samples_out = samples_to.copy()
        s = samples_to["samples"].clone()
        samples_to = samples_to["samples"]
        samples_from = samples_from["samples"]
        if feather == 0:
            s[:,:,y:y+samples_from.shape[2],x:x+samples_from.shape[3]] = samples_from[:,:,:samples_to.shape[2] - y, :samples_to.shape[3] - x]
        else:
            samples_from = samples_from[:,:,:samples_to.shape[2] - y, :samples_to.shape[3] - x]
            mask = torch.ones_like(samples_from)
            for t in range(feather):
                if y != 0:
                    mask[:,:,t:1+t,:] *= ((1.0/feather) * (t + 1))

                if y + samples_from.shape[2] < samples_to.shape[2]:
                    mask[:,:,mask.shape[2] -1 -t: mask.shape[2]-t,:] *= ((1.0/feather) * (t + 1))
                if x != 0:
                    mask[:,:,:,t:1+t] *= ((1.0/feather) * (t + 1))
                if x + samples_from.shape[3] < samples_to.shape[3]:
                    mask[:,:,:,mask.shape[3]- 1 - t: mask.shape[3]- t] *= ((1.0/feather) * (t + 1))
            rev_mask = torch.ones_like(mask) - mask
            s[:,:,y:y+samples_from.shape[2],x:x+samples_from.shape[3]] = samples_from[:,:,:samples_to.shape[2] - y, :samples_to.shape[3] - x] * mask + s[:,:,y:y+samples_from.shape[2],x:x+samples_from.shape[3]] * rev_mask
        samples_out["samples"] = s
        return (samples_out,)

```
