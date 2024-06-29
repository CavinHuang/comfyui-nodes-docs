---
tags:
- Batch
- Image
---

# Change Latent Batch Size (Inspire)
## Documentation
- Class name: `ChangeLatentBatchSize __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

This node is designed to modify the batch size of a given latent representation. It achieves this by resizing the tensor associated with the latent samples according to the specified new batch size and mode, ensuring the latent's structure is maintained while adapting to the new batch size requirements.
## Input types
### Required
- **`latent`**
    - The latent representation to be resized. It is crucial for maintaining the integrity of the data while adjusting its batch size.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`batch_size`**
    - Specifies the target batch size for the latent representation, directly influencing the resizing operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - Determines the method of resizing, offering flexibility in how the batch size adjustment is performed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The resized latent representation, now conforming to the specified batch size.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ChangeLatentBatchSize:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "latent": ("LATENT",),
                                "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096, "step": 1}),
                                "mode": (["simple"],)
                            }
                }

    CATEGORY = "InspirePack/Util"

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "doit"

    @staticmethod
    def doit(latent, batch_size, mode):
        res_latent = latent.copy()
        samples = res_latent['samples']
        samples = ChangeImageBatchSize.resize_tensor(samples, batch_size, mode)
        res_latent['samples'] = samples
        return (res_latent,)

```
