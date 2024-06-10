---
tags:
- LatentNoise
- Noise
---

# 🔧 Remove Latent Mask
## Documentation
- Class name: `RemoveLatentMask+`
- Category: `essentials`
- Output node: `False`

This node is designed to process latent representations by removing any existing noise mask from the samples. It ensures that the latent samples are clean and devoid of any artificially added noise, making them suitable for further processing or generation tasks.
## Input types
### Required
- **`samples`**
    - The latent representation of an image or a batch of images. This input is crucial as it contains the data from which the noise mask, if present, will be removed.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The cleaned latent representation after the removal of the noise mask. This output is ready for further processing or generation tasks without the interference of previously added noise.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemoveLatentMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "execute"

    CATEGORY = "essentials"

    def execute(self, samples):
        s = samples.copy()
        if "noise_mask" in s:
            del s["noise_mask"]

        return (s,)

```
