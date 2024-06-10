---
tags:
- Counting
---

# Get Latent Count 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_GetLatentCount`
- Category: `Video Helper Suite 🎥🅥🅗🅢/latent`
- Output node: `False`

This node is designed to count the number of latent representations present in a given input. It provides a straightforward way to quantify the size of latent batches, facilitating operations that require knowledge of batch dimensions.
## Input types
### Required
- **`latents`**
    - Represents the latent representations to be counted. This input is crucial for determining the total number of latents in the batch, which directly influences the node's output.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
## Output types
- **`count`**
    - Comfy dtype: `INT`
    - The total number of latent representations in the input batch. This output is essential for understanding the size of the latent batch and for further processing that depends on batch size.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetLatentCount:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT",),
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/latent"

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("count",)
    FUNCTION = "count_input"

    def count_input(self, latents: dict):
        return (latents["samples"].size(0),)

```
