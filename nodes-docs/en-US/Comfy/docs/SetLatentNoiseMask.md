---
tags:
- LatentNoise
- Noise
---

# Set Latent Noise Mask
## Documentation
- Class name: `SetLatentNoiseMask`
- Category: `latent/inpaint`
- Output node: `False`

This node is designed to apply a noise mask to a set of latent samples. It modifies the input samples by integrating a specified mask, thereby altering their noise characteristics.
## Input types
### Required
- **`samples`**
    - The latent samples to which the noise mask will be applied. This parameter is crucial for determining the base content that will be modified.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`mask`**
    - The mask to be applied to the latent samples. It defines the areas and intensity of noise alteration within the samples.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent samples with the applied noise mask.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - Mute / Bypass Repeater (rgthree)



## Source code
```python
class SetLatentNoiseMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "mask": ("MASK",),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "set_mask"

    CATEGORY = "latent/inpaint"

    def set_mask(self, samples, mask):
        s = samples.copy()
        s["noise_mask"] = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1]))
        return (s,)

```
