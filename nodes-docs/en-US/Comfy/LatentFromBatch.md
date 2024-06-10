---
tags:
- Latent
- LatentBatch
---

# Latent From Batch
## Documentation
- Class name: `LatentFromBatch`
- Category: `latent/batch`
- Output node: `False`

This node is designed to extract a specific subset of latent samples from a given batch based on the specified batch index and length. It allows for selective processing of latent samples, facilitating operations on smaller segments of the batch for efficiency or targeted manipulation.
## Input types
### Required
- **`samples`**
    - The collection of latent samples from which a subset will be extracted. This parameter is crucial for determining the source batch of samples to be processed.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`batch_index`**
    - Specifies the starting index within the batch from which the subset of samples will begin. This parameter enables targeted extraction of samples from specific positions in the batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`length`**
    - Defines the number of samples to be extracted from the specified starting index. This parameter controls the size of the subset to be processed, allowing for flexible manipulation of batch segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The extracted subset of latent samples, now available for further processing or analysis.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [LatentBlend](../../Comfy/Nodes/LatentBlend.md)



## Source code
```python
class LatentFromBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "batch_index": ("INT", {"default": 0, "min": 0, "max": 63}),
                              "length": ("INT", {"default": 1, "min": 1, "max": 64}),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "frombatch"

    CATEGORY = "latent/batch"

    def frombatch(self, samples, batch_index, length):
        s = samples.copy()
        s_in = samples["samples"]
        batch_index = min(s_in.shape[0] - 1, batch_index)
        length = min(s_in.shape[0] - batch_index, length)
        s["samples"] = s_in[batch_index:batch_index + length].clone()
        if "noise_mask" in samples:
            masks = samples["noise_mask"]
            if masks.shape[0] == 1:
                s["noise_mask"] = masks.clone()
            else:
                if masks.shape[0] < s_in.shape[0]:
                    masks = masks.repeat(math.ceil(s_in.shape[0] / masks.shape[0]), 1, 1, 1)[:s_in.shape[0]]
                s["noise_mask"] = masks[batch_index:batch_index + length].clone()
        if "batch_index" not in s:
            s["batch_index"] = [x for x in range(batch_index, batch_index+length)]
        else:
            s["batch_index"] = samples["batch_index"][batch_index:batch_index + length]
        return (s,)

```
