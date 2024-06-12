---
tags:
- Latent
- LatentBatch
---

# Select Every Nth Latent 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_SelectEveryNthLatent`
- Category: `Video Helper Suite 🎥🅥🅗🅢/latent`
- Output node: `False`

This node is designed to filter through a batch of latents, selecting every Nth latent according to a specified interval. It's useful for thinning out dense latent batches for more efficient processing or targeted analysis.
## Input types
### Required
- **`latents`**
    - The input latents to be filtered. This parameter is crucial for determining which latents will be processed and ultimately selected based on the interval.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`select_every_nth`**
    - Specifies the interval at which latents are selected. This parameter directly influences the density of the output latent batch, allowing for customizable thinning of the input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The filtered set of latents, containing only every Nth latent based on the specified interval.
    - Python dtype: `dict`
- **`count`**
    - Comfy dtype: `INT`
    - The total count of latents selected after applying the specified interval. This provides a quick reference to the size of the output batch.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SelectEveryNthLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "latents": ("LATENT",),
                    "select_every_nth": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1}),
                },
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/latent"

    RETURN_TYPES = ("LATENT", "INT",)
    RETURN_NAMES = ("LATENT", "count",)
    FUNCTION = "select_latents"

    def select_latents(self, latents: dict, select_every_nth: int):
        sub_latents = latents.copy()["samples"][0::select_every_nth]
        return ({"samples": sub_latents}, sub_latents.size(0))

```
