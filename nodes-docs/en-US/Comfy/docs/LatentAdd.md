---
tags:
- Latent
- LatentBlend
---

# LatentAdd
## Documentation
- Class name: `LatentAdd`
- Category: `latent/advanced`
- Output node: `False`

The LatentAdd node is designed for the addition of two latent representations. It facilitates the combination of features or characteristics encoded in these representations by performing element-wise addition.
## Input types
### Required
- **`samples1`**
    - The first set of latent samples to be added. It represents one of the inputs whose features are to be combined with another set of latent samples.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`samples2`**
    - The second set of latent samples to be added. It serves as the other input whose features are combined with the first set of latent samples through element-wise addition.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The result of the element-wise addition of two latent samples, representing a new set of latent samples that combines the features of both inputs.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentAdd:
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
        samples_out["samples"] = s1 + s2
        return (samples_out,)

```
