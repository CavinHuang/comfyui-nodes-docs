---
tags:
- Batch
- Image
- ImageDuplication
---

# Repeat Latent Batch
## Documentation
- Class name: `RepeatLatentBatch`
- Category: `latent/batch`
- Output node: `False`

The RepeatLatentBatch node is designed to replicate a given batch of latent representations a specified number of times, potentially including additional data like noise masks and batch indices. This functionality is crucial for operations that require multiple instances of the same latent data, such as data augmentation or specific generative tasks.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations to be replicated. It is essential for defining the data that will undergo repetition.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`amount`**
    - The 'amount' parameter specifies the number of times the input samples should be repeated. It directly influences the size of the output batch, thereby affecting the computational load and the diversity of the generated data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent representations, replicated according to the specified 'amount'. It may include replicated noise masks and adjusted batch indices, if applicable.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class RepeatLatentBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "amount": ("INT", {"default": 1, "min": 1, "max": 64}),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "repeat"

    CATEGORY = "latent/batch"

    def repeat(self, samples, amount):
        s = samples.copy()
        s_in = samples["samples"]
        
        s["samples"] = s_in.repeat((amount, 1,1,1))
        if "noise_mask" in samples and samples["noise_mask"].shape[0] > 1:
            masks = samples["noise_mask"]
            if masks.shape[0] < s_in.shape[0]:
                masks = masks.repeat(math.ceil(s_in.shape[0] / masks.shape[0]), 1, 1, 1)[:s_in.shape[0]]
            s["noise_mask"] = samples["noise_mask"].repeat((amount, 1,1,1))
        if "batch_index" in s:
            offset = max(s["batch_index"]) - min(s["batch_index"]) + 1
            s["batch_index"] = s["batch_index"] + [x + (i * offset) for i in range(1, amount) for x in s["batch_index"]]
        return (s,)

```
