---
tags:
- Latent
---

# LatentMultiply
## Documentation
- Class name: `LatentMultiply`
- Category: `latent/advanced`
- Output node: `False`

The LatentMultiply node is designed to scale the latent representation of samples by a specified multiplier. This operation allows for the adjustment of the intensity or magnitude of features within the latent space, enabling fine-tuning of generated content or the exploration of variations within a given latent direction.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations to be scaled. It is crucial for defining the input data on which the multiplication operation will be performed.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`multiplier`**
    - The 'multiplier' parameter specifies the scaling factor to be applied to the latent samples. It plays a key role in adjusting the magnitude of the latent features, allowing for nuanced control over the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent samples, scaled by the specified multiplier. This allows for the exploration of variations within the latent space by adjusting the intensity of its features.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentMultiply:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "multiplier": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "op"

    CATEGORY = "latent/advanced"

    def op(self, samples, multiplier):
        samples_out = samples.copy()

        s1 = samples["samples"]
        samples_out["samples"] = s1 * multiplier
        return (samples_out,)

```
