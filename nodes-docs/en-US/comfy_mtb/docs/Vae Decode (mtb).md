---
tags:
- VAE
---

# Vae Decode (mtb)
## Documentation
- Class name: `Vae Decode (mtb)`
- Category: `mtb/decode`
- Output node: `False`

This node is designed to decode latent representations into images using a VAE model, with options for seamless decoding or tiled decoding to handle larger images efficiently.
## Input types
### Required
- **`samples`**
    - The latent representations to be decoded into images. These samples are the input that the VAE model decodes, directly influencing the output images.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`vae`**
    - The VAE model used for decoding the latent representations into images. It is central to the node's functionality, determining the decoding process and the quality of the output images.
    - Comfy dtype: `VAE`
    - Python dtype: `comfy.sd.VAE`
- **`seamless_model`**
    - A flag indicating whether to use seamless mode for decoding, which adjusts the padding mode of convolutional layers for seamless image generation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`use_tiling_decoder`**
    - A flag that determines whether to use a tiling decoder for image generation, enabling efficient handling of larger images by processing them in tiles.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tile_size`**
    - The size of the tiles used in tiling decoder mode, affecting the granularity of the decoding process and the handling of larger images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded image or images from the latent representations, produced by the VAE model.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_VaeDecode:
    """Wrapper for the 2 core decoders but also adding the sd seamless hack, taken from: FlyingFireCo/tiled_ksampler"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "samples": ("LATENT",),
                "vae": ("VAE",),
                "seamless_model": ("BOOLEAN", {"default": False}),
                "use_tiling_decoder": ("BOOLEAN", {"default": True}),
                "tile_size": (
                    "INT",
                    {"default": 512, "min": 320, "max": 4096, "step": 64},
                ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "decode"

    CATEGORY = "mtb/decode"

    def decode(
        self,
        vae,
        samples,
        seamless_model,
        use_tiling_decoder=True,
        tile_size=512,
    ):
        if seamless_model:
            if use_tiling_decoder:
                log.error(
                    "You cannot use seamless mode with tiling decoder together, skipping tiling."
                )
                use_tiling_decoder = False
            for layer in [
                layer
                for layer in vae.first_stage_model.modules()
                if isinstance(layer, torch.nn.Conv2d)
            ]:
                layer.padding_mode = "circular"
        if use_tiling_decoder:
            return (
                vae.decode_tiled(
                    samples["samples"],
                    tile_x=tile_size // 8,
                    tile_y=tile_size // 8,
                ),
            )
        else:
            return (vae.decode(samples["samples"]),)

```
