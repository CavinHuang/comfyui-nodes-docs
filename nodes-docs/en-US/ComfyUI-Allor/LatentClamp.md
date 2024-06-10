---
tags:
- DataClamp
---

# LatentClamp
## Documentation
- Class name: `LatentClamp`
- Category: `clamp`
- Output node: `False`

The LatentClamp node is designed to pass through latent representations without modification. It serves as a placeholder or checkpoint within a pipeline, ensuring that the latent data structure is preserved for subsequent processing steps.
## Input types
### Required
- **`latent`**
    - The 'latent' parameter represents the latent data structure to be passed through. Its preservation is crucial for maintaining the integrity of data flow in processes that manipulate or analyze latent representations.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Returns the unaltered latent data structure, ensuring continuity in the processing pipeline where latent representations are crucial.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": ("LATENT",),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, latent):
        return (latent,)

```
