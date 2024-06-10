---
tags:
- MaskMath
---

# LatentSubtract
## Documentation
- Class name: `LatentSubtract`
- Category: `latent/advanced`
- Output node: `False`

The LatentSubtract node is designed for subtracting one latent representation from another. This operation can be used to manipulate or modify the characteristics of generative models' outputs by effectively removing features or attributes represented in one latent space from another.
## Input types
### Required
- **`samples1`**
    - The first set of latent samples to be subtracted from. It serves as the base for the subtraction operation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`samples2`**
    - The second set of latent samples that will be subtracted from the first set. This operation can alter the resulting generative model's output by removing attributes or features.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The result of subtracting the second set of latent samples from the first. This modified latent representation can be used for further generative tasks.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentSubtract:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples1": ("LATENT",), "samples2": ("LATENT",)}}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "op"

    CATEGORY = "latent/advanced"

    def op(self, samples1, samples2):
        samples_out = samples1.copy()

        s1 = samples1["samples"]
        s2 = samples2["samples"]

        s2 = reshape_latent_to(s1.shape, s2)
        samples_out["samples"] = s1 - s2
        return (samples_out,)

```
