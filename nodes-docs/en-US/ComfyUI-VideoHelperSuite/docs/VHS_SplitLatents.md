---
tags:
- Latent
- LatentBatch
---

# Split Latent Batch 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_SplitLatents`
- Category: `Video Helper Suite 🎥🅥🅗🅢/latent`
- Output node: `False`

The VHS_SplitLatents node is designed to divide a batch of latents into two groups based on a specified index. This functionality is essential for managing and manipulating latent batches within video processing workflows, allowing for flexible dataset segmentation and targeted processing of latent representations.
## Input types
### Required
- **`latents`**
    - The 'latents' parameter represents the batch of latent vectors to be split. It is crucial for determining the composition of the resulting groups post-split, affecting the node's execution and outcomes.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`split_index`**
    - The 'split_index' parameter specifies the position at which the batch of latents should be divided. It plays a pivotal role in determining the size and content of the two resulting latent groups, impacting the node's functionality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`LATENT_A`**
    - Comfy dtype: `LATENT`
    - Represents the first group of latent vectors obtained after the split, based on the provided split index.
    - Python dtype: `dict`
- **`A_count`**
    - Comfy dtype: `INT`
    - Indicates the count of latent vectors in the first group post-split.
    - Python dtype: `int`
- **`LATENT_B`**
    - Comfy dtype: `LATENT`
    - Denotes the second group of latent vectors obtained after the split, following the provided split index.
    - Python dtype: `dict`
- **`B_count`**
    - Comfy dtype: `INT`
    - Specifies the count of latent vectors in the second group post-split.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SplitLatents:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "latents": ("LATENT",),
                    "split_index": ("INT", {"default": 0, "step": 1, "min": BIGMIN, "max": BIGMAX}),
                },
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/latent"

    RETURN_TYPES = ("LATENT", "INT", "LATENT", "INT")
    RETURN_NAMES = ("LATENT_A", "A_count", "LATENT_B", "B_count")
    FUNCTION = "split_latents"

    def split_latents(self, latents: dict, split_index: int):
        latents = latents.copy()
        group_a = latents["samples"][:split_index]
        group_b = latents["samples"][split_index:]
        group_a_latent = {"samples": group_a}
        group_b_latent = {"samples": group_b}
        return (group_a_latent, group_a.size(0), group_b_latent, group_b.size(0))

```
