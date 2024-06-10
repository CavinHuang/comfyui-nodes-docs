---
tags:
- LayeredDiffusion
- LayeredDiffusionDecode
---

# [Inference.Core] Layer Diffuse Decode (RGBA)
## Documentation
- Class name: `Inference_Core_LayeredDiffusionDecodeRGBA`
- Category: `layer_diffuse`
- Output node: `False`

This node is designed to decode the alpha channel from pixel values in images, effectively converting RGB images to RGBA format. It leverages a layered diffusion process to enhance image quality by adding transparency information, thereby facilitating more nuanced image manipulation and generation tasks.
## Input types
### Required
- **`samples`**
    - Represents the input samples to be decoded, playing a crucial role in determining the final image output by providing the necessary data for the alpha channel decoding process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, Any]`
- **`images`**
    - The input images in tensor format, which are to be processed to decode the alpha channel and convert from RGB to RGBA format.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`sd_version`**
    - Specifies the version of the stable diffusion model to be used for decoding, impacting the decoding process and the quality of the output images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sub_batch_size`**
    - Determines the size of sub-batches for processing, affecting the efficiency and speed of the decoding operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output RGBA images, where the alpha channel has been decoded and added to the original RGB images, enhancing their representation with transparency information.
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
