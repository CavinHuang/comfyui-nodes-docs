---
tags:
- DataClamp
---

# UpscaleModelClamp
## Documentation
- Class name: `UpscaleModelClamp`
- Category: `clamp`
- Output node: `False`

The UpscaleModelClamp node is designed to pass through upscale models without modification, serving as a placeholder or checkpoint within a processing pipeline that involves model manipulation.
## Input types
### Required
- **`upscale_model`**
    - The upscale model to be passed through the node. It acts as a direct input for potential further processing or utilization within the pipeline.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
## Output types
- **`upscale_model`**
    - Comfy dtype: `UPSCALE_MODEL`
    - The unaltered upscale model that was input into the node, facilitating seamless integration into subsequent stages of the pipeline.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UpscaleModelClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "upscale_model": ("UPSCALE_MODEL",),
            },
        }

    RETURN_TYPES = ("UPSCALE_MODEL",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, upscale_model):
        return (upscale_model,)

```
