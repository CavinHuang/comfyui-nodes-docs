---
tags:
- Latent
- LatentBatch
---

# Latent Batch
## Documentation
- Class name: `Latent Batch`
- Category: `WAS Suite/Latent`
- Output node: `False`

This node is designed to merge two sets of latent representations into a single batch, potentially resizing one set to match the dimensions of the other before concatenation. It plays a crucial role in operations that require combining or comparing different sets of latent data.
## Input types
### Required
### Optional
- **`latent_a`**
    - The first set of latent samples to be batched. It is crucial as it sets the base dimensions for the output batch if resizing is needed.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`latent_b`**
    - The second set of latent samples to be batched. This set may be resized to match the dimensions of the first set before concatenation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`latent_c`**
    - An optional third set of latent samples that can be included in the batch. Similar to the other inputs, it may be resized to ensure consistency in dimensions.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`latent_d`**
    - An optional fourth set of latent samples for inclusion in the batch. It may also be resized for dimensional consistency with the other sets.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The combined set of latent samples from all input sets, potentially with some sets resized to match others' dimensions.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Latent_Batch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "latent_a": ("LATENT",),
                "latent_b": ("LATENT",),
                "latent_c": ("LATENT",),
                "latent_d": ("LATENT",),
            },
        }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)
    FUNCTION = "latent_batch"
    CATEGORY = "WAS Suite/Latent"

    def _check_latent_dimensions(self, tensors, names):
        dimensions = [(tensor["samples"].shape) for tensor in tensors]
        if len(set(dimensions)) > 1:
            mismatched_indices = [i for i, dim in enumerate(dimensions) if dim[1] != dimensions[0][1]]
            mismatched_latents = [names[i] for i in mismatched_indices]
            if mismatched_latents:
                raise ValueError(f"WAS latent Batch Warning: Input latent dimensions do not match for latents: {mismatched_latents}")

    def latent_batch(self, **kwargs):
        batched_tensors = [kwargs[key] for key in kwargs if kwargs[key] is not None]
        latent_names = [key for key in kwargs if kwargs[key] is not None]

        if not batched_tensors:
            raise ValueError("At least one input latent must be provided.")

        self._check_latent_dimensions(batched_tensors, latent_names)
        samples_out = {}
        samples_out["samples"]  = torch.cat([tensor["samples"] for tensor in batched_tensors], dim=0)
        samples_out["batch_index"] = []
        for tensor in batched_tensors:
            cindex = tensor.get("batch_index", list(range(tensor["samples"].shape[0])))
            samples_out["batch_index"] += cindex
        return (samples_out,)

```
