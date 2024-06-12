---
tags:
- Batch
- Image
---

# ⚙️ CR Latent Batch Size
## Documentation
- Class name: `CR Latent Batch Size`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `False`

This node is designed to adjust the batch size of latent representations by replicating the input samples to match the specified batch size. It facilitates the manipulation of data batch sizes for downstream processing or model inference.
## Input types
### Required
- **`latent`**
    - The latent representation of data, typically a tensor, that is to be adjusted in terms of batch size. This input is crucial for determining the structure and content of the data to be replicated.
    - Comfy dtype: `LATENT`
    - Python dtype: `Sequence[Mapping[Text, torch.Tensor]]`
- **`batch_size`**
    - An integer specifying the desired batch size. This parameter dictates how many times the input samples are replicated to achieve the specified batch size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output latent representation with the adjusted batch size, achieved by replicating the input samples as specified.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_LatentBatchSize:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"latent": ("LATENT", ),
                             "batch_size": ("INT", {"default": 2, "min": 1, "max": 999, "step": 1}),
                            }
               }

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "batchsize"
    CATEGORY = icons.get("Comfyroll/Essential/Core")

    def batchsize(self, latent: tg.Sequence[tg.Mapping[tg.Text, torch.Tensor]], batch_size: int):
        samples = latent['samples']
        shape = samples.shape

        sample_list = [samples] + [
            torch.clone(samples) for _ in range(batch_size - 1)
        ]

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-latent-batch-size"

        return ({
            'samples': torch.cat(sample_list),
        }, )

```
