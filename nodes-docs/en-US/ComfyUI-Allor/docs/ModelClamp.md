---
tags:
- DataClamp
---

# ModelClamp
## Documentation
- Class name: `ModelClamp`
- Category: `clamp`
- Output node: `False`

The ModelClamp node is designed to pass through model data without modification, serving as a placeholder or checkpoint within a data processing pipeline.
## Input types
### Required
- **`model`**
    - The 'model' parameter represents the model data to be passed through the node. It is essential for maintaining the integrity of the model's structure and information throughout the processing pipeline.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output 'model' is the unaltered model data passed through the node, ensuring the model's structure and information remain intact.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ModelClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
            },
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, model):
        return (model,)

```
