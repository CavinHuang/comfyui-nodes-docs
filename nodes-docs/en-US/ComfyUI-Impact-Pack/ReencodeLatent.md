---
tags:
- VAE
---

# Reencode Latent
## Documentation
- Class name: `ReencodeLatent`
- Category: `ImpactPack/Util`
- Output node: `False`

The ReencodeLatent node is designed for the re-encoding of latent representations. It allows for the transformation of samples through a specified input and output variational autoencoder (VAE), optionally applying tiling strategies during the decode and encode phases to manage large images or patterns.
## Input types
### Required
- **`samples`**
    - Specifies the latent samples to be re-encoded. This parameter is crucial as it determines the input data that will undergo the re-encoding process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`tile_mode`**
    - Determines the tiling strategy for decoding and encoding, allowing for optimization based on the specific needs of the input and output. It affects how the latent samples are processed, especially in handling large images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`input_vae`**
    - The variational autoencoder used for decoding the input samples. It plays a key role in the initial phase of the re-encoding process.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`output_vae`**
    - The variational autoencoder used for encoding the processed samples into new latent representations. It finalizes the re-encoding process.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`tile_size`**
    - Specifies the size of the tiles when tiling is applied. This parameter influences the granularity of the processing, especially in large images or patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The re-encoded latent representations of the input samples. This output is the result of the transformation process applied by the node.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ReencodeLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "samples": ("LATENT", ),
                        "tile_mode": (["None", "Both", "Decode(input) only", "Encode(output) only"],),
                        "input_vae": ("VAE", ),
                        "output_vae": ("VAE", ),
                        "tile_size": ("INT", {"default": 512, "min": 320, "max": 4096, "step": 64}),
                    },
                }

    CATEGORY = "ImpactPack/Util"

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "doit"

    def doit(self, samples, tile_mode, input_vae, output_vae, tile_size=512):
        if tile_mode in ["Both", "Decode(input) only"]:
            pixels = nodes.VAEDecodeTiled().decode(input_vae, samples, tile_size)[0]
        else:
            pixels = nodes.VAEDecode().decode(input_vae, samples)[0]

        if tile_mode in ["Both", "Encode(output) only"]:
            return nodes.VAEEncodeTiled().encode(output_vae, pixels, tile_size)
        else:
            return nodes.VAEEncode().encode(output_vae, pixels)

```
