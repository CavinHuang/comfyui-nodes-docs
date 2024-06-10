---
tags:
- ConditionalSelection
- ImpactPack
---

# ImpactLatentInfo
## Documentation
- Class name: `ImpactLatentInfo`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `False`

The ImpactLatentInfo node is designed to process latent representations, specifically by analyzing their shape and dimensions. It abstracts the complexity of handling latent spaces by providing a straightforward interface for extracting critical dimensional information.
## Input types
### Required
- **`value`**
    - The 'value' parameter represents the latent representation to be analyzed. It is crucial for determining the shape and dimensions of the latent space, which are essential for further processing or manipulation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`batch`**
    - Comfy dtype: `INT`
    - Represents the batch size of the input latent representation.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - Indicates the modified height dimension of the latent representation.
    - Python dtype: `int`
- **`width`**
    - Comfy dtype: `INT`
    - Indicates the modified width dimension of the latent representation.
    - Python dtype: `int`
- **`channel`**
    - Comfy dtype: `INT`
    - Represents the channel dimension of the input latent representation.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactLatentInfo:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "value": ("LATENT", ),
                    },
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"

    RETURN_TYPES = ("INT", "INT", "INT", "INT")
    RETURN_NAMES = ("batch", "height", "width", "channel")

    def doit(self, value):
        shape = value['samples'].shape
        return (shape[0], shape[2] * 8, shape[3] * 8, shape[1])

```
