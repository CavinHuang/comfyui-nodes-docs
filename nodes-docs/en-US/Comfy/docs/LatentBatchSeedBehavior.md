---
tags:
- Batch
- Image
---

# LatentBatchSeedBehavior
## Documentation
- Class name: `LatentBatchSeedBehavior`
- Category: `latent/advanced`
- Output node: `False`

The LatentBatchSeedBehavior node is designed to modify the seed behavior of a batch of latent samples. It allows for either randomizing or fixing the seed across the batch, thereby influencing the generation process by either introducing variability or maintaining consistency in the generated outputs.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the batch of latent samples to be processed. Its modification depends on the seed behavior chosen, affecting the consistency or variability of the generated outputs.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`seed_behavior`**
    - The 'seed_behavior' parameter dictates whether the seed for the batch of latent samples should be randomized or fixed. This choice significantly impacts the generation process by either introducing variability or ensuring consistency across the batch.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent samples, with adjustments made based on the specified seed behavior. It either maintains or alters the batch index to reflect the chosen seed behavior.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentBatchSeedBehavior:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "seed_behavior": (["random", "fixed"],{"default": "fixed"}),}}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "op"

    CATEGORY = "latent/advanced"

    def op(self, samples, seed_behavior):
        samples_out = samples.copy()
        latent = samples["samples"]
        if seed_behavior == "random":
            if 'batch_index' in samples_out:
                samples_out.pop('batch_index')
        elif seed_behavior == "fixed":
            batch_number = samples_out.get("batch_index", [0])[0]
            samples_out["batch_index"] = [batch_number] * latent.shape[0]

        return (samples_out,)

```
