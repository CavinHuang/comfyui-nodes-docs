---
tags:
- LatentNoise
- Noise
---

# Remove Noise Mask
## Documentation
- Class name: `RemoveNoiseMask`
- Category: `ImpactPack/Util`
- Output node: `False`

The RemoveNoiseMask node is designed to process and modify latent representations by removing or altering the noise mask associated with them. This operation is crucial for refining the quality of generated images or for preparing the latent representations for further processing steps that require a specific noise configuration.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations that are to be processed. It plays a crucial role in determining the outcome of the noise mask removal or alteration, affecting the quality and characteristics of the resulting images.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The 'latent' output represents the modified latent representations after the noise mask has been removed or altered. This output is essential for subsequent image generation or processing steps, as it provides a refined basis for further manipulations.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemoveNoiseMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"samples": ("LATENT",)}}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, samples):
        res = {key: value for key, value in samples.items() if key != 'noise_mask'}
        return (res, )

```
