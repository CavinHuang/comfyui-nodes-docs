---
tags:
- VAE
---

# Circular VAEDecode
## Documentation
- Class name: `Circular VAEDecode`
- Category: `latent`
- Output node: `False`

This node is designed for decoding latent representations into images, specifically by modifying the padding mode of convolutional layers in the VAE's first stage model to 'circular'. This adjustment aims to enhance the decoding process by leveraging circular padding, which can be particularly beneficial for generating or reconstructing images with seamless transitions.
## Input types
### Required
- **`samples`**
    - The latent representation to be decoded into an image. It is crucial for the decoding process as it contains the encoded information of the image to be reconstructed.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`vae`**
    - The Variational Autoencoder (VAE) model used for the decoding process. It is essential as it contains the architecture and parameters necessary for transforming the latent representation back into an image.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded image generated from the latent representation. It represents the output of the decoding process, showcasing the reconstructed or generated image.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CircularVAEDecode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT", ), "vae": ("VAE", )}}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "decode"

    CATEGORY = "latent"

    def decode(self, vae, samples):
        for layer in [layer for layer in vae.first_stage_model.modules() if isinstance(layer, torch.nn.Conv2d)]:
            layer.padding_mode = 'circular'
        return (vae.decode(samples["samples"]), )

```
