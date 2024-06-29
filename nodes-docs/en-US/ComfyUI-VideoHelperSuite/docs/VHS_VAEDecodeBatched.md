---
tags:
- VAE
---

# VAE Decode Batched 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_VAEDecodeBatched`
- Category: `Video Helper Suite 🎥🅥🅗🅢/batched nodes`
- Output node: `False`

This node is designed for batch processing of latent representations to decode them back into images using a specified VAE model. It efficiently handles large sets of data by processing them in smaller, manageable batches.
## Input types
### Required
- **`samples`**
    - The latent representations to be decoded into images. It's crucial for reconstructing the original or modified images from their compressed form.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`vae`**
    - The VAE model used for decoding the latent representations. It defines the architecture and parameters for the decoding process.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`per_batch`**
    - Specifies the number of samples to be processed in each batch. This allows for efficient memory management and processing speed optimization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded images, reconstructed from the provided latent representations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VAEDecodeBatched:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "samples": ("LATENT", ),
                "vae": ("VAE", ),
                "per_batch": ("INT", {"default": 16, "min": 1})
                }
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/batched nodes"

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "decode"

    def decode(self, vae, samples, per_batch):
        decoded = []
        for start_idx in range(0, samples["samples"].shape[0], per_batch):
            decoded.append(vae.decode(samples["samples"][start_idx:start_idx+per_batch]))
        return (torch.cat(decoded, dim=0), )

```
