---
tags:
- VAE
---

# Tiled VAE Encode
## Documentation
- Class name: `VAEEncodeTiled_TiledDiffusion`
- Category: `_for_testing`
- Output node: `False`

This node is designed for encoding images into a latent space representation using a tiled VAE approach, optimizing for efficiency and flexibility in handling various image sizes through tiling.
## Input types
### Required
- **`pixels`**
    - The input image to be encoded. This parameter is crucial for determining the content that will be transformed into a latent representation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The VAE model used for encoding. It defines the architecture and parameters of the variational autoencoder that processes the image.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`tile_size`**
    - Specifies the size of the tiles into which the image is divided for encoding. This affects the granularity of the encoding process and can be adjusted for performance or quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fast`**
    - A boolean flag that, when true, enables a faster but potentially less accurate encoding process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`color_fix`**
    - A boolean flag that, when true, applies a color correction step to the image before encoding. This can be useful for maintaining color consistency across tiles.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The encoded latent representation of the input image. This output captures the essential features of the image in a compressed form, suitable for various downstream tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VAEEncodeTiled_TiledDiffusion(TiledVAE):
    @classmethod
    def INPUT_TYPES(s):
        fast = True
        tile_size = get_rcmd_enc_tsize()
        return {"required": {"pixels": ("IMAGE", ),
                                "vae": ("VAE", ),
                                "tile_size": ("INT", {"default": tile_size, "min": 256, "max": 4096, "step": 16}),
                                "fast": ("BOOLEAN", {"default": fast}),
                                "color_fix": ("BOOLEAN", {"default": fast}),
                            }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "process"
    CATEGORY = "_for_testing"

    def __init__(self):
        self.is_decoder = False
        super().__init__()

```
