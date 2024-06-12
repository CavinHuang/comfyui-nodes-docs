---
tags:
- Batch
- Image
- ImageDuplication
---

# Duplicate Latent Batch 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_DuplicateLatents`
- Category: `Video Helper Suite 🎥🅥🅗🅢/latent`
- Output node: `False`

The `VHS_DuplicateLatents` node is designed to replicate a batch of latent representations a specified number of times. This functionality is crucial for operations that require augmenting the amount of data without altering its inherent properties, such as in data augmentation processes or when preparing data for batch processing in machine learning models.
## Input types
### Required
- **`latents`**
    - The `latents` parameter represents the input latent representations to be duplicated. It is essential for specifying the data that will undergo replication.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict[str, torch.Tensor]`
- **`multiply_by`**
    - The `multiply_by` parameter determines the number of times the input latents are replicated. It plays a critical role in scaling the dataset according to the desired augmentation factor.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The output latent representations, duplicated according to the `multiply_by` parameter.
    - Python dtype: `dict[str, torch.Tensor]`
- **`count`**
    - Comfy dtype: `INT`
    - The total count of latent representations after duplication, providing a straightforward way to understand the scale of the output data.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [LatentComposite](../../Comfy/Nodes/LatentComposite.md)



## Source code
```python
class DuplicateLatents:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT",),
                "multiply_by": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1})
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/latent"

    RETURN_TYPES = ("LATENT", "INT",)
    RETURN_NAMES = ("LATENT", "count",)
    FUNCTION = "duplicate_input"

    def duplicate_input(self, latents: dict[str, Tensor], multiply_by: int):
        new_latents = latents.copy()
        full_latents = []
        for n in range(0, multiply_by):
            full_latents.append(new_latents["samples"])
        new_latents["samples"] = torch.cat(full_latents, dim=0)
        return (new_latents, new_latents["samples"].size(0),)

```
