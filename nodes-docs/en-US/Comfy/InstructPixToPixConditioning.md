---
tags:
- Conditioning
---

# InstructPixToPixConditioning
## Documentation
- Class name: `InstructPixToPixConditioning`
- Category: `conditioning/instructpix2pix`
- Output node: `False`

This node is designed for encoding images into a conditioning format suitable for the InstructPix2Pix model, incorporating both positive and negative conditioning alongside pixel data and a variational autoencoder (VAE).
## Input types
### Required
- **`positive`**
    - Positive conditioning data that influences the encoding process towards desired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Tuple[CONDITIONING]`
- **`negative`**
    - Negative conditioning data that guides the encoding away from undesired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Tuple[CONDITIONING]`
- **`vae`**
    - A variational autoencoder used to encode the pixel data into a latent space representation.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`pixels`**
    - The pixel data of the image to be encoded, serving as the base for generating latent representations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Encoded positive conditioning data.
    - Python dtype: `List[Tuple[CONDITIONING]]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Encoded negative conditioning data.
    - Python dtype: `List[Tuple[CONDITIONING]]`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent space representation of the input image.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InstructPixToPixConditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"positive": ("CONDITIONING", ),
                             "negative": ("CONDITIONING", ),
                             "vae": ("VAE", ),
                             "pixels": ("IMAGE", ),
                             }}

    RETURN_TYPES = ("CONDITIONING","CONDITIONING","LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")
    FUNCTION = "encode"

    CATEGORY = "conditioning/instructpix2pix"

    def encode(self, positive, negative, pixels, vae):
        x = (pixels.shape[1] // 8) * 8
        y = (pixels.shape[2] // 8) * 8

        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = (pixels.shape[1] % 8) // 2
            y_offset = (pixels.shape[2] % 8) // 2
            pixels = pixels[:,x_offset:x + x_offset, y_offset:y + y_offset,:]

        concat_latent = vae.encode(pixels)

        out_latent = {}
        out_latent["samples"] = torch.zeros_like(concat_latent)

        out = []
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                d["concat_latent_image"] = concat_latent
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1], out_latent)

```
