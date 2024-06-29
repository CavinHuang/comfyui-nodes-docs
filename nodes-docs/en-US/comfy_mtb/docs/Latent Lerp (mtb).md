---
tags:
- Latent
---

# Latent Lerp (mtb)
## Documentation
- Class name: `Latent Lerp (mtb)`
- Category: `mtb/latent`
- Output node: `False`

Performs linear interpolation between two latent vectors, blending them based on a specified ratio to create a new latent vector.
## Input types
### Required
- **`A`**
    - The first latent vector to be interpolated.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`B`**
    - The second latent vector to be interpolated.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`t`**
    - The interpolation ratio, determining the blend between the two latent vectors.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The resulting latent vector after interpolation.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_LatentLerp:
    """Linear interpolation (blend) between two latent vectors"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "A": ("LATENT",),
                "B": ("LATENT",),
                "t": (
                    "FLOAT",
                    {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01},
                ),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "lerp_latent"

    CATEGORY = "mtb/latent"

    def lerp_latent(self, A, B, t):
        a = A.copy()
        b = B.copy()

        torch.lerp(a["samples"], b["samples"], t, out=a["samples"])

        return (a,)

```
