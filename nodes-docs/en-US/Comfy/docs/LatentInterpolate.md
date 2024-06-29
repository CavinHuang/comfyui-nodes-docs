---
tags:
- Latent
---

# LatentInterpolate
## Documentation
- Class name: `LatentInterpolate`
- Category: `latent/advanced`
- Output node: `False`

The LatentInterpolate node is designed to perform interpolation between two sets of latent samples based on a specified ratio, blending the characteristics of both sets to produce a new, intermediate set of latent samples.
## Input types
### Required
- **`samples1`**
    - The first set of latent samples to be interpolated. It serves as the starting point for the interpolation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`samples2`**
    - The second set of latent samples to be interpolated. It serves as the endpoint for the interpolation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`ratio`**
    - A floating-point value that determines the weight of each set of samples in the interpolated output. A ratio of 0 produces a copy of the first set, while a ratio of 1 produces a copy of the second set.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a new set of latent samples that represent an interpolated state between the two input sets, based on the specified ratio.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [Latent Noise Injection](../../was-node-suite-comfyui/Nodes/Latent Noise Injection.md)



## Source code
```python
class LatentInterpolate:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples1": ("LATENT",),
                              "samples2": ("LATENT",),
                              "ratio": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                              }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "op"

    CATEGORY = "latent/advanced"

    def op(self, samples1, samples2, ratio):
        samples_out = samples1.copy()

        s1 = samples1["samples"]
        s2 = samples2["samples"]

        s2 = reshape_latent_to(s1.shape, s2)

        m1 = torch.linalg.vector_norm(s1, dim=(1))
        m2 = torch.linalg.vector_norm(s2, dim=(1))

        s1 = torch.nan_to_num(s1 / m1)
        s2 = torch.nan_to_num(s2 / m2)

        t = (s1 * ratio + s2 * (1.0 - ratio))
        mt = torch.linalg.vector_norm(t, dim=(1))
        st = torch.nan_to_num(t / mt)

        samples_out["samples"] = st * (m1 * ratio + m2 * (1.0 - ratio))
        return (samples_out,)

```
