---
tags:
- Latent
- LatentBatch
---

# LatentBatch
## Documentation
- Class name: `LatentBatch`
- Category: `latent/batch`
- Output node: `False`

The LatentBatch node is designed to merge two sets of latent samples into a single batch, potentially resizing one set to match the dimensions of the other before concatenation. This operation facilitates the combination of different latent representations for further processing or generation tasks.
## Input types
### Required
- **`samples1`**
    - The first set of latent samples to be merged. It plays a crucial role in determining the final shape of the merged batch.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`samples2`**
    - The second set of latent samples to be merged. If its dimensions differ from the first set, it is resized to ensure compatibility before merging.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The merged set of latent samples, now combined into a single batch for further processing.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples1": ("LATENT",), "samples2": ("LATENT",)}}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "batch"

    CATEGORY = "latent/batch"

    def batch(self, samples1, samples2):
        samples_out = samples1.copy()
        s1 = samples1["samples"]
        s2 = samples2["samples"]

        if s1.shape[1:] != s2.shape[1:]:
            s2 = comfy.utils.common_upscale(s2, s1.shape[3], s1.shape[2], "bilinear", "center")
        s = torch.cat((s1, s2), dim=0)
        samples_out["samples"] = s
        samples_out["batch_index"] = samples1.get("batch_index", [x for x in range(0, s1.shape[0])]) + samples2.get("batch_index", [x for x in range(0, s2.shape[0])])
        return (samples_out,)

```
