---
tags:
- LayeredDiffusion
- LayeredDiffusionDecode
---

# Layer Diffuse Decode (RGBA)
## Documentation
- Class name: `LayeredDiffusionDecodeRGBA`
- Category: `layer_diffuse`
- Output node: `False`

The LayeredDiffusionDecodeRGBA node is designed to decode the alpha channel value from a given pixel value, transforming an RGB image input into an RGBA image output. This process involves adding an alpha channel to the existing RGB channels, thereby enabling the representation of transparency in the resulting image.
## Input types
### Required
- **`samples`**
    - The latent representation of the image to be decoded. It plays a crucial role in reconstructing the image with the added alpha channel for transparency.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`images`**
    - The initial RGB images that are to be transformed into RGBA format by adding an alpha channel.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`sd_version`**
    - Specifies the version of the Stable Diffusion model used for decoding, affecting the decoding process and the final image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sub_batch_size`**
    - Determines the size of sub-batches for processing, impacting the efficiency and speed of the decoding operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image in RGBA format, where the alpha channel has been decoded and added to the original RGB image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionDecodeRGBA(LayeredDiffusionDecode):
    """
    Decode alpha channel value from pixel value.
    [B, C=3, H, W] => [B, C=4, H, W]
    Outputs RGBA image.
    """

    RETURN_TYPES = ("IMAGE",)

    def decode(self, samples, images, sd_version: str, sub_batch_size: int):
        image, mask = super().decode(samples, images, sd_version, sub_batch_size)
        alpha = 1.0 - mask
        return JoinImageWithAlpha().join_image_with_alpha(image, alpha)

```
