---
tags:
- VAE
---

# Reencode Latent (pipe)
## Documentation
- Class name: `ReencodeLatentPipe`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to re-encode latent representations by transforming them through a specified input and output basic pipe. It facilitates the modification of latent spaces, enabling the transition of samples from one latent representation to another, potentially enhancing or altering their characteristics.
## Input types
### Required
- **`samples`**
    - The latent samples to be re-encoded. These samples are the starting point for the transformation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`tile_mode`**
    - Specifies the mode of tiling to be used during the re-encoding process, affecting how the samples are decoded and encoded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`input_basic_pipe`**
    - The basic pipe through which the samples are initially passed for decoding or transformation.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`output_basic_pipe`**
    - The basic pipe used for the final encoding or transformation of the samples, determining their new latent representation.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The re-encoded latent samples, representing the transformed latent space.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ReencodeLatentPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "samples": ("LATENT", ),
                        "tile_mode": (["None", "Both", "Decode(input) only", "Encode(output) only"],),
                        "input_basic_pipe": ("BASIC_PIPE", ),
                        "output_basic_pipe": ("BASIC_PIPE", ),
                    },
                }

    CATEGORY = "ImpactPack/Util"

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "doit"

    def doit(self, samples, tile_mode, input_basic_pipe, output_basic_pipe):
        _, _, input_vae, _, _ = input_basic_pipe
        _, _, output_vae, _, _ = output_basic_pipe
        return ReencodeLatent().doit(samples, tile_mode, input_vae, output_vae)

```
