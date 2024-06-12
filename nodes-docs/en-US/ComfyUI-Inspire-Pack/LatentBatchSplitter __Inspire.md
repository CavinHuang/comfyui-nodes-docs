---
tags:
- Batch
- Image
- ImageSplitting
---

# Latent Batch Splitter (Inspire)
## Documentation
- Class name: `LatentBatchSplitter __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The LatentBatchSplitter node is designed to split a batch of latent representations into smaller batches or individual samples, based on a specified count. This functionality is crucial for managing and manipulating batches of data in scenarios where operations need to be performed on smaller subsets or individual items within a larger batch.
## Input types
### Required
- **`latent`**
    - The 'latent' parameter represents the batch of latent representations to be split. It is crucial for determining the structure and content of the output batches.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`split_count`**
    - The 'split_count' parameter specifies the number of splits or individual samples to extract from the input batch. It affects the granularity of the splitting operation, allowing for flexible batch size adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a tuple of smaller batches or individual latent representations, derived from the original input batch according to the specified split count.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentBatchSplitter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "latent": ("LATENT",),
                    "split_count": ("INT", {"default": 4, "min": 0, "max": 50, "step": 1}),
                    },
                }

    RETURN_TYPES = ByPassTypeTuple(("LATENT", ))
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, latent, split_count):
        samples = latent['samples']

        latent_base = latent.copy()
        del latent_base['samples']

        cnt = min(split_count, len(samples))
        res = []

        for single_samples in samples[:cnt]:
            item = latent_base.copy()
            item['samples'] = single_samples.unsqueeze(0)
            res.append(item)

        if split_count >= len(samples):
            lack_cnt = split_count - cnt + 1  # including remained
            item = latent_base.copy()
            item['samples'] = empty_latent()

            for x in range(0, lack_cnt):
                res.append(item)

        elif cnt < len(samples):
            remained_cnt = len(samples) - cnt
            remained_latent = latent_base.copy()
            remained_latent['samples'] = samples[-remained_cnt:]
            res.append(remained_latent)

        return tuple(res)

```
