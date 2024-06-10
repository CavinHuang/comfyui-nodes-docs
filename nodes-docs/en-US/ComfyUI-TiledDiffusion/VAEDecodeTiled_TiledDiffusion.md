---
tags:
- VAE
---

# Tiled VAE Decode
## Documentation
- Class name: `VAEDecodeTiled_TiledDiffusion`
- Category: `_for_testing`
- Output node: `False`

This node specializes in decoding latent representations into images using a tiled approach, enhancing the efficiency and quality of the decoding process, especially for large images. It leverages a variable tile size to optimize the decoding process, accommodating different computational constraints and image dimensions.
## Input types
### Required
- **`samples`**
    - The latent representation to be decoded into an image. This input is crucial for determining the content and quality of the output image.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The variational autoencoder model used for the decoding process. This model is essential for transforming the latent representation back into pixel data.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`tile_size`**
    - Specifies the size of the tiles used in the decoding process. Adjusting this parameter can optimize decoding performance and output quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fast`**
    - A boolean flag that, when enabled, accelerates the decoding process by potentially compromising on the output quality.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded image, reconstructed from the latent representation using the specified VAE model and tile size.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VAEDecodeTiled_TiledDiffusion(TiledVAE):
    @classmethod
    def INPUT_TYPES(s):
        tile_size = get_rcmd_dec_tsize() * opt_f
        return {"required": {"samples": ("LATENT", ),
                                "vae": ("VAE", ),
                                "tile_size": ("INT", {"default": tile_size, "min": 48*opt_f, "max": 4096, "step": 16}),
                                "fast": ("BOOLEAN", {"default": True}),
                            }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "process"
    CATEGORY = "_for_testing"

    def __init__(self):
        self.is_decoder = True
        super().__init__()

```
